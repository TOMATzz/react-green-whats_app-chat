import axios from 'axios';
const getChatHistory = async (userPhone, userDataInstance) => {

   let data = JSON.stringify({
      "chatId": `${userPhone}@c.us`,
      "count": 100
   });

   let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `https://api.green-api.com/waInstance${userDataInstance.idInstance}/getChatHistory/${userDataInstance.apiTokenInstance}`,
   headers: {
         'Content-Type': 'application/json'
      },
      data: data
   };

   try {
      return await axios.request(config)

   } catch (error) {

      return error;
   }

}

export default getChatHistory