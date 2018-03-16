import React from 'react';

export default class Point extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: null,
      turn: this.props.state.turn,
    };

    this.playStone = this.playStone.bind(this);
    this.makeGridlineClass = this.makeGridlineClass.bind(this);
  }

  playStone(e) {
    if (this.state.color) {
      // stone already played here
      return;
    }
    this.setState({ color: this.props.state.turn });
  }

  makeGridlineClass(props) {
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

    if (this.state.color === 'black') {
      stone = <div className="stone stone--black" />;
    } else if (this.state.color === 'white') {
      stone = <div className="stone stone--white" />;
    }

    return (
      <div className="point" onClick={this.playStone}>
        {stone}
        <div className={this.makeGridlineClass(this.props)} />
        {this.props.isStarPoint ? <div className="star-point" /> : null}
      </div>
    );
  }
}
