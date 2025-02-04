import { LucideIcon } from 'lucide-react'

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
  icon?: LucideIcon
  hide?: boolean
}

type NavLink = BaseNavItem & {
  path: string
  children?: never
}

type NavCollapsible = BaseNavItem & {
  children: (BaseNavItem & { path: string })[]
  path?: never
}

type NavItem = NavCollapsible | NavLink

interface NavGroup {
  title: string
  children: NavItem[]
}

interface SidebarData {
  user: User
  app: App
  navGroups: NavGroup[]
}

export type { NavCollapsible, NavGroup, NavItem, NavLink, SidebarData }
