import MockAdapter from 'axios-mock-adapter/types'

export const pokemonLimit20Offset0 = (mockAdapter: MockAdapter) => {
    mockAdapter.onGet('/pokemon?limit=20&offset=0').reply(200, {
        count: 1281,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
        previous: null,
        results: [
            {
                name: 'bulbasaur',
                url: 'https://pokeapi.co/api/v2/pokemon/1/',
            },
            {
                name: 'ivysaur',
                url: 'https://pokeapi.co/api/v2/pokemon/2/',
            },
            {
                name: 'venusaur',
                url: 'https://pokeapi.co/api/v2/pokemon/3/',
            },
            {
                name: 'charmander',
                url: 'https://pokeapi.co/api/v2/pokemon/4/',
            },
            {
                name: 'charmeleon',
                url: 'https://pokeapi.co/api/v2/pokemon/5/',
            },
            {
                name: 'charizard',
                url: 'https://pokeapi.co/api/v2/pokemon/6/',
            },
            {
                name: 'squirtle',
                url: 'https://pokeapi.co/api/v2/pokemon/7/',
            },
            {
                name: 'wartortle',
                url: 'https://pokeapi.co/api/v2/pokemon/8/',
            },
            {
                name: 'blastoise',
                url: 'https://pokeapi.co/api/v2/pokemon/9/',
            },
            {
                name: 'caterpie',
                url: 'https://pokeapi.co/api/v2/pokemon/10/',
            },
            {
                name: 'metapod',
                url: 'https://pokeapi.co/api/v2/pokemon/11/',
            },
            {
                name: 'butterfree',
                url: 'https://pokeapi.co/api/v2/pokemon/12/',
            },
            {
                name: 'weedle',
                url: 'https://pokeapi.co/api/v2/pokemon/13/',
            },
            {
                name: 'kakuna',
                url: 'https://pokeapi.co/api/v2/pokemon/14/',
            },
            {
                name: 'beedrill',
                url: 'https://pokeapi.co/api/v2/pokemon/15/',
            },
            {
                name: 'pidgey',
                url: 'https://pokeapi.co/api/v2/pokemon/16/',
            },
            {
                name: 'pidgeotto',
                url: 'https://pokeapi.co/api/v2/pokemon/17/',
            },
            {
                name: 'pidgeot',
                url: 'https://pokeapi.co/api/v2/pokemon/18/',
            },
            {
                name: 'rattata',
                url: 'https://pokeapi.co/api/v2/pokemon/19/',
            },
            {
                name: 'raticate',
                url: 'https://pokeapi.co/api/v2/pokemon/20/',
            },
        ],
    })
}
export const pokemonLimit20Offset0Error = (mockAdapter: MockAdapter) => {
    mockAdapter.onGet('/pokemon?limit=20&offset=0').networkError()
}

export const pokemonLimit20Offset20 = (mockAdapter: MockAdapter) => {
    mockAdapter.onGet('/pokemon?limit=20&offset=20').reply(200, {
        count: 1281,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=40&limit=20',
        previous: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
        results: [
            {
                name: 'spearow',
                url: 'https://pokeapi.co/api/v2/pokemon/21/',
            },
            {
                name: 'fearow',
                url: 'https://pokeapi.co/api/v2/pokemon/22/',
            },
            {
                name: 'ekans',
                url: 'https://pokeapi.co/api/v2/pokemon/23/',
            },
            {
                name: 'arbok',
                url: 'https://pokeapi.co/api/v2/pokemon/24/',
            },
            {
                name: 'pikachu',
                url: 'https://pokeapi.co/api/v2/pokemon/25/',
            },
            {
                name: 'raichu',
                url: 'https://pokeapi.co/api/v2/pokemon/26/',
            },
            {
                name: 'sandshrew',
                url: 'https://pokeapi.co/api/v2/pokemon/27/',
            },
            {
                name: 'sandslash',
                url: 'https://pokeapi.co/api/v2/pokemon/28/',
            },
            {
                name: 'nidoran-f',
                url: 'https://pokeapi.co/api/v2/pokemon/29/',
            },
            {
                name: 'nidorina',
                url: 'https://pokeapi.co/api/v2/pokemon/30/',
            },
            {
                name: 'nidoqueen',
                url: 'https://pokeapi.co/api/v2/pokemon/31/',
            },
            {
                name: 'nidoran-m',
                url: 'https://pokeapi.co/api/v2/pokemon/32/',
            },
            {
                name: 'nidorino',
                url: 'https://pokeapi.co/api/v2/pokemon/33/',
            },
            {
                name: 'nidoking',
                url: 'https://pokeapi.co/api/v2/pokemon/34/',
            },
            {
                name: 'clefairy',
                url: 'https://pokeapi.co/api/v2/pokemon/35/',
            },
            {
                name: 'clefable',
                url: 'https://pokeapi.co/api/v2/pokemon/36/',
            },
            {
                name: 'vulpix',
                url: 'https://pokeapi.co/api/v2/pokemon/37/',
            },
            {
                name: 'ninetales',
                url: 'https://pokeapi.co/api/v2/pokemon/38/',
            },
            {
                name: 'jigglypuff',
                url: 'https://pokeapi.co/api/v2/pokemon/39/',
            },
            {
                name: 'wigglytuff',
                url: 'https://pokeapi.co/api/v2/pokemon/40/',
            },
        ],
    })
}
