import React, { useEffect, useState } from 'react'
import "../styles/messengerWorkWindow.css"
import { UserSwitchOutlined, CommentOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import getContactInfo from "../apiGreen/getContactInfo"
import getChatHistory from '../apiGreen/getChatHistory';
import deleteNotification from '../apiGreen/deleteNotification';
import receiveNotification from "../apiGreen/receiveNotification"
import { setIsContactPhone } from '../store/contactPhoneSlice';
import useWindowDimensions from '../utils/getWindowDimensions.js'
import MessageDisplayWindow from '../components/MessageDisplayWindow';
import ContactsSelectionMenu from '../components/ContactsSelectionMenu';
import ContactEntryWindow from '../components/ContactEntryWindow';
import ContactDisplayWindow from '../components/ContactDisplayWindow'
import OutgoingMessageWindows from '../components/OutgoingMessageWindows';
import checkErrCode from '../utils/checkErrCode';


const MessengerWorkWindow = () => {

   const dispatch = useDispatch();
   const [userInformation, setUserInformation] = useState();
   const [chatHistory, setChatHistory] = useState([]);
   const [verificationSpin, setVerificationSpin] = useState(false);
   const [messageSpin, setMessageSpin] = useState(false);
   const [windowSwitchButton, setWindowSwitchButton] = useState(false)
   const [responseReceiveNotification, setResponseReceiveNotification] = useState();
   const [connectionStatus, setConnectionStatus] = useState({ connect: '', text: '', color: '' });

   const userDataInstance = useSelector(state => state.idApiUser.userInstance);
   const inputContactPhone = useSelector(state => state.phone.contactPhone);
   const { width: screenWidth } = useWindowDimensions();





   useEffect(() => {

      async function incomingMessages() {

         try {

            setResponseReceiveNotification(await receiveNotification(userDataInstance))
            setConnectionStatus(checkErrCode('OK_NETWORK'));

         } catch (error) {

            setConnectionStatus(checkErrCode(error.code));
         }

      }

      incomingMessages();
      // eslint-disable-next-line
   }, [responseReceiveNotification])

   const saveMessageInHistory = (typeMessage, response) => {

      let textMessage;

      if (response.data.body.messageData.textMessageData !== undefined) {
         textMessage = response.data.body.messageData.textMessageData.textMessage;

      } else if (response.data.body.messageData.extendedTextMessageData !== undefined) {
         textMessage = response.data.body.messageData.extendedTextMessageData.text;

      }

      setChatHistory([{
         type: typeMessage,
         idMessage: response.data.body.idMessage,
         timestamp: response.data.body.timestamp,
         textMessage: textMessage,
         typeMessage: response.data.body.messageData.typeMessage
      }, ...chatHistory])

   }

   if (responseReceiveNotification && responseReceiveNotification.status === 200) {

      try {

         if (responseReceiveNotification.data !== null) {

            if (
               responseReceiveNotification.data.body.typeWebhook === 'incomingMessageReceived'
               &&
               inputContactPhone.subscriberPhone === responseReceiveNotification.data.body.senderData.chatId.replace(/[^0-9]/g, '')
               &&
               responseReceiveNotification.data.body.messageData.typeMessage === 'textMessage'
               &&
               chatHistory.length !== 0 && responseReceiveNotification.data.body.idMessage !== chatHistory[0].idMessage
            ) {

               saveMessageInHistory("incoming", responseReceiveNotification);

            } else if (
               (
                  responseReceiveNotification.data.body.typeWebhook === 'outgoingMessageReceived'
                  ||
                  responseReceiveNotification.data.body.typeWebhook === 'outgoingAPIMessageReceived'
               )
               &&
               (
                  (
                     responseReceiveNotification.data.body.senderData !== undefined
                     && inputContactPhone.subscriberPhone === responseReceiveNotification.data.body.senderData.chatId.replace(/[^0-9]/g, '')
                  )
                  ||
                  (
                     responseReceiveNotification.data.body.senderData === undefined
                     && inputContactPhone.subscriberPhone === responseReceiveNotification.data.body.chatId.replace(/[^0-9]/g, '')
                  )

               )
               &&
               chatHistory.length !== 0 && responseReceiveNotification.data.body.idMessage !== chatHistory[0].idMessage

            ) {

               saveMessageInHistory("outgoing", responseReceiveNotification);

            }

            deleteNotification(userDataInstance, responseReceiveNotification);
         }
      } catch (e) {

         return null;
      }

   }
   //--------------------------------------------
   const userChatHistory = async (userPhone) => {


      try {
         let response = await getChatHistory(userPhone, userDataInstance);

         if (response.status === 200) {

            setChatHistory(response.data);

         } else if (response.response.status === 466) {

            setConnectionStatus(checkErrCode('ERR_HISTORY_LIMIT'));

         } else setConnectionStatus(checkErrCode(response.response.status));

      } catch (error) {

         setConnectionStatus(checkErrCode(error.code));
      }

      return null;
   }
   //--------------------------------------------
   const userVerification = async () => {

      setVerificationSpin(true);

      try {

         let response = await getContactInfo(inputContactPhone.inputValuePhone, userDataInstance);

         if (response.status === 200) {

            setUserInformation(response.data);
            setConnectionStatus(checkErrCode('OK_USER'));


            userChatHistory(inputContactPhone.inputValuePhone);

            dispatch(setIsContactPhone({ inputValuePhone: '', subscriberPhone: inputContactPhone.inputValuePhone }));

            setVerificationSpin(false);

            if (screenWidth <= 620)
               onClickWindowSwitchButton();

         } else {

            if (response.code === 'ERR_CANCELED') {

               setConnectionStatus(checkErrCode(response.code));

            } else {

               setConnectionStatus(checkErrCode('ERR_USER'));
            }
            setChatHistory([]);
            dispatch(setIsContactPhone({ inputValuePhone: '', subscriberPhone: '' }));
            setVerificationSpin(false);

         }
      } catch (error) {

         setConnectionStatus(checkErrCode(error.code));
      }

      return null;

   }
   //--------------------------------------------
   const onClickWindowSwitchButton = () => {

      if (windowSwitchButton === false) {
         setWindowSwitchButton(true)
      } else
         setWindowSwitchButton(false)
   }

   //---------------------------------------------------------------------
   return (

      <div className='contentBox' >

         {
            screenWidth <= 620
               ?
               <div className='btnWindowSwitch'

                  onClick={onClickWindowSwitchButton}
               >
                  {
                     windowSwitchButton === false

                        ?
                        <UserSwitchOutlined className='iconBtnWindowSwitch'
                        />
                        :
                        <CommentOutlined className='iconBtnWindowSwitch'
                        />
                  }

               </div>
               :
               <></>
         }

         <div className='itemsBox' style={

            windowSwitchButton !== false
               ?
               screenWidth <= 620
                  ?
                  { transform: 'scale(1)', width: '96vw' }
                  :
                  { transform: 'scale(1)', width: '30%' }
               :
               screenWidth >= 620
                  ?
                  { transform: 'scale(1)', width: '30%' }
                  :
                  { transform: 'scale(0)', position: 'absolute' }

         }>
            <div className='items_box_1' >
               <span style={{ marginLeft: 10 }}>Мой инстанс</span>
               <span style={{ marginLeft: 10 }}>{userDataInstance.idInstance}</span>

            </div>

            <ContactEntryWindow
               connectionStatus={connectionStatus}
               messageSpin={messageSpin}
               verificationSpin={verificationSpin}
               userVerification={userVerification}
               setUserInformation={setUserInformation}
               setChatHistory={setChatHistory}
               setConnectionStatus={setConnectionStatus}
            />

            <div className='items_box_2' >

               <ContactsSelectionMenu />

            </div>
         </div>

         {
            windowSwitchButton === false || screenWidth >= 620
               ?
               <div className='messageBox' style={

                  screenWidth <= 620
                     ?
                     { width: '100%' }
                     :
                     { width: '70%' }

               } >

                  <ContactDisplayWindow
                     userInformation={userInformation}
                     width={screenWidth}
                  />


                  <div className='message_box_1' >

                     <div className='message_box_2'>

                        <MessageDisplayWindow chatHistory={chatHistory} />

                     </div>

                     <OutgoingMessageWindows
                        messageSpin={messageSpin}
                        chatHistory={chatHistory}
                        verificationSpin={verificationSpin}
                        width={screenWidth}
                        setMessageSpin={setMessageSpin}
                        setChatHistory={setChatHistory}
                        setConnectionStatus={setConnectionStatus}

                     />

                  </div>
               </div>
               :
               <></>
         }

      </div >

   )
}

export default MessengerWorkWindow;



