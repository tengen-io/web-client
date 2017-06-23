
import React from 'react';

import Board from './Board/index.jsx';

const style = {
    margin: '-10',
    height: '100vh',
    padding: '5em',
    backgroundColor: '#f0f0f0',
    boxSizing: 'border-box'
};

class App extends React.Component {
    render() {
        return (
            <div style={style}>
                <Board/>
            </div>
        )
    }
}

export default App;