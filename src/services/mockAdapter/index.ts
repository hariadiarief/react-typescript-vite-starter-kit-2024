import { axiosInstance } from '@/services/api'
import MockAdapter from 'axios-mock-adapter'
import {
    pokemonLimit20Offset0,
    pokemonLimit20Offset0Error,
    pokemonLimit20Offset20,
} from './pokemon'

interface IenableMockAdapter {
    isEnabled: boolean
    delayResponse?: number
}

export const enableMockAdapter = ({
    isEnabled,
    delayResponse = 500,
}: IenableMockAdapter) => {
    if (isEnabled) {
        console.log('Axios Mock Adapter diaktifkan.')

        const mockAdapter = new MockAdapter(axiosInstance, {
            delayResponse,
        })

        /**
         * url      : /pokemon?limit=20&offset=0
         */
        pokemonLimit20Offset0(mockAdapter)

        /**
         * url      : /pokemon?limit=20&offset=0
         * status   : ERROR
         */
        pokemonLimit20Offset0Error(mockAdapter)

        /**
         * url : /pokemon?limit=20&offset=20
         */
        pokemonLimit20Offset20(mockAdapter)
    }
}
