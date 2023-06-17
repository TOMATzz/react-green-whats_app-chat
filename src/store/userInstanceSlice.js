import { createSlice } from '@reduxjs/toolkit'


const initialState = {
   userInstance: {
      idInstance: 0,
      apiTokenInstance: 0
   },
}



export const idApiuserSlice = createSlice({
   name: 'idApiuser',
   initialState,
   reducers: {
      setUserInstance: (state, actions) => {

         state.userInstance = actions.payload
      }
   }
})
export const { setUserInstance } = idApiuserSlice.actions
export default idApiuserSlice.reducer