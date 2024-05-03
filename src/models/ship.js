const createShip = (lengthArg) => {
  const length = lengthArg;
  let health = length;
  const getLength = () => length;
  const getHealth = () => health;
  const hasSunk = () => health === 0;
  const takeHit = () => {
    if (hasSunk()) throw new Error("Can't hit sunken ship");
    --health;
  };
  return { getLength, getHealth, takeHit, hasSunk };
};

export default createShip;
