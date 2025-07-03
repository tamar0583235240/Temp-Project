import dotenv from 'dotenv';
import { appA, appB } from './app';


dotenv.config();

const PORTA = process.env.PORTA || 5001;
appA.listen(PORTA, () => {
  console.log(`Server is running on port ${PORTA}`);
});


const PORTB = process.env.PORTB || 5001;
appB.listen(PORTB, () => {
  console.log(`Server is running on port ${PORTB}`);
});



