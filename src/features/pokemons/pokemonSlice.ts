import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  list: [],
}
const pokemonsSlice = createSlice({
  name: 'pokemonList',
  initialState,
  reducers: {
    added: (state, action: PayloadAction<any>) => {
      state.list.push(...action.payload)
    },
  },
})

export default pokemonsSlice.reducer
export const { added } = pokemonsSlice.actions
