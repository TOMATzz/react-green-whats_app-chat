import React, { useState } from 'react';
import { Button, Layout } from 'antd';
import '../styles/welcomeWindow.css';
import ModalAythWelcomeWindow from '../components/ModalAythWelcomeWindow';


const WelcomeWindow = () => {
  
   const [isModalOpen, setIsModalOpen] = useState(false);

   const showModal = () => {
      setIsModalOpen(true);

   };

   return (
      <Layout>
         <div className='main'>
            <div className='greetings'>
               Добро пожаловать в сервис отправки сообщений пользователям WhatsApp!
            </div>
            <Button
               type="primary"
               className='btnOpenModal'
               onClick={showModal}
            >
               Войти
            </Button>

            <Button type="link" target="_blank" href="https://console.green-api.com/auth"> Войти или зарегистрироваться в Api-Green</Button>

            <ModalAythWelcomeWindow isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

         </div >
      </Layout >
   );
}

export default WelcomeWindow;
