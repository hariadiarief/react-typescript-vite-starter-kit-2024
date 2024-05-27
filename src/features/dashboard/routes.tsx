import { FileIcon, HomeIcon, ShoppingCartIcon, UsersIcon } from 'lucide-react'
import Layout from './components/Layout'
import Example from './pages/Example'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { useContext } from 'react'
import { AuthContext } from '@/features/dashboard/context/auth/AuthState'

const Order = () => <div>menu 22</div>
const ProductList = () => <div>Product List</div>
const ProductCreate = () => <div>Product Create</div>
const UserList = () => <div>User List</div>
const UserCreate = () => <div>User Create</div>

export default function RouterDashboad() {
    const { state } = useContext(AuthContext)
    const { isAuthenticated } = state

    return isAuthenticated ? routerDashboadPrivate : routerDashboadPublic
}

const routerDashboadPublic = {
    path: '/dashboard',
    children: [
        { path: '/dashboard', element: <Login /> },
        { path: '/dashboard/register', element: <Register /> },
    ],
}

export const routerDashboadPrivate = {
    path: '/dashboard',
    element: <Layout />,
    children: [
        {
            title: 'Home',
            path: '/dashboard',
            element: <Home />,
            icon: <HomeIcon width={16} height={16} />,
        },
        {
            title: 'Example',
            path: '/dashboard/example',
            element: <Example />,
            icon: <FileIcon width={16} height={16} />,
        },
        {
            title: 'E-Commerce',
            path: '/dashboard/ecommerce/',
            icon: <ShoppingCartIcon width={16} height={16} />,
            children: [
                {
                    title: 'Order',
                    path: '/dashboard/ecommerce/order',
                    element: <Order />,
                },
                {
                    title: 'Product',
                    path: '/dashboard/ecommerce/product',
                    children: [
                        {
                            title: 'Product List',
                            path: '/dashboard/ecommerce/product/list',
                            element: <ProductList />,
                        },
                        {
                            title: 'New Product',
                            path: '/dashboard/ecommerce/product/create',
                            element: <ProductCreate />,
                        },
                    ],
                },
            ],
        },
        {
            title: 'Users',
            path: '/dashboard/user/',
            icon: <UsersIcon width={16} height={16} />,
            children: [
                {
                    title: 'List User',
                    path: '/dashboard/user/list',
                    element: <UserList />,
                },
                {
                    title: 'Create User',
                    path: '/dashboard/user/create',
                    element: <UserCreate />,
                },
            ],
        },
    ],
}
