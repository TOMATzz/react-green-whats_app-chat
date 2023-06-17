import React, { useMemo } from 'react'

const MessageDisplayWindow = (props) => {

   return useMemo(() => {

      var date = new Date(Date.now());
      let flagCurrentDate = true;
      let previousDate = 0;
      let key = 0;
      return props.chatHistory.map(element => {

         let currentDate = new Date(element.timestamp * 1000);
         let dateMessage;

         if (flagCurrentDate) {
            previousDate = currentDate;
            flagCurrentDate = false;
         }

         if (currentDate.getDate() !== previousDate.getDate()) {

            if (previousDate.getDate() === date.getDate()) {
               dateMessage = "Сегодня"
            } else if (previousDate.getDate() === date.getDate() - 1) {
               dateMessage = "Вчера"
            } else {
               dateMessage = previousDate.toDateString().substring(4, 11)

            }
            previousDate = currentDate;

         }

         return <div key={key++} >

            {

               element.typeMessage === "textMessage" ||
                  element.typeMessage === "extendedTextMessage"
                  ?
                  <>
                     {
                        element.type === 'outgoing'
                           ?
                           <div className='mw_box_1' >

                              <div style={{ maxWidth: '50vw' }}>
                              </div>
                              <div className='outboxWindow'>
                                 <div className="greenArrow"></div>
                                 {element.textMessage}

                                 <div className='mw_box_2'>
                                    {currentDate.toLocaleTimeString().substring(0, 5)}

                                 </div>

                              </div>
                           </div>
                           :
                           <div className='mw_box_3'  >

                              <div className='inboxWindow'>
                                 <div className="whiteArrow"></div>
                                 {element.textMessage}

                                 <div className='mw_box_4' >
                                    <span>{currentDate.toLocaleTimeString().substring(0, 5)}</span>

                                 </div>
                              </div>
                              <div style={{ maxWidth: '50vw' }}>
                              </div>

                           </div>

                     }

                     {
                        dateMessage
                           ?
                           <div style={{ display: 'flex', justifyContent: 'center', margin: 15 }} >

                              <div className='dateMessage'>

                                 {dateMessage}

                              </div>
                              <div style={{ maxWidth: '50vw' }}>
                              </div>

                           </div>
                           :
                           null
                     }

                  </>
                  :
                  null
            }
         </div>

      })
   }, [props.chatHistory])

}

export default MessageDisplayWindow