import { AppSidebar } from '@/components/layout/app-sidebar'
import { Header } from '@/components/layout/header'
import { SidebarProvider } from '@/components/ui/sidebar'
import { SearchProvider } from '@/context/search-context'
import { cn } from '@/lib/utils'
import Cookies from 'js-cookie'
import { Outlet } from 'react-router'
import { Search } from '../search'
import { ThemeSwitch } from '../theme-switch'
import { SidebarDataComponent } from './data/sidebar-data'

export default function Layout() {
  const { sidebarData } = SidebarDataComponent()

  const defaultOpen = Cookies.get('sidebar:state') !== 'false'

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'transition-[width] duration-200 ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
          )}
        >
          <Header>
            <span className='mr-2 truncate font-semibold'>
              {sidebarData.app.name}
            </span>
            <div className='ml-auto flex items-center space-x-4'>
              <Search />
              <ThemeSwitch />
            </div>
          </Header>
          <main className='p-2'>
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
