import React from 'react'
import ReactDOM from 'react-dom/client'

import { ToastContainer } from 'react-toastify'
import { ConfigProvider, theme } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { AppProvider } from '@/contexts/appContext'
import { useAppContext } from '@/contexts/appContext'

import 'antd/dist/reset.css'
import './style/main.scss'
import 'react-toastify/dist/ReactToastify.css'
import './style/index.css'

const App = () => {
    const { isDark } = useAppContext()
    const { defaultAlgorithm, darkAlgorithm } = theme

    return (
        <ConfigProvider
            theme={{
                algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
            }}
        >
            <RouterProvider router={router} />
        </ConfigProvider>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
        <ToastContainer />
    </React.StrictMode>
)
