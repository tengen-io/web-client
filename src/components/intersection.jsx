import React from 'react';
import { BOARD } from '../utils/constants';

export default class Intersection extends React.PureComponent {
  handleClick = () => {
    const { color, gameIsOver, handleClick } = this.props;
    if (color || gameIsOver) {
      return;
    } else {
      handleClick(this.props);
    }
  };

  makeGridlineClassName = () => {
    const { isTopEdge, isLeftEdge, isRightEdge, isBottomEdge } = this.props;
    let className = 'grid-line';

    // corners
    if (isTopEdge && isLeftEdge) {
      className += ' grid-line--corner-top-left';
    }
    if (isTopEdge && isRightEdge) {
      className += ' grid-line--corner-top-right';
    }
    if (isBottomEdge && isLeftEdge) {
      className += ' grid-line--corner-bottom-left';
    }
    if (isBottomEdge && isRightEdge) {
      className += ' grid-line--corner-bottom-right';
    }

    // edges
    if (isTopEdge && !isRightEdge && !isLeftEdge) {
      className += ' grid-line--edge-top';
    }
    if (
      isRightEdge &&
      !isBottomEdge &&
      !isTopEdge
    ) {
      className += ' grid-line--edge-right';
    }
    if (
      isBottomEdge &&
      !isRightEdge &&
      !isLeftEdge
    ) {
      className += ' grid-line--edge-bottom';
    }
    if (isLeftEdge && !isBottomEdge && !isTopEdge) {
      className += ' grid-line--edge-left';
    }
    return className;
  };

  render() {
    const { addStone, color, isStarPoint } = this.props;
    let stone = null;

    if (color === BOARD.BLACK) {
      stone = <div className="stone stone--black" />;
    } else if (color === BOARD.WHITE) {
      stone = <div className="stone stone--white" />;
    }

    const clickable = {
      cursor: 'pointer',
    };

    return (
      <div
        className="intersection"
        style={color === BOARD.EMPTY ? clickable : {}}
        onClick={e => addStone(this.props.x, this.props.y)}
      >
        {stone}
        <div className={this.makeGridlineClassName(this.props)} />
        {isStarPoint ? (
          <div className="star-point" />
        ) : null}
      </div>
    );
  }
}
