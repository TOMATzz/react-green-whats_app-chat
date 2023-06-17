import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   contact: []
}

export const userContactSlice = createSlice({
   name: ' userContact',
   initialState,
   reducers: {
      setUserContact: (state, actions) => {

         state.contact = actions.payload
      }
   }
})
export const { setUserContact } = userContactSlice.actions
export default userContactSlice.reducer