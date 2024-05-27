import { NavLink, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDownIcon, ChevronUpIcon, SearchXIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface INavigationMenu {
    path: string
    icon?: React.ReactNode
    disabled?: boolean
    title: string
    children?: INavigationMenu[]
}

export function NavigationMenu({ menus }: { menus: INavigationMenu[] }) {
    const [keyword, setKeyword] = useState('')

    const searchNodes = (keyword: string, nodes: INavigationMenu[]) => {
        const results: INavigationMenu[] = []

        nodes.forEach((node) => {
            if (
                node.title.toLowerCase().includes(keyword.toLowerCase()) ||
                node.path.toLowerCase().includes(keyword.toLowerCase())
            )
                results.push(node)
            else if (node.children && node.children?.length > 0)
                results.push(...searchNodes(keyword, node.children))
        })

        return results
    }

    const filteredMenu = searchNodes(keyword, menus)

    return (
        <>
            <div className='flex w-full max-w-sm items-center space-x-2  '>
                <Input
                    type='name'
                    placeholder='Search Menu'
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <hr className='mt-2 mb-3' />
            <ItemMenu menus={!keyword ? menus : filteredMenu} />
            {!filteredMenu.length && keyword && (
                <div className='flex flex-col items-center mt-8'>
                    <SearchXIcon size={46} className='' />
                    <span className='text-muted-foreground mt-8'>
                        No menu found for '<strong>{keyword}</strong>'
                    </span>
                </div>
            )}
        </>
    )
}

const ItemMenu = ({ menus }: { menus: INavigationMenu[] }) => {
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
                                <ItemMenu menus={menu.children} />
                            </Collapsible.Content>
                        </Collapsible.Root>
                    ))
                )
            })}
        </nav>
    )
}
