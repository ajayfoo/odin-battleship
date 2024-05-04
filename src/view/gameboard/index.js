import './style.css';

const createCell = () => {
  const view = document.createElement('div');
  view.classList.add('cell');
  return view;
};
const createGameboardView = (gameboard) => {
  const view = document.createElement('div');
  view.classList.add('gameboard');
  const [row, col] = gameboard.getSize();
  const numOfCells = row * col;
  for (let i = 0; i < numOfCells; ++i) {
    view.appendChild(createCell());
  }
  return view;
};

export default createGameboardView;
