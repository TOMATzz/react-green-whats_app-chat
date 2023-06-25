const checkErrCode = (error) => {

   let connectStatus;

   switch (error) {

      case 'ERR_NETWORK': connectStatus = { connect: error, text: "Отсутствует подключение к интернету!", color: 'red' };
         break;
      case 'OK_NETWORK': connectStatus = { connect: '', text: '', color: '' };
         break;
      case 'ERR_CANCELED': connectStatus = { connect: error, text: ' Сервер не отвечает или медленный интернет,попробуйте позже !', color: 'red' };
         break;
      case 'AUTH_ERR_CANCELED': connectStatus = ' Сервер не отвечает или медленный интернет,попробуйте позже !';
         break;
      case 'AUTH_ERR_NETWORK': connectStatus = 'Отсутствует подключение к интернету!';
         break;
      case 'ERR_USER': connectStatus = { connect: error, text: "Не удалось найти пользователя!", color: 'red' };
         break;
      case 'AUTH_ERR_USER': connectStatus = ' Пользователь не авторизирован,проверьте свои учетные данные на Green-Api !'
         break;
      case 'OK_USER': connectStatus = { connect: error, text: "Пользователь успешно найден!", color: 'green' };
         break;
      case 'ERR_LIMIT': connectStatus = { connect: error, text: "Исчерпан лимит запросов  по вашему тарифу!", color: 'red' };
         break;
      case 'ERR_HISTORY_LIMIT': connectStatus = { connect: error, text: "Исчерпан лимит запросов истории сообщений по вашему тарифу!", color: 'red' };
         break;
      case 'ERR_TEL': connectStatus = { connect: error, text: "Не корректный номер телефона!", color: 'red' }
         break;
      case 'INVALID_INPUT_DATA': connectStatus = "Не корректный idInstance или apiTokenInstance , проверте данные ввода!";
         break;

      default:

         connectStatus = { connect: error, text: '', color: '' };

   }
   return connectStatus;
}

export default checkErrCode;