import { Navigate, useRoutes } from 'react-router'
import Layout from './components/layout'
import { useAuth } from './context/auth/authContext'
import Login from './features/authentication/login'
import Register from './features/authentication/register'
import Kanban from './features/kanban'
import CreateKanban from './features/kanban/create'
import DetailKanban from './features/kanban/detail'
import EditKanban from './features/kanban/edit'
import { Payments } from './features/payment'
import Post from './features/posts'
import PostDetail from './features/posts/detail'

export default function RoutesApp() {
  const { state: authState } = useAuth()

  const privateRoutes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Post />
        },
        {
          path: '/post/:postId',
          element: <PostDetail />
        },
        {
          path: '/payment',
          element: <Payments />
        },
        {
          path: '/kanban',
          element: <Kanban />
        },
        {
          path: '/kanban/create',
          element: <CreateKanban />
        },
        {
          path: '/kanban/detail/:id',
          element: <DetailKanban />
        },
        {
          path: '/kanban/edit/:id',
          element: <EditKanban />
        }
      ]
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
