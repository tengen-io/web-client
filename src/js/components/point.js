import React from 'react';

export default class Point extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.getColor(),
    }
    this.setColor = this.setColor.bind(this);
  }

  getColor(color = this.props.color) {
    if (color === 0) {
      return 'white';
    } else if (color === 1) {
      return 'black';
    }
  }

  /* Right now this only adds a white Stone, will eventually
   * need to know about the current User.
  */
  setColor(e) {
    let color = this.props.color > 1 ? 0 : this.props.color;
    this.setState({ color:  this.getColor(color) })
  }

  render() {
    const { x, y } = this.props;
    return (
      <div className={ this.state.color } onClick={ this.setColor }>
        <div>{ x }, { y }</div>
      </div>
    )
  }
}
