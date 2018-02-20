
import React from 'react';
import _ from 'ramda';

const makeArray = size => Array.from( new Array(size), (val, index) => index + 1 );

export default function Board(props) {

    console.log(props.size)

    // const sizedArray = makeArray(props.size);

    return <div>
        {
            makeArray(19).map( 
                x => (makeArray(19).map( 
                    y => <span key={`${x}${y}`}> {x} {y} </span> 
                ))
            )
        }</div>

}