import React from 'react';

export default class Point extends React.Component {



  constructor(props) {

    super(props);

    this.state = {
      color: this.getColor(),
      styleString: this.getStyleString(),
    };

    this.setColor = this.setColor.bind(this);
    this.styleString = this.getStyleString.bind(this);

  }



  getColor(color = this.props.color) {

    if (color === 1) {
      return 'white';
    } else if (color === 2) {
      return 'black';
    }

    return 'empty'

  }



  getPosition( x = this.props.x, y = this.props.y ) {

    return {

    }

  }



  getStyleString(color, x, y) {
    return `point point__color--${color} point__pos--x${x} point__pos--y${y}`

  }



  /* Right now this only adds a white Stone, will eventually
   * need to know about the current User.
  */
  setColor(e) {
    let color = this.props.color > 1 ? 0 : this.props.color;
    this.setState({ color:  this.getColor(color) })
  }



  render() {

    const styleString = this.getStyleString(this.state.color, 
                                            this.props.x, 
                                            this.props.y )

    return (
      <div className={ styleString } onClick={ this.setColor }>
        <div>&nbsp;</div>
      </div>
    )
  }
}
