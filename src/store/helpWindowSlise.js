import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   window: false,
}



export const helpWindowSlice = createSlice({
   name: 'helpWindow',
   initialState,
   reducers: {
      setHelpWindow: (state, actions) => {
         state.window = actions.payload
      }
   }
})
export const { setHelpWindow } = helpWindowSlice.actions
export default helpWindowSlice.reducer
