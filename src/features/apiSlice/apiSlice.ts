import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon/' }),
  endpoints: (builder) => ({
    getPokemonOffset: builder.query({
      query: (offset) => `?offset=${offset}&limit=12`,
      transformResponse: (response: any) => {
        const getPokemonData = async (pokemon: any) => {
          const pokemonRes = await axios.get(pokemon.url)
          return {
            id: pokemonRes.data.id,
            name: pokemonRes.data.name,
            img: pokemonRes.data.sprites.front_default,
            types: pokemonRes.data.types.map((type: any) => type.type.name),
            weight: pokemonRes.data.weight,
            HP: pokemonRes.data.stats.find(
              (stat: any) => stat.stat.name === 'hp'
            ).base_stat,
            attack: pokemonRes.data.stats.find(
              (stat: any) => stat.stat.name === 'attack'
            ).base_stat,
            defense: pokemonRes.data.stats.find(
              (stat: any) => stat.stat.name === 'defense'
            ).base_stat,
            SPattack: pokemonRes.data.stats.find(
              (stat: any) => stat.stat.name === 'special-attack'
            ).base_stat,
            SPdefense: pokemonRes.data.stats.find(
              (stat: any) => stat.stat.name === 'special-defense'
            ).base_stat,
            speed: pokemonRes.data.stats.find(
              (stat: any) => stat.stat.name === 'speed'
            ).base_stat,
            total_moves: pokemonRes.data.moves.length,
          }
        }

        const pokemonDataPromises = response.results.map((pokemon) =>
          getPokemonData(pokemon)
        )

        return Promise.all(pokemonDataPromises)
      },
    }),
  }),
})

export const { useGetPokemonOffsetQuery } = pokemonApi
