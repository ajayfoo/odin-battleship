import './style.css';

const createCell = (isShip = false) => {
  const view = document.createElement('div');
  view.classList.add('cell');
  if (isShip) {
    view.classList.add('ship');
  }
  return view;
};
const createGameboardView = (gameboard) => {
  const view = document.createElement('div');
  view.classList.add('gameboard');
  const [row, col] = gameboard.getSize();
  for (let i = 0; i < row; ++i) {
    for (let j = 0; j < col; ++j) {
      if (gameboard.grid[i][j] === null) view.appendChild(createCell());
      else view.appendChild(createCell(true));
    }
  }
  return view;
};

export default createGameboardView;
