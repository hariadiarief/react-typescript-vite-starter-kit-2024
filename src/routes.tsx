import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import { routerBlog } from '@/features/blog/routes'
import RouterDashboad from '@/features/dashboard/routes'

const Home = lazy(() => import('@/features'))

export default function Routes() {
    const element = useRoutes([
        {
            path: '/',
            element: <Home />,
            loader: () => <>Loading...</>,
        },
        routerBlog,
        RouterDashboad(),
    ])

    return element
}
