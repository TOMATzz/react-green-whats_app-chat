import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setIsContactPhone } from '../store/contactPhoneSlice';
import { Input, Spin } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import checkErrCode from '../utils/checkErrCode';

const ContactEntryWindow = ({ connectionStatus, messageSpin, verificationSpin, userVerification, setUserInformation, setChatHistory, setConnectionStatus }) => {

   const dispatch = useDispatch();
   const inputContactPhone = useSelector(state => state.phone.contactPhone);

   if (!window.navigator.onLine) {

      connectionStatus.connect !== 'ERR_NETWORK' && setConnectionStatus(checkErrCode('ERR_NETWORK'));
   }
   if (window.navigator.onLine) {

      connectionStatus.connect === 'ERR_NETWORK' && setConnectionStatus(checkErrCode('OK_NETWORK'));
   }

   const onClick = () => {
      if (
         !messageSpin
         && !verificationSpin
         && connectionStatus.connect !== 'ERR_NETWORK')

         if (inputContactPhone.inputValuePhone.length >= 3) {

            dispatch(setIsContactPhone({ inputValuePhone: '', subscriberPhone: inputContactPhone.inputValuePhone }));

            setChatHistory([]);
            setUserInformation({});
            userVerification();

         } else {

            setConnectionStatus(checkErrCode('ERR_TEL'));

         }

   }


   return (

      <div className='icw-box_1'>

         {
            !connectionStatus.text.length
               ?
               <>
                  <Input
                     className='inputContact'
                     addonBefore={

                        !verificationSpin
                           ?
                           <UserAddOutlined

                              onClick={(e) => { onClick(); }}
                              style={{ cursor: 'pointer', fontSize: 20, color: '#00a884' }}
                           />
                           :

                           <Spin style={{ width: '14px' }} spinning={verificationSpin} size="smail" />
                     }

                     style={{ fontSize: 25, width: "90%" }}
                     placeholder="Введите номер телефона"
                     value={inputContactPhone.inputValuePhone.replace(/[^0-9]/g, '')}

                     onChange={(e) => {

                        if (!messageSpin && !verificationSpin)

                           dispatch(setIsContactPhone({ inputValuePhone: e.target.value, subscriberPhone: inputContactPhone.subscriberPhone }));
                     }}

                  />

               </>
               :
               <div  >

                  {
                     <div style={{ color: connectionStatus.color, textAlign: "center", marginTop: '2%', marginBottom: '2%' }}>{connectionStatus.text}
                        <script>
                           {
                              connectionStatus.connect !== 'ERR_NETWORK'
                                 ?
                                 setTimeout(() => {
                                    setConnectionStatus({ connect: '', text: '', color: '' });
                                 }, 3000)
                                 :
                                 null
                           }
                        </script>

                     </div>

                  }

               </div>

         }
      </div>
   )
}

export default ContactEntryWindow;