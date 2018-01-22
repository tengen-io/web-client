


const Board = function(size) {

    this.currentColor = Board.BLACK;
    this.size = size;
    this.board = this.createBoard(size);
    this.lastMovePassed = false;
    this.inAtari = false;
    
}



Board.EMPTY = 0;
Board.BLACK = 1;
Board.WHITE = 2;



Board.prototype.createBoard = function createBoard(size) {

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