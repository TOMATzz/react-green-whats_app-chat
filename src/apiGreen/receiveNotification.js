import axios from 'axios';

const receiveNotification = (userDataInstance) => {

   try {

      return axios.get(`https://api.green-api.com/waInstance${userDataInstance.idInstance}/ReceiveNotification/${userDataInstance.apiTokenInstance}`)
   } catch (error) {

      return error;
   }
}

export default receiveNotification