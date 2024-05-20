import React from 'react'
import { SiteHeader } from './site-header'
import { Outlet } from 'react-router'

export default function Layout() {
    return (
        <>
            <SiteHeader />
            <main>
                <Outlet />
            </main>
        </>
    )
}
