import './style.css';
const createView = (player1View, player2View) => {
  const view = document.createElement('div');
  view.classList.add('game-view');
  view.append(player1View, player2View);
  return view;
};

export default createView;
