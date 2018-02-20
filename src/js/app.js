import React, { Component } from 'react';
import { render } from 'react-dom';

require('../stylesheets/app.scss');

const Board = (size) => {
  let res = [];

  for (var x = 0; x < size; x++) {
    for (var y = 0; y < size; y++) {
      // For now, random color value
      res.push([x, y, Math.floor(Math.random() * Math.floor(3))])
    }
  }

  return (
    <div className='board'>
      { res.map(Intersection) }
    </div>
  )
}

const Intersection = ([x, y, color]) => {
  let colorClass;
  if (color === 0) {
    colorClass = 'White';
  } else if (color === 1) {
    colorClass = 'Black';
  } else {
    colorClass = 'Brown';
  }

  return (
    <div key={ `${x},${y}` } className={ `intersection${colorClass}` }>{ x }, { y }</div>
  )
}

// Example for 9x9 grid
render(Board(9), document.getElementById('app'));
