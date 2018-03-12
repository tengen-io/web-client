import React from 'react';

import Board from '../board';

console.log(Board)

var GRID_SIZE = 40;

class BoardIntersection extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    if (this.props.board.play( this.props.row, this.props.col )) {
      this.props.onPlay();
    }
  }
  render() {
    var style = {
      top: this.props.row * GRID_SIZE,
      left: this.props.col * GRID_SIZE
    }
    var classes = 'intersection ';
    if (this.props.color !== Board.EMPTY) {
      classes += this.props.color === Board.BLACK ? 'black' : 'white';
    }
    return (
      <div 
        onClick={this.handleClick}
        className={classes}
        style={style}
      />
    );
  }
};

class BoardView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var intersections = [];
    for (var i = 0; i < this.props.board.size; i++) {
      for (var j = 0; j < this.props.board.size; j++) {
        intersections.push(
          <BoardIntersection
            board={this.props.board}
            color={this.props.board.board[i][j]}
            row={i}
            col={j}
            onPlay={this.props.onPlay}
          />
        )
      }
    }
    var style = {
      width: this.props.board.size * GRID_SIZE,
      height: this.props.board.size * GRID_SIZE
    }
    return <div style={style} id="board">{intersections}</div>;
  }
};

class AlertView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var text = '';
    if (this.props.board.in_atari) {
      text = 'ATARI';
    } else if (this.props.attempted_suicide) {
      text = 'SUICIDE';
    }

    return (
      <div id="alerts">{text}</div>
    )
  }
};

class PassView extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick(e) {
    this.board.props.pass();
  }
  render() {
    return ( 
      <input 
        id="pass-btn"
        onClick={this.handleClick}
        type="button"
        value="Pass"
      />
    )
  }
};

export default class ContainerView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: this.props.board
    };

    this.onBoardUpdate = this.onBoardUpdate.bind(this);
  }
  onBoardUpdate() {
    this.setState({ board: this.props.board });
  }
  render() {
    return (
      <div>
        <AlertView board={this.state.board} />
        <PassView board={this.state.board} />
        <BoardView
          board={this.state.board}
          onPlay={this.onBoardUpdate}
        />
      </div>
    )
  }
};