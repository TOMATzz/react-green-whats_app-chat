import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   contactPhone: {
      inputValuePhone: '',
      subscriberPhone: ''
   },
}



export const contactPhoneSlice = createSlice({
   name: 'phone',
   initialState,
   reducers: {
      setIsContactPhone: (state, actions) => {
         state.contactPhone = actions.payload
      }
   }
})
export const { setIsContactPhone } = contactPhoneSlice.actions
export default contactPhoneSlice.reducer