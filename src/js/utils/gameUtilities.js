import * as _ from 'ramda';
import { BOARD } from './constants';

export const updatePosition = (position, point, turn) => {
  return position.map(i => {
    let isSelectedPoint = i.x === point.x && i.y === point.y;
    return isSelectedPoint ? _.merge(i, { color: turn }) : i;
  });
};

export const getCleanBoardPosition = () => {
  const boardSize = BOARD.SIZE; // Make this dynamic
  return [...Array(boardSize * boardSize).keys()].map(position => {
    let row = position % boardSize;
    let column = Math.floor(position / boardSize);
    return {
      x: row,
      y: column,
      color: BOARD.EMPTY,
    };
  });
};

export const isValidMove = (gameState, point) => {
  const { turn, position } = gameState;
  const pointIsEmpty = point.color === BOARD.EMPTY;
  const notSurrounded =
    getNeighborColors(position, point).includes(turn) ||
    getNeighborColors(position, point).includes(BOARD.EMPTY);

  return pointIsEmpty && notSurrounded;
};

export const getNeighborColors = (position, point) => {
  return _.pluck('color')(getNeighborsFromPoint(position, point));
};

export const hasLiberties = (position, point) => {
  return getNeighborColors(position, point).includes(BOARD.EMPTY);
};

export const getOppositeColor = gameState => {
  return gameState.turn === BOARD.BLACK ? BOARD.BLACK : BOARD.WHITE;
};

// position, coordinates -> point
export const getPointFromCoords = (position, xCoord, yCoord) => {
  return _.head(
    _.filter(point => point.x === xCoord && point.y === yCoord)(position)
  );
};

// position, coordinates -> point
export const getColorFromPoint = (position, point) => {
  return _.head(_.filter(i => i.x === point.x && i.y === point.y)(position));
};

// position, coordinates -> point
export const getAdjacentLeftFromCoords = (position, xCoord, yCoord) => {
  return getPointFromCoords(position, xCoord - 1, yCoord) || null;
};
// position, coordinates -> point
export const getAdjacentRightFromCoords = (position, xCoord, yCoord) => {
  return getPointFromCoords(position, xCoord + 1, yCoord) || null;
};
// position, coordinates -> point
export const getAdjacentTopFromCoords = (position, xCoord, yCoord) => {
  return getPointFromCoords(position, xCoord, yCoord - 1) || null;
};
// position, coordinates -> point
export const getAdjacentBottomFromCoords = (position, xCoord, yCoord) => {
  return getPointFromCoords(position, xCoord, yCoord + 1) || null;
};

// position, coordinates -> neighbors list
export const getNeighborsFromPoint = (position, point) => {
  return [
    getAdjacentTopFromCoords(position, point.x, point.y),
    getAdjacentRightFromCoords(position, point.x, point.y),
    getAdjacentBottomFromCoords(position, point.x, point.y),
    getAdjacentLeftFromCoords(position, point.x, point.y),
  ];
};

// position, coordinates -> neighbors list
export const getNeighborsFromCoords = (position, xCoord, yCoord) => {
  return [
    getAdjacentTopFromCoords(position, xCoord, yCoord),
    getAdjacentRightFromCoords(position, xCoord, yCoord),
    getAdjacentBottomFromCoords(position, xCoord, yCoord),
    getAdjacentLeftFromCoords(position, xCoord, yCoord),
  ];
};

// position, coordinates -> neighbors obj
export const getColorFromCoords = (position, xCoord, yCoord) => {
  return getPointFromCoords(position, xCoord, yCoord).color;
};
