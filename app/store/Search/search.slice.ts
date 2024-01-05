import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"

interface IInitialState {
  searchQuery: string

  data: []
}

const initialState: IInitialState = {
  searchQuery: "",
  data: [],
 
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (
      state: Draft<IInitialState>,
      action: PayloadAction<Pick<IInitialState, "searchQuery">>,
    ) => {
      state.searchQuery = action.payload?.searchQuery
    },

 
  },
})

export const {
  setSearchQuery,

} = searchSlice.actions

export default searchSlice.reducer
