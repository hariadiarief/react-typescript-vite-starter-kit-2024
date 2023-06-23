import axios from 'axios'
import { enableMockAdapter } from './mockAdapter'

export const axiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
})

enableMockAdapter({ isEnabled: false })
