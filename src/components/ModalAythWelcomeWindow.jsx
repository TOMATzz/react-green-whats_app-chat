import React, { useState } from 'react';
import { Button, Modal, Form, Input, Spin } from 'antd';

import { useDispatch } from "react-redux"
import { setIsAuth } from '../store/userAuthSlice';
import { setUserContact } from '../store/userWhatsAppContactSlice'
import { setUserInstance } from '../store/userInstanceSlice'
import checkErrCode from '../utils/checkErrCode';
import { useNavigate } from 'react-router-dom';
import getStateInstance from "../apiGreen/getStateInstance.js"
import getContacts from '../apiGreen/getContacts';
import getContactInfo from '../apiGreen/getContactInfo';


const ModalAythWelcomeWindow = ({ isModalOpen, setIsModalOpen }) => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [modalWarningText, setModalWarningText] = useState(0);
   const [authSpin, setAuthSpin] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const onValuesChange = () => {
      modalWarningText && setModalWarningText(0);
   }

   const handleCancel = () => {
      setIsModalOpen(false);
   };

   const authApiGreen = async (values) => {

      modalWarningText && setModalWarningText(0);

      setAuthSpin(true);
      try {
         let response = await getStateInstance(values);

         if (response.status === 200 && response.data.stateInstance === 'authorized') {

            getMyContacts(values);
            dispatch(setUserInstance(values));
            dispatch(setIsAuth(true));
            setIsModalOpen(false);
            navigate('/message');
            setAuthSpin(false);

         } else {

            if (response.code === 'ERR_CANCELED') {
               setErrorMessage(checkErrCode('AUTH_ERR_CANCELED'));

               setTimeout(() => {
                  window.location.reload();
               }, 4000);


            } else if (response.code === 'ERR_NETWORK') {
               setErrorMessage(checkErrCode('AUTH_ERR_NETWORK'));

            } else {
               setErrorMessage(checkErrCode('AUTH_ERR_USER'));

            }
            setModalWarningText(1);
            setAuthSpin(false);

         }
      } catch (e) {

         return null;

      }

      return null;

   };

   const getMayContactsData = (dataContacts, values) => {

      let counter = 0;
      let array = [];
      let mayContactDataArray = [];

      const timerId = setInterval(async () => {


         try {

            let responseContactInfo = await getContactInfo(dataContacts[counter].id, values)

            if (responseContactInfo.status === 200 && responseContactInfo.data.chatId === dataContacts[counter].id) {

               array = [...array, { avatar: responseContactInfo.data.avatar, ...dataContacts[counter] }];

               mayContactDataArray = [...array, ...dataContacts.slice(counter + 1, dataContacts.length)]

               dispatch(setUserContact(mayContactDataArray));
               counter++;

            } else return null;


            if (counter >= dataContacts.length) {

               clearInterval(timerId);

            }

         } catch (e) {

            return null;

         }

      }, 1000);

      return null;
   }

   const getMyContacts = async (values) => {
      try {

         let response = await getContacts(values);

         if (response.status === 200) {

            console.log(response)

            dispatch(setUserContact(response.data));
            getMayContactsData(response.data, values)

         } else {

            getMyContacts(values);

         }

      } catch (e) {

         return null;

      }

      return null;

   }

   return (

      <Modal title=" Введите свои учётные данные GREEN-API "
         style={{ textAlign: 'center' }}
         open={isModalOpen}
         onCancel={handleCancel}
         footer={[]}
      >
         <Form
            style={{ marginTop: 20 }}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onValuesChange={onValuesChange}
            onFinish={authApiGreen}
            autoComplete="on"
         >
            <Form.Item
               label="IdInstance"
               name="idInstance"
               rules={[
                  {
                     required: true,
                     message: 'Введите IdInstance!',
                  },
               ]}
            >
               <Input />

            </Form.Item>

            <Form.Item
               label="ApiTokenInstance"
               name="apiTokenInstance"
               rules={[
                  {
                     required: true,
                     message: 'Введите ApiTokenInstance!',
                  },
               ]}
            >
               <Input />

            </Form.Item>

            {
               modalWarningText === 0
                  ?
                  <div style={{ marginBottom: "2%", height: '66px' }}>
                     <Spin spinning={authSpin} size="large" />
                  </div>
                  :
                  <div style={{ color: 'red', marginBottom: "2%" }}>

                     {errorMessage}
                  </div>}

            <Form.Item wrapperCol={{ offset: 1 }}>
               <Button
                  style={{ width: "30%" }}
                  type="primary"
                  htmlType="submit">
                  Ok
               </Button>
            </Form.Item>

         </Form>
      </Modal>

   )
}

export default ModalAythWelcomeWindow