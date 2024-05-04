import './style.css';
const createView = (gameboardController1, gameboardController2) => {
  const view = document.createElement('div');
  view.classList.add('game-view');
  view.append(gameboardController1.view, gameboardController2.view);
  return view;
};

export default createView;
