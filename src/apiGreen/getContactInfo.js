import axios from 'axios';
const getContactInfo = async (idContact, userDataInstance) => {

   let data = JSON.stringify({
      "chatId": idContact
   });

   let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `https://api.green-api.com/waInstance${userDataInstance.idInstance}/getContactInfo/${userDataInstance.apiTokenInstance}`,
      signal: AbortSignal.timeout(10000),
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

export default getContactInfo