import { lazy, Suspense } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

// LAYOUT
const Layout = lazy(() => import('components/layout'))

// PAGE
const Home = lazy(() => import('pages/home'))
const About = lazy(() => import('pages/about'))

export const publicRoutes = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route
                index
                element={
                    <Suspense fallback={<></>}>
                        <Home />
                    </Suspense>
                }
            />
            <Route
                path='about'
                element={
                    <Suspense fallback={<></>}>
                        <About />
                    </Suspense>
                }
            />
        </Route>
    )
)
