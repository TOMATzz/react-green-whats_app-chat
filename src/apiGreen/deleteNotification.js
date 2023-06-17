import axios from 'axios';
const deleteNotification = async (userDataInstance, responseReceiveNotification) => {
   try {
      return await axios.delete(`https://api.green-api.com/waInstance${userDataInstance.idInstance}/DeleteNotification/${userDataInstance.apiTokenInstance}/${responseReceiveNotification.data.receiptId}`)
   } catch (error) {
      console.error(error);
   }
}

export default deleteNotification