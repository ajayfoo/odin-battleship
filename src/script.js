import './style.css';
import createController from './controllers';

let controller = createController();
const mainEle = document.querySelector('body>main');

mainEle.appendChild(controller.getView());

window.addEventListener('newGame', () => {
  const tempController = createController();
  mainEle.replaceChild(tempController.getView(), controller.getView());
  controller = tempController;
});
