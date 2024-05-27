// reducer
export type AuthAction =
    | { type: 'LOGIN'; payload: TAuthUser }
    | { type: 'LOGOUT' }

// context
export type TAuthContext = {
    state: TDefaultAuthState
    dispatch: TAuthDispatch
    login: () => void
}

// state
export type TDefaultAuthState = {
    isAuthenticated: boolean
    user: TAuthUser | null
}

export type TAuthUser = { username: string }

export type TAuthDispatch = (action: AuthAction) => void
