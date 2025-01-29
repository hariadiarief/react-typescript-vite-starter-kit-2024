import axios from 'axios'

import { toast } from '@/hooks/use-toast'

export const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

API.interceptors.request.use(
  config => {
    const authInfo = JSON.parse(localStorage.getItem('auth') || '{}')

    if (authInfo.token)
      config.headers.Authorization = `Bearer ${authInfo.token}`

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

API.interceptors.response.use(
  response => response.data,
  error => {
    console.log('Logging the error', error)
    toast({
      title: 'Opps, something wrong',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-destructive p-4 text-white'>
          {error.message}
        </pre>
      )
    })

    return Promise.reject(error)
  }
)
