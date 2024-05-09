import './style.css';

const createInstruction = () => {
  const view = document.createElement('div');
  view.classList.add('instruction');
  const instructionEle = document.createElement('p');

  window.addEventListener('gameStarted', (event) => {
    instructionEle.textContent =
      'Player1 please place your ' +
      event.detail.player1.numOfShips +
      ' ship(s)';
  });
  view.append(instructionEle);
  return view;
};

export { createInstruction };
