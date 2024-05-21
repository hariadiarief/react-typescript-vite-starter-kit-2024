import { NavLink, useLocation } from 'react-router-dom'
import React, { useEffect } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

interface INavigationMenu {
    path: string
    icon?: React.ReactNode
    disabled?: boolean
    title: string
    children?: INavigationMenu[]
}

export function NavigationMenu({ menus }: { menus: INavigationMenu[] }) {
    const location = useLocation()
    const [open, setOpen] = React.useState<string[]>([])

    useEffect(() => {
        function findPath(
            routes: INavigationMenu[],
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
        <nav className='grid items-start gap-2  '>
            {menus.map((menu) => {
                return (
                    menu.path &&
                    (!menu.children ? (
                        <NavLink
                            end
                            key={menu.path}
                            to={menu.path}
                            className={({ isActive }) => {
                                return `group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                    isActive
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/9'
                                        : 'hover:bg-accent hover:text-accent-foreground'
                                }`
                            }}
                        >
                            {menu.icon && (
                                <span className='mr-2'>{menu.icon}</span>
                            )}
                            <div>{menu.title}</div>
                        </NavLink>
                    ) : (
                        <Collapsible.Root
                            key={menu.path}
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
                                <div className='group flex items-center  rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer'>
                                    {menu.icon && (
                                        <span className='mr-2'>
                                            {menu.icon}
                                        </span>
                                    )}
                                    <span className='Text'>{menu.title}</span>
                                    <button className='ml-auto'>
                                        {open.includes(menu.path) ? (
                                            <ChevronUpIcon className='h-4 w-4 shrink-0 transition-transform duration-200' />
                                        ) : (
                                            <ChevronDownIcon className='h-4 w-4 shrink-0 transition-transform duration-200' />
                                        )}
                                    </button>
                                </div>
                            </Collapsible.Trigger>

                            <Collapsible.Content className='ml-[20px]'>
                                <NavigationMenu menus={menu.children} />
                            </Collapsible.Content>
                        </Collapsible.Root>
                    ))
                )
            })}
        </nav>
    )
}
