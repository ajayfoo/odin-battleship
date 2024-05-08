import './style.css';

const createGameResult = () => {
  const view = document.createElement('div');
  view.classList.add('game-result');
  const resultEle = document.createElement('p');
  resultEle.textContent = 'Game Result yet to be determined';
  window.addEventListener('userWon', () => {
    resultEle.textContent = 'User Has Won!';
  });

  view.append(resultEle);
  return view;
};

export { createGameResult };
