import React, { Component } from 'react';
import { render } from 'react-dom';
// import * as _ from 'ramda';
import { BOARD } from '../utils/constants';

export default class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: ('0' + (new Date().getMinutes())).slice(-2),
      seconds: ('0' + (new Date().getSeconds())).slice(-2)
    }
  }

  componentDidMount() {
    this.timerID = setInterval( () => this.tick(), 1000 );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      minutes: ('0' + (new Date().getMinutes())).slice(-2),
      seconds: ('0' + (new Date().getSeconds())).slice(-2)
    });
  }

  render() {
    return (
      <div className="display card">
        <div className="card-content has-text-centered">
          <p className="display__time title is-3">
            {
              `${this.state.minutes}:${this.state.seconds}`
            }
          </p>
          <p className="subtitle is-5">
            Black to play
          </p>
        </div>
        <footer className="card-footer">
          <a href="#" className="card-footer-item">Pass</a>
          <a href="#" className="card-footer-item">Resign</a>
        </footer>
      </div>
    )
  }
}