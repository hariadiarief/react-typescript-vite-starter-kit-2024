import { IActionAuth, IStateAuth } from './authTypes'

const authInfoLocalStorage = JSON.parse(localStorage.getItem('auth') || '{}')

export const initialState: IStateAuth = {
  isAuthenticated: Object.keys(authInfoLocalStorage).length > 0,
  authInfo:
    Object.keys(authInfoLocalStorage).length !== 0
      ? authInfoLocalStorage
      : undefined
}

export const reducer = (state: IStateAuth, action: IActionAuth): IStateAuth => {
  switch (action.type) {
    case 'login':
      return {
        isAuthenticated: !!action.payload,
        authInfo: action.payload
      }
    case 'logout':
      localStorage.clear()
      return {
        isAuthenticated: false,
        authInfo: undefined
      }
    default:
      return state
  }
}
