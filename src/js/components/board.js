import React, { Component } from 'react';
import { render } from 'react-dom';

import Point from './point';

require('../../stylesheets/board.scss');

export default function Board(size) {
  const renderPoint = ([x, y, color]) => {
    return <Point key={ `${x},${y}` } x={ x } y={ y } color={ color } />
  }
  let res = [];

  for (var x = 0; x < size; x++) {
    for (var y = 0; y < size; y++) {
      // For now, random color value
      res.push([x, y, Math.floor(Math.random() * Math.floor(3))])
    }
  }

  return (
    <div className='board'>
      { res.map(renderPoint) }
    </div>
  )
}

