import { DashboardNav } from './DashboardNav'
import { Outlet } from 'react-router'
import { routerDashboad } from '../routes'
import { MobileNav } from './mobile-nav'
import { SquareCodeIcon } from 'lucide-react'

export default function Layout() {
    return (
        <div className='flex flex-col min-h-screen'>
            <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                <div className=' h-14 flex items-center px-3'>
                    <MobileNav
                        children={
                            <DashboardNav menus={routerDashboad.children} />
                        }
                    />
                    <div className=' flex items-center flex-grow justify-center md:justify-start '>
                        <SquareCodeIcon className='' />
                        <h1 className='ml-3 text-lg font-bold  '>Dashboard</h1>
                    </div>
                </div>
            </header>
            <div className='flex flex-grow relative'>
                <aside className='hidden w-[250px] flex-col md:flex  bg-white h-screen fixed p-2'>
                    <DashboardNav menus={routerDashboad.children} />
                </aside>
                <main className='bg-[#f7f7f7] flex-grow min-h h-[200vh] md:pl-[250px]'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
