import { DashboardNav } from '@/components/DashboardNav'
import { Outlet } from 'react-router'
import { routerDashboad } from '../routes'

export default function Layout() {
    return (
        <>
            <div className='flex'>
                <aside className='hidden w-[200px] flex-col md:flex'>
                    <DashboardNav menus={routerDashboad.children} />
                </aside>
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}
