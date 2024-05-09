import { createGameResult } from './game-result';
import { createInstruction } from './instruction';
import './style.css';
const createView = (player1View, player2View) => {
  const view = document.createElement('div');
  const gameView = document.createElement('div');
  gameView.classList.add('game-view');
  gameView.append(player1View, player2View);

  const instruction = createInstruction();
  window.addEventListener('allShipsPlaced', () => {
    instruction.remove();
  });

  const gameResult = createGameResult();
  view.append(gameView, instruction, gameResult);
  return view;
};

export default createView;
