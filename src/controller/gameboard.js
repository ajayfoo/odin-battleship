import createGameboardView from '../view/gameboard';
import createGameboard from '../models/gameboard';

const createGameboardController = () => {
  const model = createGameboard();
  const view = createGameboardView(model);
  return { view };
};

export default createGameboardController;
