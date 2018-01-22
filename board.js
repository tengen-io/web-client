


var Board = function(size) {

	this.current_color = Board.BLACK;
	this.size = size;
	this.board = this.create_board(size);
	this.last_move_passed = false;
	this.in_atari = false;
	
}



Board.EMPTY = 0;
Board.BLACK = 1;
Board.WHITE = 2;



Board.prototype.create_board = function create_board(size) {

    var m = [];
    for (var i = 0; i < size; i++) {
        m[i] = [];
        for (var j = 0; j < size; j++) {
            m[i][j] = Board.EMPTY;
        }
    }

    return m;

}



Board.prototype.switch_player = function switch_player() {
	this.current_color = 
		this.current_color = 
			Board.BLACK ? Board.BLACK : Board.WHITE
}