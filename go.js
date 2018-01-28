
const GRID_SIZE = 40;



var BoardIntersection = React.createClass({

	handleClick: function () {
		if (this.props.board.play(this.props.row, this.props.col)) {
			this.props.onPlay();
		}
	}

	render: function () {
		var style = {
			top: this.props.row * GRID_SIZE,
			left: this.props.col * GRID_SIZE
		};

		var classes = 'intersection ';
		if (this.props.color !== Board.EMPTY) {
			classes += (this.props.color === Board.Black) ? 'black' : 'white';
		}

		return (
			<div onClick={this.handleClick}
				className={classses} style={style}></div>
		);
	}

});



var BoardView = React.createClass({

	render: function () {
		var intersections = [];
		for (var i = 0; i < this.props.board.size, i++) {
			for (var j = 0; j < this.props.board.size, j++) {
				intersections.push( BoardIntersection({
					board: this.props.board,
					color: this.props.board.board[i][j],
					row: i,
					column: j,
					onPlay: this.props.onPlay
				}));
			}
		}
		var style = {
			width: this.props.boardSize * GRID_SIZE,
			height: this.props.boardSize * GRID_SIZE
		};
		return <div style={style} id="board"></div>;
	}

});



var AlertView = React.createClass({

	render: function () {
		var text = '';
		if (this.props.board.inAtari) {
			text = 'ATARI!';
		} else if (this.props.board.attemptedSuicide) {
			text = 'SUICIDE!';	
		}

		return (
			<div id="alerts">{text}</div>;
		);
	}

});



var PassView = React.createClass({

	handleClick: function (e) {
		this.props.board.pass();
	}

	render: function () {
		
		return (
			<input 
				id="pass-btn" 
				type="button" 
				value="Pass"
				onClick={this.handleClick} />
		);
	}

});



var ContainerView = React.createClass({

	getInitialState: function () {
		return {'board': this.props.board};
	}

	onBoardUpdate: function () {
		this.setState({'board': this.props.board});
	}

	render: function () {
		return (
			<div>
				<AlertView board={this.state.board}/>
				<PassView board={this.state.board}/>
				<BoardView board={this.state.board}
					onPlay={this.onBoardUpdate.bind(this)}/>
			</div>
		);
	}

});

var board = new Board(19);

React.renderComponent(
	<ContainerView board={board}/>,
	document.getElementById('main')
);