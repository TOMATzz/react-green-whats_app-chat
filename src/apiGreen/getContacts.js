import axios from 'axios';
const getContacts = async (values) => {
   try {
      return await axios.get(`https://api.green-api.com/waInstance${values.idInstance}/getContacts/${values.apiTokenInstance}`,
         { headers: {} }, { signal: AbortSignal.timeout(5000) })
   } catch (error) {
      return error;
   }
}

export default getContacts