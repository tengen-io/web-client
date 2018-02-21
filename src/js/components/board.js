import React, { Component } from 'react';
import { render } from 'react-dom';
import * as _ from 'ramda';

import Point from './point';

require('../../stylesheets/board.scss');



export default function Board(size) {



  const zeroOneOrTwo = () => {
    return Math.floor( Math.random() * Math.floor(3) );
  }



  const grid = (size) => {

    return _.map( x => _.map( y => {

      let color = zeroOneOrTwo();

      let position = zeroOneOrTwo();

      return <Point key={`${x},${y}`} 
                    x={ x } 
                    y={ y } 
                    color={ color } /> 
          
    })
    ( _.range(1, size + 1) ))
    ( _.range(1, size + 1) );

  }



  return (
    <div className='board'>
      { grid(size) }
    </div>
  )
}

