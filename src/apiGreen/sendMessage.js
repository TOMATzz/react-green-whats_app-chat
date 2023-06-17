import axios from 'axios';
const sendMessage = async (messageText, userPhone, userDataInstance) => {

   let data = JSON.stringify({
      "chatId": `${userPhone}@c.us`,
      "message": `${messageText}`
   })

   let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `https://api.green-api.com/waInstance${userDataInstance.idInstance}/sendMessage/${userDataInstance.apiTokenInstance}`,
      signal: AbortSignal.timeout(20000),
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

export default sendMessage