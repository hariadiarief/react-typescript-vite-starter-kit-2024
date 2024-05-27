// authReducer.ts
import { TDefaultAuthState, AuthAction } from './authTypes'

const authReducer = (
    state: TDefaultAuthState,
    action: AuthAction
): TDefaultAuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isAuthenticated: true,
                user: action.payload,
            }
        case 'LOGOUT':
            return {
                isAuthenticated: false,
                user: null,
            }
        default:
            return state
    }
}

export default authReducer
