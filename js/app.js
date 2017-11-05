function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function Coin() {
    this.x = Math.floor( Math.random() * 10 );
    this.y = Math.floor( Math.random() * 10 );
}

function Game() {
    this.board = document.querySelectorAll( "section#board div" );
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function( x, y ) {
        return y * 10 + x;
    }
    this.showFurry = function() {
        this.board[ this.index( this.furry.x, this.furry.y ) ].classList.add( 'furry' );
    }
    this.showCoin = function() {
        this.board[ this.index( this.coin.x, this.coin.y ) ].classList.add( 'coin' )
    }
    var self = this;
    this.moveFurry = function() {
        if( self.furry.direction === "right" ) {
            self.furry.x = self.furry.x + 1;
        } else if( self.furry.direction === "left" ) {
            self.furry.x = self.furry.x - 1;
        } else if( self.furry.direction === "bottom" ) {
            self.furry.y = self.furry.y + 1;
        } else if( self.furry.direction === "top" ) {
            self.furry.y = self.furry.y - 1;
        }
        self.showFurry();
    }
    this.startGame = function() {
        this.idSetInterval = setInterval( self.moveFurry, 250 );
    }
}
var newGame = new Game();
newGame.showFurry();
newGame.showCoin();
newGame.startGame();
