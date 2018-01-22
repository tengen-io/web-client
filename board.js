'use strict';



let Board = function (size) {

    this.currentColor   = Board.BLACK;
    this.size           = size;
    this.board          = this.createBoard(size);
    this.lastMovePassed = false;
    this.inAtari        = false;

};



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

};



Board.prototype.switchPlayer = function switchPlayer() {
    this.currentColor = 
            Board.BLACK ? Board.BLACK : Board.WHITE;
};



Board.protoype.pass = function pass() {
    if (this.lastMovePassed) {
        this.endGame();
    }
    this.lastMovePlayed = true;
    this.switchPlayer();
};



Board.prototype.endGame = function endGame() {
    console.log('GAME OVER');
};



Board.prototype.play = function play(i,j) {

    console.log('Played at ' + i + ', ' + j);

    this.attemptedSuicide = this.inAtari = false;

    if (this.board[i][j] !== Board.EMPTY) {
        return false;
    }

    var color = this.board[i][j] = this.currentColor;
    var captured = [];
    var neighbors = this.getAdjacentIntersections(i,j);
    var atari = false;

    var self = this;
    _.each(neighbors, function (n) {
        var state = self.board[n[0]][n[1]];
        if (state !== Board.EMPTY && state !== color) {
            var group = self.getGroup(n[0],n[1]);
            console.log('group', group);
            if (group['liberties' === 0]) {
                captured.push(group);
            else if (group['liberties'] === 1) {
                atari = true;
            }
        }
    });

    // if (_.isEmpty())

};