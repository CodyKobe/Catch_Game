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
    var self = this;

    this.board = document.querySelectorAll( "section#board div" );
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function( x, y ) {
        return y * 10 + x;
    }
    this.board[ this.index( this.furry.x, this.furry.y ) ].classList.add( 'furry' );

    this.showFurry = function() {
        self.hideVisibleFurry();
        this.board[ this.index( this.furry.x, this.furry.y ) ].classList.add( 'furry' );
    }
    this.hideVisibleFurry = function() {
        var eraseFurrry = document.querySelector( ".furry" );
        eraseFurrry.classList.remove( "furry" );
    }
    this.showCoin = function() {
        this.board[ this.index( this.coin.x, this.coin.y ) ].classList.add( 'coin' )
    }
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
        self.checkCoinCollision();
    }
    this.startGame = function() {
        this.idSetInterval = setInterval( self.moveFurry, 250 );
    }

    this.turnFurry = function( event ) {
        switch( event.which ) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'top';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'bottom';
                break;
        }
    }
    document.addEventListener( 'keydown', function( event ) {
        self.turnFurry( event );
    } );

    this.checkCoinCollision = function() {
        if( self.coin.x == self.furry.x && self.coin.y == self.furry.y ) {
            console.log( 'fff' );
            self.hideVisibleCoin();
            self.score++;
            self.refreshPageScore();
            self.coin = new Coin();
            self.showCoin();
        }
    }

    this.hideVisibleCoin = function(){
        var eraseCoin = document.querySelector( ".coin" );
        eraseCoin.classList.remove( "coin" );
    }
}

var newGame = new Game();
newGame.showFurry();
newGame.showCoin();
newGame.startGame();
