
import React from 'react';

import Cell from '../Cell/index.jsx';

// import style from './style.scss';

// require('style.scss');

const style = {
    height: 580,
    width: 580,
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#e6e4d5',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: '#bbb'
};

class Board extends React.Component {
    render() {
        return (
            // <section>
            <section style={style}>
                <h1>Board</h1>
            </section>
        )
    }
}

export default Board;