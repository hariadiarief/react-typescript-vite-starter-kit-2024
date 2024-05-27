import { createContext } from 'react'
import { TAuthContext, TDefaultAuthState } from './authTypes'

// Initial state
export const initialState: TDefaultAuthState = {
    isAuthenticated: false,
    user: null,
}

// Context
export const AuthContext = createContext<TAuthContext>({
    state: initialState,
    dispatch: () => {},
    login: () => {},
})
