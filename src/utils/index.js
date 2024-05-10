const AttackResult = {
  FAILED: 0,
  SUCCESSFUL: 1,
  REDUNDANT: 2,
};

const ShipSize = {
  CARRIER: 5,
  BATTLESHIP: 4,
  DESTROYER: 3,
  PATROL_BOAT: 2,
};

const htmlIdToJsIndentifier = (id) => {
  return id.toUpperCase().replace('-', '_');
};

export { AttackResult, ShipSize, htmlIdToJsIndentifier };
