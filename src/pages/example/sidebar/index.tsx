import { DashboardNav } from '@/components/nav'
import { dashboardConfig } from './dashboard'

export default function Sidebar() {
    return (
        <aside className='hidden w-[200px] flex-col md:flex'>
            <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
    )
}
