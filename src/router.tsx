import { useRoutes } from 'react-router'
import Post from './features/posts'
import PostDetail from './features/posts/detail'

export default function RoutesApp() {
  const publicRoutes = [
    {
      path: '/',
      element: <Post />
    },
    {
      path: '/post/:postId',
      element: <PostDetail />
    }
  ]

  return useRoutes(publicRoutes)
}
