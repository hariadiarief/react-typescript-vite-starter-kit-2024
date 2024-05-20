import Layout from './components/Layout'
import Contact from './pages/Contact'
import Blog from './pages/Home'

export const routerBlog = {
    path: '/blog',
    element: <Layout />,
    children: [
        { index: true, element: <Blog /> },
        { path: 'contact', element: <Contact /> },
    ],
}
