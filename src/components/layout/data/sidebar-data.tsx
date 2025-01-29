import { DashboardMenu } from '@/router'
import { Command } from 'lucide-react'
import { NavGroup, type SidebarData } from '../types'

interface ISidebarDataComponent {
  sidebarData: SidebarData
}

interface Route {
  title: string
  path?: string
  hide?: boolean
  children?: Route[]
}

interface NavLink {
  title: string
  url: string
}

type NavGroups = NavGroup[]

export const SidebarDataComponent = (): ISidebarDataComponent => {
  const { routes } = DashboardMenu()
  console.log({ routes })

  const mapRoutesToNav = (routes: Route[]): NavGroups => {
    return routes
      .filter(({ hide }) => !hide)
      .map(({ title, path, children }) => {
        if (children) {
          return {
            title,
            items: mapRoutesToNav(children)
          }
        }
        return {
          title,
          url: path!
        } as NavLink
      }) as NavGroups
  }

  const mappedNav: NavGroups = mapRoutesToNav(routes)

  return {
    sidebarData: {
      user: {
        name: 'username',
        email: 'user@gmail.com',
        avatar: '/avatars/shadcn.jpg'
      },
      app: {
        name: 'Kanban Apps',
        logo: Command,
        plan: 'Vite + ShadcnUI'
      },
      navGroups: mappedNav
    }
  }
}
