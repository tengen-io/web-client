import React from 'react';
import Intersection from './intersection';

class Stone {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}

class Board extends React.PureComponent {
  constructor(props) {
    super(props);
    const { game } = props;

    this.size = game.boardSize;

    this.state = {
      showBoardCoordinates: true,
    };

    this.buildBoard = this.buildBoard.bind(this);
    this.toggleShowBoardCoordinates = this.toggleShowBoardCoordinates.bind(
      this,
    );
  }

  buildBoard() {
    const { game } = this.props;
    const stonesObj = {};
    game.stones.forEach(s => (stonesObj[[s.x, s.y]] = s));

    const res = [];

    for (let y = 0; y < this.size; y += 1) {
      for (let x = 0; x < this.size; x += 1) {
        const stone = stonesObj[[x, y]];
        if (stone) {
          res.push(stone);
        } else {
          res.push(new Stone(x, y, null));
        }
      }
    }

    return res;
  }

  toggleShowBoardCoordinates() {
    this.setState({
      showBoardCoordinates: !this.state.showBoardCoordinates,
    });
  }

  renderBoard() {
    const stones = this.buildBoard();
    const { playerTurnId, addStone, status } = this.props;

    return (
      <section className="">
        <div className="board">
          {stones.map(point => {
            return (
              <Intersection
                key={`${point.x.toString()},${point.y.toString()}`}
                x={point.x}
                y={point.y}
                color={point.color}
                turn={playerTurnId}
                gameIsOver={status === 'complete'}
                isTopEdge={point.y === 0}
                isRightEdge={point.x === this.size - 1}
                isBottomEdge={point.y === this.size - 1}
                isLeftEdge={point.x === 0}
                addStone={addStone}
                showBoardCoordinates={this.state.showBoardCoordinates}
                isStarPoint={
                  // E.g. if grid(19) -> x and y are in [3,9,15]
                  [
                    3,
                    Math.floor(this.size / 2),
                    this.size - 4,
                  ].indexOf(point.x) >= 0 &&
                  [
                    3,
                    Math.floor(this.size / 2),
                    this.size - 4,
                  ].indexOf(point.y) >= 0
                }
              />
            );
          })}
        </div>
        <br />
        <label className="checkbox">
          <input
            type="checkbox"
            checked={this.state.showBoardCoordinates}
            onChange={this.toggleShowBoardCoordinates}
          />
          &nbsp; Show board coordinates
        </label>
      </section>
    );
  }

  render() {
    return this.renderBoard();
  }
}

export default Board;
