// import { Button } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ArrowUpDownIcon, EyeIcon } from 'lucide-react'
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
    <div className=''>
      <h3 className='text-2xl font-bold tracking-tight'>Posts</h3>

      <Input
        placeholder='Filter Title...'
        type='text'
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        className='mb-2 max-w-sm'
      />
      <div className='mb-4'>
        <div className='text-muted-foreground'>filter : {keyword}</div>
        <div className='text-muted-foreground'>
          debounced filter : {debouncedKeyword}
        </div>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>ID</TableHead>
              <TableHead>
                <Button
                  className='p-0'
                  variant='ghost'
                  onClick={() =>
                    setSort(sort === SORT_ASC ? SORT_DSC : SORT_ASC)
                  }
                >
                  <ArrowUpDownIcon />
                  Title
                </Button>
              </TableHead>
              <TableHead className='text-right'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedPosts.map((post: IPost) => (
              <TableRow key={post.id}>
                <TableCell className='font-medium'>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell className='text-right'>
                  <Link to={`/post/${post.id}`}>
                    <Button variant={'outline'}>
                      <EyeIcon />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
