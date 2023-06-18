import { useEffect, useState } from 'react'
import axios from 'axios'
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
        isLoading: false,
        isLoadingMore: false,
        isHasMore: null,
        offset: 0,
        limit: 20,
        items: [],
    })

    const fethPokemon = () => {
        axios
            .get(
                `https://pokeapi.co/api/v2/pokemon?limit=${pokemonList.limit}&offset=${pokemonList.offset}}`
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
                                  className='home__grid__item'
                                  to={`/pokemon/${pokemon.name}`}
                                  key={index}
                              >
                                  <img
                                      alt={pokemon.name}
                                      className='home__grid__item__image'
                                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                                          index + 1
                                      }.png`}
                                      onError={({ currentTarget }) => {
                                          currentTarget.src = require('assets/broken.png')
                                      }}
                                  />
                                  <span>{pokemon.name}</span>
                              </Link>
                          )
                      })}
                <>
                    {pokemonList.items.length > 0 && pokemonList.isLoadingMore
                        ? renderLoader()
                        : null}
                </>
            </div>
            <Button type='primary' onClick={loadMore}>
                Load More
            </Button>
        </div>
    )

    function renderLoader() {
        return Array.apply(null, Array(6)).map((_, index) => (
            <div className='home__grid__item py-12' key={index}>
                <Spin size='large' />
            </div>
        ))
    }
}
