import React from 'react'
import { Image } from 'antd'
import WelW from '../images/welcomeWindow.jpg'
import ImputRegAG from '../images/inputRegApiGreen.jpg'
import AuthAG from '../images/modalAuthApiGreen.jpg'
import InsAG from '../images/instApiGreen.jpg'
import InsDev from '../images/insDev.jpg'
import InsOK from '../images/insOk.jpg'
import InsNA from '../images/insNotActiv.jpg'
import InsLink from '../images/insLink.jpg'
import InsQR from '../images/insQR.jpg'
import SetIns from '../images/setIns.jpg'
import SendSM from '../images/sendMesSM.jpg'
import AuthSM from '../images/authSM.jpg'
import ContSM from '../images/contSM.jpg'
import MobSM1 from '../images/mobSM1.jpg'
import MobSM2 from '../images/mobSM2.jpg'
import "../styles/helpWindow.css"

const HelpWindow = () => {

   var screenWidth = 200;
   var screenHeight = 200;

   return (
      <div className='helpWindow'>

         <Image
            width={screenWidth}
            height={screenHeight}
            src={WelW}

         />

         <Image
            width={screenWidth}
            height={screenHeight}
            src={AuthAG}

         />

         <Image
            width={screenWidth}
            height={screenHeight}
            src={ImputRegAG}

         />

         <Image
            width={screenWidth}
            height={screenHeight}
            src={InsAG}

         />
         <Image
            width={screenWidth}
            height={screenHeight}
            src={InsDev}

         />

         <Image
            width={screenWidth}
            height={screenHeight}
            src={InsOK}

         />

         <Image
            width={screenWidth}
            height={screenHeight}
            src={InsNA}

         />
         <Image
            width={screenWidth}
            height={screenHeight}
            src={InsLink}

         />
         <Image
            width={screenWidth}
            height={screenHeight}
            src={InsQR}

         />
         <Image
            width={screenWidth}
            height={screenHeight}
            src={SetIns}

         />
         <Image
            width={screenWidth}
            height={screenHeight}
            src={AuthSM}

         />

         <Image
            width={screenWidth}
            height={screenHeight}
            src={ContSM}

         />
         <Image
            width={screenWidth}
            height={screenHeight}
            src={SendSM}

         />

         <div>
            <Image
               width={screenWidth / 1.7}
               height={screenHeight}
               src={MobSM1}

            />
            <Image
               width={screenWidth / 1.7}
               height={screenHeight}
               src={MobSM2}

            />
         </div>

      </div>

   )
}

export default HelpWindow