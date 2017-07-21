
// Libraries
import React, { Component } from "react";
// Components
import Square from "./square";
// Style
import style from '../../stylesheets/board.scss';

const numberOfSquares = 361;

const squares = Array.from(
    new Array(numberOfSquares),
    (val, index) => index
); // [1...numberOfSquares]

const squareGrid = squares.map( (number) =>
  <Square number={number} key={number.toString()} />
);

export default class Board extends Component {

    render() {

    return (
        <section className="board">
            <div className="board-container">
                { squareGrid }
            </div>
        </section>
    );

  }
}