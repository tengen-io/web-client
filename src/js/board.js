//
// # Game logic
//

import React from 'react';
import * as _ from 'ramda';


class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentColor: Board.BLACK,
      size: 19, // make size a variable
      board: this.createBoard(19), // make size a variable
      lastMovePassed: false,
      inAtari: false,
      attemptedSuicide: false
    }

    this.EMPTY = 0;
    this.BLACK = 1;
    this.WHITE = 2;
  }



  // int size -> size x size matrix
  createBoard(size) {
    console.log(this.EMPTY)
    return [..._.range(0, size)].map(() => (
      [..._.range(0, size)].map(() => Board.EMPTY )
    ))
  };

  switchPlayer() {
    this.currentColor = 
      this.currentColor === Board.BLACK ? Board.WHITE : Board.BLACK;
  }


  pass() {
    if (this.lastMovePassed) {
      this.endGame();
    }
    this.lastMovePassed = true;
    this.switchPlayer();
  }

  endGame() {
    console.log('GAME OVER');
  }

  // int tuple i,j -> bool (`true` iff legal)
  play(i,j) {
    console.log(`Played at ${i}, ${j}`);
    this.attemptedSuicide = this.inAtari = false; // check these double assignments

    if (this.board[i][j] !== Board.EMPTY) {
      return false;
    }

    var color = this.board[i][j] = this.currentColor; // check these double assignments
    var captured = [];
    var neighbors = this.getAdjacentIntersections(i, j);
    var atari = false;

    var self = this;
    _.forEach( neighbors, function (n) {
      var state = self.board[n[0]][n[1]];
      if (state !== Board.EMPTY && state !== color) {
        var group = self.getGroup(n[0], n[1]);
        console.log(group);
        if (group.liberties === 0) {
          captured.push(group)
        } else if (group.liberties === 1) {
          atari = true;
        }
      }
    });

    if (_.isEmpty(captured) && this.getGroup(i, j).liberties === 0) {
      this.board[i][j] === Board.EMPTY;
      this.attemptedSuicide = false;
      return false;
    }

    _.forEach( captured, function (group) {
      _.forEach( group.stones, function (stone) {
        self.board[stone[0]][stone[1]] = Board.EMPTY;
      });
    });

    if (atari) { this.inAtari = true; }

    this.lastMovePassed = false;
    this.switchPlayer();
    return true;
  };

  // Given a board position, returns a list of [i,j] coordinates representing
  // orthagonally adjacent intersections
  getAdjacentIntersections(i,j) {
    var neighbors = [];
    if (i > 0) {
      neighbors.push([i - 1, j]);
    }
    if (j < this.size - 1) {
      neighbors.push([i, j + 1]);
    }
    if (i < this.size - 1) {
      neighbors.push([i + 1, j]);
    }
    if (j > 0) {
      neighbors.push([i, j - 1]);
    }
    return neighbors;
  };



  // Performs a breadth-first search about an (i,j) position to find recursively
  // orthagonally adjacent stones of the same color (stones with which it shares
  // liberties). Returns null for if there is no stone at the specified position,
  // otherwise returns an object with two keys: 'liberties', specifying the
  // number of liberties the group has, and 'stones', the list of [i,j]
  // coordinates of the group's members.
  getGroup(i, j) {
    var color = this.board[i][j];
    if (color === Board.EMPTY) {
      return null;
    }

    var visited = {};
    var visitedList = [];
    var queue = [[i, j]];
    var count = 0;

    while (queue.length > 0) {
      var stone = queue.pop();
      if (visited[stone]) {
        continue;
      }

      var neighbors = this.getAdjacentIntersections(stone[0], stone[1]);
      var self = this;
      _.forEach(neighbors, function (n) {
        var state = self.board[n[0]][n[1]];
        if (state === Board.EMPTY) {
          count += 1;
        }
        if (state === color) {
          queue.push(n[0], n[1]);
        }
        visited[stone] = true;
        visitedList.push(stone);
      })

      return {
        liberties: count,
        stones: visitedList
      }
    }
  };
};



export default Board;
