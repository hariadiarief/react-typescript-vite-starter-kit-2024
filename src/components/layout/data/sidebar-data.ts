import {
  AlignStartHorizontal,
  Command,
  CreditCardIcon,
  LayoutDashboardIcon
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
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
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Post',
          url: '/',
          icon: LayoutDashboardIcon
        },
        {
          title: 'Payment',
          url: '/payment',
          icon: CreditCardIcon
        },
        {
          title: 'Kanban',
          url: '/kanban',
          icon: AlignStartHorizontal
        }
      ]
    }
  ]
}
