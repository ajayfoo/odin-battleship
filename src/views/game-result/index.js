import './style.css';

const createGameResult = () => {
  const view = document.createElement('div');
  view.classList.add('game-result');

  const resultEle = document.createElement('p');
  resultEle.textContent = 'Game result yet to be determined';

  window.addEventListener('userWon', () => {
    resultEle.textContent = 'User Has Won!';
  });

  window.addEventListener('machineWon', () => {
    resultEle.textContent = 'Machine Has Won!';
  });

  const newGameBtn = document.createElement('button');
  newGameBtn.setAttribute('type', 'button');
  newGameBtn.textContent = 'New Game';
  newGameBtn.addEventListener('click', () => {
    const newGameEvent = new CustomEvent('newGame');
    window.dispatchEvent(newGameEvent);
  });

  view.append(resultEle, newGameBtn);
  return view;
};

export { createGameResult };
