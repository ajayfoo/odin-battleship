const createPlayer = (name, isMachine = false) => {
  const getName = () => name;
  return { getName, isMachine };
};

export default createPlayer;
