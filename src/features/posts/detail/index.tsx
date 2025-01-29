import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { IPost } from '..'

export default function PostDetail() {
  console.log('render')

  const { postId } = useParams()
  const [detailPost, setDetailPost] = useState<IPost>()

  useEffect(() => {
    const getDetailPost = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      )
      return response.json()
    }

    getDetailPost().then(res => {
      setDetailPost(res)
    })
  }, [])

  return (
    <div>
      {!detailPost ? (
        <div>Loading...</div>
      ) : (
        <>
          <h3>{detailPost.title}</h3>
          <p>{detailPost.body}</p>
        </>
      )}
    </div>
  )
}
