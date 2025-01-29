import { LinkProps } from 'react-router'

interface User {
  name: string
  email: string
  avatar: string
}

interface App {
  name: string
  logo: React.ElementType
  plan: string
}

interface BaseNavItem {
  title: string
  badge?: string
  icon?: React.ElementType
}

type NavLink = BaseNavItem & {
  url: LinkProps['to']
  items?: never
}

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['to'] })[]
  url?: never
}

type NavItem = NavCollapsible | NavLink

interface NavGroup {
  title: string
  items: NavItem[]
}

interface SidebarData {
  user: User
  app: App
  navGroups: NavGroup[]
}

export type { NavCollapsible, NavGroup, NavItem, NavLink, SidebarData }
