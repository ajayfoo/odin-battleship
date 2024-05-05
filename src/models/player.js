const createPlayer = (name) => {
  const getName = () => name;
  return { getName };
};

export default createPlayer;
