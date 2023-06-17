import React from 'react'
import WelcomeWindow from './pages/WelcomeWindow'
import MessengerWorkWindow from './pages/MessengerWorkWindow';
import HelpWindow from './pages/HelpWindow';
import { Route, Routes } from "react-router-dom";
import MainNavBar from './components/MainNavBar';
import { useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';

const App = () => {
   const isAuth = useSelector(state => state.auth.isAuth);
   const helpWin = useSelector(state => state.helpWindow.window);
   return (
      <ConfigProvider
         theme={{
            token: {
               colorPrimary: '#00a884',
            },
         }}
      >

         <div>
            <MainNavBar />

            <Routes>
               {
                  !isAuth
                     ?
                     <Route path='/' element={<WelcomeWindow />} />
                     :
                     <Route path='/message' element={<MessengerWorkWindow />} />



               }

               {helpWin && <Route path='/help' element={<HelpWindow />} />}

               <Route path='/*' element={<WelcomeWindow />} />

            </Routes>
         </div>


      </ConfigProvider>
   )
}

export default App