import createGameboard from './gameboard';

const createPlayer = () => {
  const g = createGameboard();
  return { g };
};

export default createPlayer;
