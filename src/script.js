import './style.css';
import createController from './controllers';

const controller = createController();
const mainEle = document.querySelector('body>main');

mainEle.appendChild(controller.getView());
