import React from 'react';
import { BOARD } from '../utils/constants';
import * as _ from 'ramda';

export default class Intersection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: this.props.color,
    };

    this.playStone = this.playStone.bind(this);
    this.makeGridlineClassName = this.makeGridlineClassName.bind(this);
  }

  // Board state and changes in the form of
  // [{x,y,color},...]
  getNeighbors() {
    return _.filter(el => el)([
      (this.props.isTopEdge     ? null : {x: this.props.x, y: this.props.y + 1, color: BOARD.EMPTY }),
      (this.props.isRightEdge   ? null : {x: this.props.x + 1, y: this.props.y, color: BOARD.EMPTY }),
      (this.props.isBottomEdge  ? null : {x: this.props.x, y: this.props.y - 1, color: BOARD.EMPTY }),
      (this.props.isLeftEdge    ? null : {x: this.props.x - 1, y: this.props.y, color: BOARD.EMPTY })
    ])
  }

  playStone(e) {

    // fetch( 'http://localhost:4000/api', {

    //   header: { 'content-type': 'application/json' },
    //   mode: 'cors',
    //   method: 'POST',
    //   body: '{users {email}}'

    // }).then(function(response) {
    //   return response.json();
    // }).then(function(response) {
    //   console.debug(response)
    // })

    if (this.state.color) {
      // stone already played here
      return;
    }
    this.setState({ 
      color: this.props.turn
    });
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
    if (props.isRightEdge && !props.isBottomEdge && !props.isTopEdge) {
      className += ' grid-line--edge-right';
    }
    if (props.isBottomEdge && !props.isRightEdge && !props.isLeftEdge) {
      className += ' grid-line--edge-bottom';
    }
    if (props.isLeftEdge && !props.isBottomEdge && !props.isTopEdge) {
      className += ' grid-line--edge-left';
    }
    return className;
  }

  render() {
    let stone = null;

    if (this.state.color === BOARD.BLACK) {
      stone = <div className="stone stone--black" />;
    } else if (this.state.color === BOARD.WHITE) {
      stone = <div className="stone stone--white" />;
    }

    return (
      <div 
        className="intersection" 
        onClick={this.playStone}>
        {stone}
        <div className={this.makeGridlineClassName(this.props)} />
        {this.props.isStarPoint ? <div className="star-point" /> : null}
      </div>
    );
  }
}
