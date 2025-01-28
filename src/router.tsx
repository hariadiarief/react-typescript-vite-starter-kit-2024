import { Navigate, useRoutes } from 'react-router'
import { useAuth } from './context/auth/authContext'
import Login from './features/authentication/login'
import Register from './features/authentication/register'
import Post from './features/posts'
import PostDetail from './features/posts/detail'

export default function RoutesApp() {
  const { state: authState } = useAuth()

  const privateRoutes = [
    {
      path: '/',
      element: <Post />
    },
    {
      path: '/post/:postId',
      element: <PostDetail />
    }
  ]

  const publicRoutes = [
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    { path: '*', element: <Navigate to='/' replace /> }
  ]

  return useRoutes(authState.isAuthenticated ? privateRoutes : publicRoutes)
}
