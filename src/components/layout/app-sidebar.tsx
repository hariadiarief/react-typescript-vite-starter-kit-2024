import { NavGroup } from '@/components/layout/nav-group'
import { NavUser } from '@/components/layout/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'
import { useAuth } from '@/context/auth/authContext'
import { sidebarData } from './data/sidebar-data'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state: authState } = useAuth()

  const userInfo = {
    ...sidebarData.user,
    email: sidebarData.user.email,
    name: authState.authInfo?.user.username || sidebarData.user.name
  }

  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <div className='flex pt-2'>
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
            <sidebarData.app.logo className='size-4' />
          </div>
          <div className='ml-2 grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>
              {sidebarData.app.name}
            </span>
            <span className='truncate text-xs'>{sidebarData.app.plan}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map(props => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
