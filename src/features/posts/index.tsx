// import { Button } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'

export interface IPost {
  title: string
  id: number
  body: string
}

const SORT_ASC = 1
const SORT_DSC = 2

export default function Post() {
  console.log('render')

  const [posts, setPost] = useState([])
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword)

  const [sort, setSort] = useState(SORT_ASC)

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=10s'
      )
      return response.json()
    }

    getPost().then(res => {
      setPost(res)
    })
  }, [])

  const filteredAndSortedPosts = useMemo(() => {
    const filtered = posts.filter((item: IPost) =>
      item.title
        .toLocaleLowerCase()
        .includes(debouncedKeyword.toString().toLocaleLowerCase())
    )

    const sorted = filtered.sort((a: IPost, b: IPost) =>
      sort === SORT_ASC ? a.id - b.id : b.id - a.id
    )

    return sorted
  }, [posts, debouncedKeyword, sort])

  if (!posts.length) return

  return (
    <div>
      <h1 className='text-2xl'>home</h1>
      <input
        type='text'
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <select
        name='sort'
        id='sort'
        onChange={e => setSort(Number(e.target.value))}
      >
        <option value={SORT_ASC}>Ascending</option>
        <option value={SORT_DSC}>Descending</option>
      </select>

      <div>keyword : {keyword}</div>
      <div>debouncedKeyword : {debouncedKeyword}</div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedPosts.map((post: IPost) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>
                <Link to={`/post/${post.id}`}>
                  <Button>Detail</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  function useDebounce(value: string | number, delay: number = 1000) {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebounceValue(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])

    return debounceValue
  }
}
