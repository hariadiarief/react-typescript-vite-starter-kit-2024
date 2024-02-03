import { lazy, Suspense } from 'react'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'

// LAYOUT
const Layout = lazy(async () => await import('@/components/layout'))

// PAGE
const Home = lazy(async () => await import('@/pages/home'))
const About = lazy(async () => await import('@/pages/about'))
const Example = lazy(async () => await import('@/pages/example'))

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
            <Route
                path='example'
                element={
                    <Suspense fallback={<></>}>
                        <Example />
                    </Suspense>
                }
            />
        </Route>
    )
)
