import React, { ReactNode, useReducer } from 'react'
import { AuthContext, initialState } from './AuthState'
import authReducer from './AuthReducer'

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = () => {
        dispatch({
            type: 'LOGIN',
            payload: {
                username: 'jhon_doe',
            },
        })
    }

    return (
        <AuthContext.Provider value={{ state, dispatch, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
