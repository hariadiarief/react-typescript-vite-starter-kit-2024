import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Switch } from 'antd'
import { useAppContext } from '@/contexts/appContext'
import { useEffect, useRef, useState } from 'react'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Layout() {
    const { pathname } = useLocation()
    const { isDark, setIsDark } = useAppContext()

    const myRef = useRef<HTMLDivElement>(null)
    const [positionScrollY, setPositionScrollY] = useState<number>(0)

    useEffect(() => {
        const onScroll = () => {
            setPositionScrollY(window.scrollY)

            if (myRef.current) {
                if (window.scrollY === 0) {
                    // top of page condition
                    myRef.current.style.top = '0px'
                    myRef.current.style.boxShadow = 'none'
                } else if (positionScrollY > myRef.current.clientHeight) {
                    // scrolled condition
                    if (positionScrollY > window.scrollY) {
                        // scrolling top
                        myRef.current.style.top = '0px'
                        myRef.current.style.boxShadow =
                            '-0px 5px 5px -5px rgba(0, 0, 0, 0.75)'
                    } else {
                        // scrolling down
                        myRef.current.style.top = `-${myRef.current.clientHeight}px`
                        myRef.current.style.boxShadow = 'none'
                    }
                }
            }
        }

        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [positionScrollY])

    return (
        <>
            <Disclosure
                as='nav'
                className='bg-gray-800 layout__nav'
                ref={myRef}
            >
                {({ open }) => (
                    <>
                        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                            <div className='relative flex h-16 items-center justify-between'>
                                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                        <span className='sr-only'>
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XMarkIcon
                                                className='block h-6 w-6'
                                                aria-hidden='true'
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className='block h-6 w-6'
                                                aria-hidden='true'
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>

                                <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                                    <div className='flex flex-shrink-0 items-center'>
                                        <img
                                            className='h-8 w-auto '
                                            src={'images/logo.png'}
                                            alt='company_logo'
                                        />
                                    </div>
                                    <div className='hidden sm:ml-6 sm:block'>
                                        <div className='flex space-x-4'>
                                            {navigation.map((item) => (
                                                <NavLink
                                                    key={item.name}
                                                    to={item.href}
                                                    className={({ isActive }) =>
                                                        classNames(
                                                            isActive
                                                                ? 'bg-gray-900 text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )
                                                    }
                                                >
                                                    {item.name}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className='absolute inset-y-0 right-0 flex items-center'>
                                    <Switch
                                        checked={isDark}
                                        checkedChildren={<span>🌙</span>}
                                        unCheckedChildren={<span>🔆</span>}
                                        defaultChecked
                                        onChange={() => setIsDark(!isDark)}
                                    />
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className='sm:hidden'>
                            <div className='space-y-1 px-2 pb-3 pt-2'>
                                {navigation.map((item) => (
                                    <NavLink key={item.name} to={item.href}>
                                        <Disclosure.Button
                                            key={item.name}
                                            as='span'
                                            className={classNames(
                                                pathname === item.href
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    </NavLink>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <main className='mt-12'>
                <Outlet />
            </main>
        </>
    )
}
