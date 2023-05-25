import { Outlet } from 'react-router-dom'

import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { ReactComponent as IconMenu } from 'assets/menu.svg'
import { ReactComponent as IconMenuOpen } from 'assets/menu-open.svg'
import { useWindowDimention } from 'hook'

export default function Layout() {
    const { width } = useWindowDimention()
    const myRef = useRef<any>()

    const [isMobileNavShow, setIsMobileNavShow] = useState<boolean | null>(null)
    const [positionScrollY, setPositionScrollY] = useState<number>(0)

    useEffect(() => {
        setIsMobileNavShow(width >= 768) // 768px : Medium devices base on bootstrap
    }, [width])

    const onScroll = () => {
        setPositionScrollY(window.scrollY)

        if (window.scrollY === 0) {
            // top of page condition
            myRef.current.style.top = '0px'
            myRef.current.style.boxShadow = 'none'
        } else if (positionScrollY > myRef.current.clientHeight) {
            // scrolled condition
            if (positionScrollY > window.scrollY) {
                // scrolling top
                myRef.current.style.top = '0px'
                myRef.current.style.boxShadow = `-0px 5px 5px -5px rgba(0, 0, 0, 0.75)`
            } else {
                // scrolling down
                myRef.current.style.top = `-${myRef.current.clientHeight}px`
                myRef.current.style.boxShadow = 'none'
            }
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [positionScrollY])

    return (
        <div className='layout'>
            <nav ref={myRef} className='layout__header'>
                {renderMenu()}
            </nav>
            <main>
                <div>
                    <Outlet />
                </div>
            </main>
        </div>
    )

    function renderMenu() {
        return (
            <>
                {/* menu for mobile only */}
                <div className='layout__header__menu-btn'>
                    <i onClick={() => setIsMobileNavShow(!isMobileNavShow)}>
                        {isMobileNavShow ? <IconMenuOpen /> : <IconMenu />}
                    </i>
                </div>
                <div
                    className='layout__header__navigations'
                    style={
                        isMobileNavShow === true
                            ? { display: 'flex' }
                            : { display: 'none' }
                    }
                >
                    <NavLink to='/' className='layout__header__navigation'>
                        <img
                            className='layout__header__navigation--logo'
                            src={require('assets/logo.png')}
                            alt=''
                        />
                    </NavLink>
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            isActive
                                ? 'layout__header__navigation--active'
                                : 'layout__header__navigation'
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to='/about'
                        className={({ isActive }) =>
                            isActive
                                ? 'layout__header__navigation--active'
                                : 'layout__header__navigation'
                        }
                    >
                        About
                    </NavLink>
                </div>
            </>
        )
    }
}
