import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   isAuth: false,
}



export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setIsAuth: (state, actions) => {
         state.isAuth = actions.payload
      }
   }
})
export const { setIsAuth } = authSlice.actions
export default authSlice.reducer




