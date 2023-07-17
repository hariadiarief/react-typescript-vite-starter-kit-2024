/**
 * considered for deletion
 */

import { useEffect, useState } from 'react'

export const usePrefersColorScheme = () => {
    const [isDark, setIsDark] = useState<boolean>(detectSystemThemeIsDark())

    function detectSystemThemeIsDark() {
        return !!window?.matchMedia('(prefers-color-scheme: dark)')?.matches
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
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDark])

    return {
        isDark,
        setIsDark,
    }
}
