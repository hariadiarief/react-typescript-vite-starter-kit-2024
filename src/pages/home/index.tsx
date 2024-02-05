import { useEffect, useState } from 'react'
import { axiosInstance } from '@/services/api'
import { Link } from 'react-router-dom'
import { Button, Spin } from 'antd'

interface IpokemonList {
    isLoading: boolean

    isLoadingMore: boolean
    isHasMore: string | null
    offset: number
    limit: number

    items: Ipokemon[]
}
interface Ipokemon {
    name: string
    url: string
}

export default function Home() {
    const [pokemonList, setPokemonList] = useState<IpokemonList>({
        isLoading: true,
        isLoadingMore: false,
        isHasMore: null,
        offset: 0,
        limit: 20,
        items: [],
    })

    const fethPokemon = () => {
        if (pokemonList.isLoading || pokemonList.isLoadingMore) {
            axiosInstance
                .get(
                    `/pokemon?limit=${pokemonList.limit}&offset=${pokemonList.offset}`
                )
                .then((response) => {
                    setPokemonList({
                        ...pokemonList,
                        isHasMore: response.data.next,
                        isLoadingMore: false,
                        isLoading: false,
                        items: pokemonList.items.concat(response.data.results),
                        offset: pokemonList.offset + pokemonList.limit,
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    useEffect(fethPokemon, [pokemonList])

    const loadMore = () => {
        setPokemonList({
            ...pokemonList,
            isLoadingMore: true,
        })
    }

    return (
        <div className='container flex flex-col justify-center pb-12'>
            <div className='home__grid container'>
                {pokemonList.items.length === 0 || pokemonList.isLoading
                    ? renderLoader()
                    : pokemonList.items.map((pokemon, index) => {
                          return (
                              <Link
                                  className='bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl flex flex-col items-center'
                                  to={`/pokemon/${pokemon.name}`}
                                  key={index}
                              >
                                  <img
                                      alt={pokemon.name}
                                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                                          index + 1
                                      }.png`}
                                      onError={({ currentTarget }) => {
                                          currentTarget.src = ('/images/broken.png')
                                      }}
                                  />
                                  <h3 className='text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight'>
                                      {pokemon.name}
                                  </h3>
                              </Link>
                          )
                      })}
                <>
                    {pokemonList.items.length > 0 && pokemonList.isLoadingMore
                        ? renderLoader()
                        : null}
                </>
            </div>
            <Button onClick={loadMore}>Load More</Button>
        </div>
    )

    function renderLoader() {
        return [...Array(6)].map((_, index) => (
            <div
                className='bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl flex flex-col items-center'
                key={index}
            >
                <Spin size='large' />
            </div>
        ));
    }
}
