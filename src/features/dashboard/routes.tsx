import Layout from './components/Layout'
import Example from './pages/Example'
import Home from './pages/Home'

const Menu1 = () => <div>menu 1</div>
const Menu21 = () => <div>menu 21</div>
const Menu22 = () => <div>menu 22</div>
const Menu221 = () => <div>menu 221</div>
const Menu222 = () => <div>menu 222</div>

export const routerDashboad = {
    path: '/dashboard',
    element: <Layout />,
    children: [
        {
            title: 'Home',
            path: '/dashboard',
            index: true,
            element: <Home />,
        },
        { title: 'Example', path: '/dashboard/example', element: <Example /> },
        { title: 'Menu 1', path: '/dashboard/menu1', element: <Menu1 /> },

        {
            title: 'Menu Parent 1',
            path: '/dashboard/menu1/',

            children: [
                {
                    title: 'Menu Children 1-1',
                    path: '/dashboard/menu1/1',
                    element: <Menu21 />,
                },
                {
                    title: 'Menu Children 1-2',
                    path: '/dashboard/menu1/2',
                    element: <Menu22 />,
                },
            ],
        },
        {
            title: 'Menu Parent 2',
            path: '/dashboard/menu2/',
            children: [
                {
                    title: 'Menu Children 2-1',
                    path: '/dashboard/menu2/1',
                    element: <Menu21 />,
                },
                {
                    title: 'Menu Children 2-2',
                    path: '/dashboard/menu2/2',
                    children: [
                        {
                            title: 'Menu Children 2-2-1',
                            path: '/dashboard/menu2/2/1',
                            element: <Menu221 />,
                        },
                        {
                            title: 'Menu Children 2-2-2',
                            path: '/dashboard/menu2/2/2',
                            element: <Menu222 />,
                        },
                    ],
                },
            ],
        },
    ],
}
