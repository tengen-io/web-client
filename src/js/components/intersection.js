import React from 'react';
import { BOARD } from '../utils/constants';

export default class Intersection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: this.props.color,
    };

    this.handleClick = this.handleClick.bind(this);
    this.makeGridlineClassName = this.makeGridlineClassName.bind(
      this,
    );
  }

  handleClick(e) {
    if (this.state.color || this.props.gameIsOver) {
      return;
    } else {
      this.props.handleClick(this.props);
    }
  }

  makeGridlineClassName(props) {
    let className = 'grid-line';

    // corners
    if (props.isTopEdge && props.isLeftEdge) {
      className += ' grid-line--corner-top-left';
    }
    if (props.isTopEdge && props.isRightEdge) {
      className += ' grid-line--corner-top-right';
    }
    if (props.isBottomEdge && props.isLeftEdge) {
      className += ' grid-line--corner-bottom-left';
    }
    if (props.isBottomEdge && props.isRightEdge) {
      className += ' grid-line--corner-bottom-right';
    }

    // edges
    if (props.isTopEdge && !props.isRightEdge && !props.isLeftEdge) {
      className += ' grid-line--edge-top';
    }
    if (
      props.isRightEdge &&
      !props.isBottomEdge &&
      !props.isTopEdge
    ) {
      className += ' grid-line--edge-right';
    }
    if (
      props.isBottomEdge &&
      !props.isRightEdge &&
      !props.isLeftEdge
    ) {
      className += ' grid-line--edge-bottom';
    }
    if (props.isLeftEdge && !props.isBottomEdge && !props.isTopEdge) {
      className += ' grid-line--edge-left';
    }
    return className;
  }

  render() {
    let stone = null;

    if (this.props.color === BOARD.BLACK) {
      stone = <div className="stone stone--black" />;
    } else if (this.props.color === BOARD.WHITE) {
      stone = <div className="stone stone--white" />;
    }

    let clickable = {
      cursor: 'pointer',
    };

    return (
      <div
        className="intersection"
        style={this.props.color === BOARD.EMPTY ? clickable : {}}
        onClick={e => this.props.addStone(this.props.x, this.props.y)}
      >
        {stone}
        <div className={this.makeGridlineClassName(this.props)} />
        {this.props.isStarPoint ? (
          <div className="star-point" />
        ) : null}
      </div>
    );
  }
}
