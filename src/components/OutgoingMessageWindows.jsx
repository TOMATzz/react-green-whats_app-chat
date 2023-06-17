import React, { useState } from 'react'
import { Spin, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import sendMessage from '../apiGreen/sendMessage';
import checkErrCode from '../utils/checkErrCode';
const { TextArea } = Input;

const OutgoingMessageWindows = ({ messageSpin, chatHistory, verificationSpin, width, setMessageSpin, setChatHistory, setConnectionStatus }) => {

   const [outgoingMessage, setOutgoingMessage] = useState('');
   const userDataInstance = useSelector(state => state.idApiUser.userInstance);
   const inputContactPhone = useSelector(state => state.phone.contactPhone);


   const sendingMessages = async (setMessageSpin, setChatHistory, setConnectionStatus, chatHistory) => {

      setMessageSpin(true);

      try {
         let response = await sendMessage(outgoingMessage, inputContactPhone.subscriberPhone, userDataInstance);

         if (response.status === 200) {


            setChatHistory([{ type: 'outgoing', idMessage: response.data.idMessage, timestamp: Math.round(Date.now() / 1000), textMessage: outgoingMessage, typeMessage: "textMessage" }, ...chatHistory])

            setOutgoingMessage('');

            setMessageSpin(false);

         } else {

            setMessageSpin(false);


         }
      } catch (error) {

         setConnectionStatus(checkErrCode(error.code));
      }

     
   }

   return (
      <div >
         <div className='cmw_box_1'>

            <TextArea className='textArea'

               value={outgoingMessage}

               onChange={(e) => {

                  if (!messageSpin && !verificationSpin && inputContactPhone.subscriberPhone)
                     setOutgoingMessage(e.target.value)

               }}
               placeholder="Введите сообщение"
               autoSize={{
                  minRows: 1,
                  maxRows: 10,
               }}
            />

            {
               !messageSpin
                  ?
                  <button className='btnSendMessage'
                     style={
                        width <= 620
                           ?
                           { width: '13%' }
                           :
                           { width: '8%' }

                     }
                     onClick={() => {
                        if (
                           inputContactPhone.subscriberPhone
                           && !outgoingMessage.length !== 0
                           && verificationSpin !== true
                           && messageSpin !== true
                           && outgoingMessage.replace(/\s/g, '').length !== 0) {

                           sendingMessages(setMessageSpin, setChatHistory, setConnectionStatus, chatHistory);
                        }
                     }}

                  >
                     < SendOutlined className='sendOutlined' />
                  </button>
                  :
                  <div className='cmw_box_2' >
                     <Spin spinning={messageSpin} size="middle" />
                  </div>

            }

         </div>
      </div>
   )
}

export default OutgoingMessageWindows