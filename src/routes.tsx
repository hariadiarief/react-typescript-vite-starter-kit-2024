import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { routerBlog } from '@/features/blog/routes'
import { routerDashboadPublic } from './features/dashboard/routes'

const Home = lazy(() => import('@/features'))

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        loader: () => <>Loading...</>,
    },
    routerBlog,
    routerDashboadPublic,
])
