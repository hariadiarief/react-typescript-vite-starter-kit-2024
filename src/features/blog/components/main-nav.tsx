'use client'

import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'
import { siteConfig } from '../config/site'

export function MainNav() {
    const location = useLocation()

    return (
        <div className='mr-4 hidden md:flex'>
            <Link to='/' className='mr-6 flex items-center space-x-2'>
                {/* <Icons.logo className='h-6 w-6' /> */}
                <span className='hidden font-bold sm:inline-block'>
                    {siteConfig.name}
                </span>
            </Link>
            <nav className='flex items-center gap-4 text-sm lg:gap-6'>
                <Link
                    to='/blog'
                    className={cn(
                        'transition-colors hover:text-foreground/80',
                        location.pathname === '/blog'
                            ? 'text-foreground'
                            : 'text-foreground/60'
                    )}
                >
                    Blog
                </Link>
                <Link
                    to='/blog/contact'
                    className={cn(
                        'transition-colors hover:text-foreground/80',
                        location.pathname.includes('/blog/contact')
                            ? 'text-foreground'
                            : 'text-foreground/60'
                    )}
                >
                    Contact Me
                </Link>
            </nav>
        </div>
    )
}
