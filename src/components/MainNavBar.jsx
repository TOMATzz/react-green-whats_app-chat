import React, { useState } from 'react'
import { Button, Modal, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsAuth } from '../store/userAuthSlice';
import { setHelpWindow } from '../store/helpWindowSlise'
import { AndroidOutlined, HomeOutlined, FileUnknownOutlined } from '@ant-design/icons';
import ContSM from '../images/contSM.jpg'
import MobSM1 from '../images/mobSM1.jpg'
import MobSM2 from '../images/mobSM2.jpg'
import SendSM from '../images/sendMesSM.jpg'
import useWindowDimensions from '../utils/getWindowDimensions';
import "../styles/mainNavBar.css"


const MainNavBar = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate()
   const isAuth = useSelector(state => state.auth.isAuth);
   const helpWin = useSelector(state => state.helpWindow.window);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

   const showModal = () => { setIsModalOpen(true); };
   const handleCancel = () => { setIsModalOpen(false); };
   const showHelpModal = () => { setIsHelpModalOpen(true); };
   const handleCancelHelpModal = () => { setIsHelpModalOpen(false); };
   const { width: screenWidth } = useWindowDimensions();

   var heightHelpImage = 220;
   var widthHelpImage = 220;

   if (screenWidth <= 620) {
      heightHelpImage = 150;
      widthHelpImage = 150;
   }

   return (
      <div className='header'>
         {
            screenWidth >= 620
               ?
               'Send messages to WhatsApp'
               :
               ' Send messages'
         }


         <div className='navBarBox_1'>

            {
               !helpWin && <>
                  <Button
                     onClick={showModal}
                     type="primary"
                     className='navBarBtn'

                  >
                     {
                        screenWidth >= 620
                           ?
                           'Создать чат-бота'
                           :
                           <AndroidOutlined style={{ fontSize: '150%' }} />
                     }


                  </Button>

                  <Button

                     type="primary"
                     className='navBarBtn'

                     onClick={() => {
                        if (isAuth) {
                           showHelpModal()

                        } else {
                           dispatch(setHelpWindow(true));

                           navigate('/help')
                        }
                     }}
                  >
                     {
                        screenWidth >= 620
                           ?
                           'Как это работает?'
                           :
                           <FileUnknownOutlined style={{ fontSize: '150%' }} />
                     }

                  </Button>
               </>
            }

            {
               isAuth &&
               <Button

                  type="primary"
                  className='navBarBtn'
                  onClick={() => {

                     dispatch(setIsAuth(false));
                     dispatch(setHelpWindow(false));
                     navigate('/')

                  }}
               >
                  {
                     screenWidth >= 620
                        ?
                        'Выход'
                        :
                        <HomeOutlined style={{ fontSize: '150%' }} />
                  }
               </Button>

            }

            {
               helpWin &&
               <Button

                  type="primary"
                  className='navBarBtn'
                  onClick={() => {

                     navigate('/');


                     dispatch(setHelpWindow(false));

                  }}
               >
                  Назад
               </Button>

            }


         </div>
         <Modal title="Данная опция возможна в платной версии."
            style={{ textAlign: 'center' }}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[]}
         >

            <p >Что можно с помощью чат-бота?</p>
            <p style={{ textAlign: 'left' }}>- отправка  уведомлений в групповой чат WhatsApp: текста,изображений,ссылок,кнопок и т.д.</p>
            <p style={{ textAlign: 'left' }}> - отправка уведомлений в зависимости от событий или в автоматическом режиме</p>
            <p style={{ textAlign: 'left' }}> - отправка уведомлений в определенное время в автомотическом режиме (в том числе себе)</p>
            <p style={{ textAlign: 'left' }}> - создание опросника для сбора информации</p>
            <p style={{ textAlign: 'left' }}> - общение в чате по средством ChatGpt</p>
            <p style={{ textAlign: 'left' }}> - реал-тайм перевод текстовых сообщений</p>
            <p > и многое другое</p>
            <p >по всем вопросам пишите на WhatsApp 79657160356</p>
         </Modal>

         <Modal
            style={{ textAlign: 'center' }}
            open={isHelpModalOpen}
            onCancel={handleCancelHelpModal}
            footer={[]}
         >

            <Image
               width={widthHelpImage}
               height={heightHelpImage}
               src={ContSM}

            />
            <Image
               width={widthHelpImage}
               height={heightHelpImage}
               src={SendSM}

            />

            <div>
               <Image
                  width={widthHelpImage / 1.7}
                  height={heightHelpImage}
                  src={MobSM1}

               />
               <Image
                  width={widthHelpImage / 1.7}
                  height={heightHelpImage}
                  src={MobSM2}

               />
            </div>

         </Modal>

      </div >
   )
}

export default MainNavBar