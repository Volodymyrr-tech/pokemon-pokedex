import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from '../features/pokemons/pokemonSlice'
import { pokemonApi } from '../features/apiSlice/apiSlice'

const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    pokemonList: pokemonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
