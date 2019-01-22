import React, { Component } from 'react';
import { render } from 'react-dom';
import * as _ from 'ramda';
import { BOARD } from '../utils/constants';

import {
  getPointFromCoords,
  getNeighborsFromCoords,
  getCleanBoardPosition,
} from '../utils/gameUtilities';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Intersection from './intersection';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Placeholder for now
      initialPosition: getCleanBoardPosition()
    }

    const emptyPosition = getCleanBoardPosition();
    const computedBoardPosition = emptyPosition.map( position => {
      // Fill me out
    })

  }

  renderBoard() {
    // Need to loop over position, not stones
    return (
      <div className="board">
        {this.state.initialPosition.map(point => {
          return (
            <Intersection
              key={point.x.toString() + ',' + point.y.toString()}
              x={point.x}
              y={point.y}
              color={point.color}
              turn={this.props.turn}
              gameIsOver={this.props.gameIsOver}
              isTopEdge={point.y === 0}
              isRightEdge={point.x === this.props.size - 1}
              isBottomEdge={point.y === this.props.size - 1}
              isLeftEdge={point.x === 0}
              addStone={this.props.addStone}
              isStarPoint={
                // E.g. if grid(19) -> x and y are in [3,9,15]
                [
                  3,
                  Math.floor(this.props.size / 2),
                  this.props.size - 4,
                ].indexOf(point.x) >= 0 &&
                [
                  3,
                  Math.floor(this.props.size / 2),
                  this.props.size - 4,
                ].indexOf(point.y) >= 0
              }
            />
          );
        })}
      </div>
    );
  }

  render() {
    return this.renderBoard();
    // return (
    //   <Query query={GET_BOARD}>
    //     {({ loading, error, data }) => {
    //       if (loading) return <p>Loading...</p>;
    //       if (error) return <p>Error :(</p>;
    //       console.log(data);
    //       return this.renderBoard();
    //     }}
    //   </Query>
    // );
  }
}

export default Board;

// const GET_BOARD = gql`
//   {
//     game(id: 6) {
//       id
//       status
//       playerTurnId
//       players {
//         id
//         color
//         user {
//           username
//         }
//       }
//       stones {
//         x
//         y
//         color
//       }
//     }
//   }
// `;
