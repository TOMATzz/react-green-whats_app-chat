import { configureStore } from '@reduxjs/toolkit'
import isAuthReducer from './userAuthSlice';
import idApiUserReducer from './userInstanceSlice';
import userContactReducer from './userWhatsAppContactSlice'
import isContactPhone from './contactPhoneSlice'
import helpWindowReducer from './helpWindowSlise'

export const store = configureStore({
   reducer: {
      auth: isAuthReducer,
      idApiUser: idApiUserReducer,
      userContact: userContactReducer,
      phone: isContactPhone,
      helpWindow: helpWindowReducer
   }
})






