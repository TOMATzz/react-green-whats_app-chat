import React from 'react'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux"

const ContactDisplayWindow = ({ userInformation, width }) => {

   const inputContactPhone = useSelector(state => state.phone.contactPhone);


   return (
      <div className='hmw_box_1' >
         <div className='hmw_box_2' >

            {
               userInformation && userInformation.avatar
                  ?
                  <Avatar style={{ marginLeft: '1%', minWidth: 40 }} size={40}

                     src={userInformation.avatar}

                  />
                  :
                  <Avatar style={{ marginLeft: '1%', minWidth: 40 }} size={40}

                     icon={< UserOutlined />}

                  />
            }

            <span style={

               userInformation
                  ?
                  { marginLeft: '3%' }
                  :
                  { marginLeft: '3%', color: '#00a884', maxHeight: '6vh' }
            }>
               {
                  userInformation && userInformation.name

                     ?
                     userInformation.name
                     :
                     width <= 620
                        ?
                        inputContactPhone.subscriberPhone || "Выберите пользователя  WhatsApp "
                        :
                        ""
               }
            </span>
            {

               userInformation && width > 620
                  ?
                  <span style={{ marginLeft: 10, color: '#00a884', textAlign: 'center' }}>
                     {inputContactPhone.subscriberPhone}
                  </span>
                  :
                  <></>

            }

         </div >

      </div >
   )
}

export default ContactDisplayWindow