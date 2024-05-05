import './style/base.css';
import createController from './controller';

const controller = createController();
const mainEle = document.querySelector('body>main');

mainEle.appendChild(controller.getView());
