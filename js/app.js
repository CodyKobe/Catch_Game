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

    this.startGame = function() {
        this.idSetInterval = setInterval( function() {
            console.log( 'hura z setIntervala' )
        }, 250 );
    }
}
var newGame = new Game();
newGame.showFurry();
newGame.showCoin();
newGame.startGame();
