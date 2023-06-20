import React, { useMemo } from 'react'
import { setIsContactPhone } from '../store/contactPhoneSlice';
import { Avatar, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

const ContactsSelectionMenu = () => {

   const myWhatsAppContact = useSelector(state => state.userContact.contact);
   const inputContactPhone = useSelector(state => state.phone.contactPhone);
   const dispatch = useDispatch();

   const onClick = (e) => {

      dispatch(setIsContactPhone({ inputValuePhone: e.key.replace(/[^0-9]/g, ''), subscriberPhone: inputContactPhone.subscriberPhone }))
   };

   return useMemo(() => {

      if (myWhatsAppContact) {

         return < Menu
            className='contactMenu'
            onClick={onClick}
            mode="inline"
            theme='light'
            items={

               myWhatsAppContact.map((elem) => {

                  return elem.name !== ''
                     ?
                     {
                        label: elem.name, key: elem.id,
                        icon: elem.avatar
                           ?
                           < Avatar
                              style={{ justifyContent: 'center' }}
                              size={40}
                              src={elem.avatar}
                           />
                           :
                           < Avatar
                              style={{ justifyContent: 'center' }}
                              size={40}
                              icon={< UserOutlined />}
                           />,

                        children: "", type: ""
                     }
                     :
                     null


               })
            }
         />
      } else return [];
      // eslint-disable-next-line
   }, [myWhatsAppContact]);
}

export default ContactsSelectionMenu