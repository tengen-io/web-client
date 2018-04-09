
import * as _ from 'ramda';
import { BOARD } from './constants';

export const isValidMove = (gameState, point) => {

    var neighbors = getNeighborsFromCoords(gameState.position, point.x, point.y)
    console.log('neighbors',neighbors)
    // console.log(_.filter( neighbor => neighbor.color === BOARD.EMPTY, neighbors))
    // console.log(point.neighbors)
    // var isSurrounded = _.reduce( (neighbor) => {
    //     return neighbor.color ===
    // }, false, neighbors )    

    return true;
}

export const getLiberties = (position, point) => {

    // console.log(point.neighbors)
    // console.log('liberties', _.pluck('color', point.neighbors))
    // console.log(
    //     _.reduce( neighbor => console.log(neighbor), 0, _.pluck('color', point.neighbors))
    // )

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
export const getAdjacentLeftFromCoords = (position, xCoord, yCoord) => {
    return getPointFromCoords(position, xCoord - 1, yCoord) || null;
}
// position, coordinates -> point
export const getAdjacentRightFromCoords = (position, xCoord, yCoord) => {
    return getPointFromCoords(position, xCoord + 1, yCoord) || null;
}
// position, coordinates -> point
export const getAdjacentTopFromCoords = (position, xCoord, yCoord) => {
    return getPointFromCoords(position, xCoord - 1, yCoord) || null;
}
// position, coordinates -> point
export const getAdjacentBottomFromCoords = (position, xCoord, yCoord) => {
    return getPointFromCoords(position, xCoord + 1, yCoord) || null;
}

// position, coordinates -> neighbors list
export const getNeighborsFromCoords = (position, xCoord, yCoord) => {

    // console.log('getNeighborsFromCoords', xCoord, yCoord)

    // return {
    //     top: getAdjacentTopFromCoords(position, xCoord, yCoord),
    //     right: getAdjacentRightFromCoords(position, xCoord, yCoord),
    //     bottom: getAdjacentBottomFromCoords(position, xCoord, yCoord),
    //     left: getAdjacentLeftFromCoords(position, xCoord, yCoord),
    // }
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