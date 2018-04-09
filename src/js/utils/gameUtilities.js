
import * as _ from 'ramda';
import { BOARD } from './constants';

export const updatePosition = (position, point, turn) => {
  return position.map( (i) => {
    let isSelectedPoint = (i.x === point.x) && (i.y === point.y);
    if (isSelectedPoint) {
      return _.merge(i, {color: turn});
    } else {
      return i;
    }
  })
}

export const isValidMove = (gameState, point) => {

  var noLiberties = getLiberties(gameState.position, point) === BOARD.EMPTY;
  var pointNotEmpty = point.color !== BOARD.EMPTY;

  if (noLiberties || pointNotEmpty) {
    return false;
  }

  return true;
}

export const getLiberties = (position, point) => {

    var count = _.countBy(
        _.identity, 
        _.pluck('color', 
          getNeighborsFromPoint(position, point)
        ));

    return count[BOARD.EMPTY] || 0;

}

export const getOppositeColor = (gameState) => {
    return (gameState.turn === BOARD.BLACK) ? BOARD.BLACK : BOARD.WHITE;
}

// position, coordinates -> point
export const getPointFromCoords = (position, xCoord, yCoord) => {

    // console.log('getPointFromCoords', xCoord, yCoord)

    return _.head(_.filter(
        (point) => point.x === xCoord 
                && point.y === yCoord
    )(position))

}

// position, coordinates -> point
export const getColorFromPoint = (position, point) => {

    return _.head(_.filter(
        (i) => i.x === point.x 
            && i.y === point.y
    )(position))

}

// position, coordinates -> point
export const getAdjacentLeftFromCoords = (position, xCoord, yCoord) => {
    return getPointFromCoords(position, xCoord - 1, yCoord) || null;
}
// position, coordinates -> point
export const getAdjacentRightFromCoords = (position, xCoord, yCoord) => {
    return getPointFromCoords(position, xCoord + 1, yCoord) || null;
}
// position, coordinates -> point
export const getAdjacentTopFromCoords = (position, xCoord, yCoord) => {
    return getPointFromCoords(position, xCoord , yCoord - 1) || null;
}
// position, coordinates -> point
export const getAdjacentBottomFromCoords = (position, xCoord, yCoord) => {
    return getPointFromCoords(position, xCoord, yCoord + 1) || null;
}

// position, coordinates -> neighbors list
export const getNeighborsFromPoint = (position, point) => {
    return [
        getAdjacentTopFromCoords(position, point.x, point.y),
        getAdjacentRightFromCoords(position, point.x, point.y),
        getAdjacentBottomFromCoords(position, point.x, point.y),
        getAdjacentLeftFromCoords(position, point.x, point.y),
    ]
}

// position, coordinates -> neighbors list
export const getNeighborsFromCoords = (position, xCoord, yCoord) => {
    return [
        getAdjacentTopFromCoords(position, xCoord, yCoord),
        getAdjacentRightFromCoords(position, xCoord, yCoord),
        getAdjacentBottomFromCoords(position, xCoord, yCoord),
        getAdjacentLeftFromCoords(position, xCoord, yCoord),
    ]
}


// position, coordinates -> neighbors obj
export const getColorFromCoords = (position, xCoord, yCoord) => {

    return (getPointFromCoords(position, xCoord, yCoord)).color

}