import React, {
    createContext,
    useState,
    useContext,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react'

interface AppProviderProps {
    children: React.ReactNode
}

interface AppContextProps {
    count: number
    increment: () => void
    decrement: () => void

    isDark: boolean
    setIsDark: Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    /**
     * counter
     */
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }

    /**
     * theme
     */
    const [isDark, setIsDark] = useState<boolean>(detectSystemThemeIsDark())

    function detectSystemThemeIsDark() {
        if (localStorage.getItem('theme')) {
            return localStorage.getItem('theme') === 'dark'
        } else {
            return !!window?.matchMedia('(prefers-color-scheme: dark)')?.matches
        }
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleThemeChange = () => {
            setIsDark(detectSystemThemeIsDark())
        }

        mediaQuery.addEventListener('change', handleThemeChange)

        return () => {
            mediaQuery.removeEventListener('change', handleThemeChange)
        }
    }, [])

    useEffect(() => {
        if (isDark) {
            localStorage.setItem('theme', 'dark')
            document.documentElement.classList.add('dark')
        } else {
            localStorage.setItem('theme', 'light')
            document.documentElement.classList.remove('dark')
        }
    }, [isDark])

    return (
        <AppContext.Provider
            value={{ count, increment, decrement, isDark, setIsDark }}
        >
            {children}
        </AppContext.Provider>
    )
}

// Custom hook untuk mengakses context
export const useAppContext = () => {
    const context = useContext(AppContext)

    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider')
    }

    return context
}
