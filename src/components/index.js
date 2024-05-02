const Heading = (name) => {
  const component = document.createElement('h1');
  component.textContent = name;
  return component;
};

export default Heading;
