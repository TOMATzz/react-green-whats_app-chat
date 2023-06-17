import axios from 'axios';
const getStateInstance = async (values) => {

   try {
      return await axios.get(`https://api.green-api.com/waInstance${values.idInstance}/getStateInstance/${values.apiTokenInstance}`, { signal: AbortSignal.timeout(10000) })

   } catch (error) {

      return error;
   }
}

export default getStateInstance