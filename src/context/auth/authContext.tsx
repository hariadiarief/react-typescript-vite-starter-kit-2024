import React, { ReactNode, createContext, useContext, useReducer } from 'react'
import { initialState, reducer } from './authReducer'
import { IActionAuth, IStateAuth } from './authTypes'

interface ContextProps {
  state: IStateAuth
  dispatch: React.Dispatch<IActionAuth>
}

const AuthContext = createContext<ContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): ContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}
