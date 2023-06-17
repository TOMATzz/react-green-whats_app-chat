import axios from 'axios';
const getAvatar = async (chatId, userDataInstance) => {


   let data = JSON.stringify({
      "chatId": `${chatId}`,
   });

   let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `https://api.green-api.com/waInstance${userDataInstance.idInstance}/getAvatar/${userDataInstance.apiTokenInstance}`,
      signal: AbortSignal.timeout(5000),
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

export default getAvatar