import { NavLink, useLocation } from 'react-router-dom'
import React, { useEffect } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'

interface DashboardNavProps {
    path: string
    icon?: string
    disabled?: boolean
    title: string
    children?: DashboardNavProps[]
}

export function DashboardNav({ menus }: { menus: DashboardNavProps[] }) {
    const location = useLocation()
    const [open, setOpen] = React.useState<string[]>([])

    useEffect(() => {
        function findPath(
            routes: DashboardNavProps[],
            targetPath: string
        ): string[] | null {
            for (const route of routes) {
                if (route.path === targetPath) {
                    return [route.path]
                }
                if (route.children) {
                    const childPath = findPath(route.children, targetPath)
                    if (childPath) {
                        return [route.path, ...childPath]
                    }
                }
            }
            return null
        }
        const result = findPath(menus, location.pathname) || []
        setOpen(result)
    }, [menus, location.pathname])

    if (!menus?.length) {
        return null
    }

    return (
        <nav className='grid items-start gap-2'>
            {menus.map((menu, index) => {
                // const Icon = Icons[menu.icon || 'arrowRight']
                return (
                    menu.path &&
                    (!menu.children ? (
                        <NavLink
                            end
                            key={index + menu.path}
                            to={menu.path}
                            className={({ isActive, isPending }) => {
                                console.log({
                                    name: menu.title,
                                    path: menu.path,
                                    isActive,
                                    isPending,
                                })

                                return `group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                                    isActive ? 'bg-accent' : 'transparent'
                                }`
                            }}
                        >
                            {/* <Icon className='mr-2 h-4 w-4' /> */}
                            <div>{menu.title}</div>
                        </NavLink>
                    ) : (
                        <Collapsible.Root
                            className='CollapsibleRoot'
                            open={open.includes(menu.path)}
                            onOpenChange={() => {
                                !open.includes(menu.path)
                                    ? setOpen((prevState) =>
                                          prevState.concat(menu.path)
                                      )
                                    : setOpen((prevState) =>
                                          prevState.filter(
                                              (find) => find !== menu.path
                                          )
                                      )
                            }}
                        >
                            <Collapsible.Trigger asChild>
                                <div className='group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground'>
                                    <span className='Text'>{menu.title}</span>
                                    <button className='IconButton'>
                                        {open.includes(menu.path) ? 'A' : 'V'}
                                    </button>
                                </div>
                            </Collapsible.Trigger>

                            <Collapsible.Content className='ml-2'>
                                <DashboardNav menus={menu.children} />
                            </Collapsible.Content>
                        </Collapsible.Root>
                    ))
                )
            })}
        </nav>
    )
}
