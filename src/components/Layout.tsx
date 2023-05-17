import { Outlet } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { ReactComponent as IconMenu } from 'assets/menu.svg'
import { ReactComponent as IconMenuOpen } from 'assets/menu-open.svg'
import { WindowDimensions } from 'lib'

export default function Layout() {
    let { width } = WindowDimensions()
    const [isMobileNavShow, setIsMobileNavShow] = useState<Boolean | null>(null)

    useEffect(() => {
        setIsMobileNavShow(width >= 768)
    }, [width])

    return (
        <div className='layout'>
            <nav className='layout__header'>{renderMenu()}</nav>
            <main>
                {' '}
                <Outlet />
            </main>
        </div>
    )

    function renderMenu() {
        return (
            <>
                <div className='layout__header__menu-btn'>
                    <i onClick={() => setIsMobileNavShow(!isMobileNavShow)}>{isMobileNavShow ? <IconMenuOpen /> : <IconMenu />}</i>
                </div>
                <div className='layout__header__navigations' style={isMobileNavShow === true ? { display: 'flex' } : { display: 'none' }}>
                    <NavLink to='/' className='layout__header__navigation'>
                        <img className='layout__header__navigation--logo' src={require('assets/logo.png')} alt='' />
                    </NavLink>
                    <NavLink to='/' className={({ isActive, isPending }) => (isActive ? 'layout__header__navigation--active' : 'layout__header__navigation')}>
                        Home
                    </NavLink>
                    <NavLink
                        to='/about'
                        className={({ isActive, isPending }) => (isActive ? 'layout__header__navigation--active' : 'layout__header__navigation')}
                    >
                        About
                    </NavLink>
                </div>
            </>
        )
    }
}
