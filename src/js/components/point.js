import React from 'react';

export default class Point extends React.Component {
  constructor(props) {
    super(props);
    let colorClass;
    if (props.color === 0) {
      colorClass = 'white';
    } else if (props.color === 1) {
      colorClass = 'black';
    } else {
      ;
    }
    this.state = {
      color: colorClass
    }
  }

  render() {
    const { x, y } = this.props;
    return (
      <div className={ this.state.color }>
        <div>{ x }, { y }</div>
      </div>
    )
  }
}
