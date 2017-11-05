var Furry = require("./furry.js");
var Coin = require("./coin.js");

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
        if( self.gameNotOver() ) {
            self.checkCoinCollision();
            self.showFurry();
        }
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

    this.refreshPageScore = function() {
        var scoreDiv = document.querySelector( "#score strong" );
        scoreDiv.innerText = self.score;
    }

    this.checkCoinCollision = function() {
        if( self.coin.x == self.furry.x && self.coin.y == self.furry.y ) {
            console.log( 'score:', self.score+1 );
            self.hideVisibleCoin();
            self.score++;
            self.refreshPageScore();
            self.coin = new Coin();
            self.showCoin();
        }
    }

    this.hideVisibleCoin = function() {
        var eraseCoin = document.querySelector( ".coin" );
        eraseCoin.classList.remove( "coin" );
    }
    this.gameNotOver = function() {
        if( self.furry.x < 0 || self.furry.x > 9 ||
            self.furry.y < 0 || self.furry.y > 9 ) {
            clearInterval( self.idSetInterval );
            self.hideVisibleFurry();
            console.log( 'Game Over' );
            document.getElementById('over').classList.remove('invisible');
            // brake game
            return false;
        }
        // continue game
        return true;
    }
}

module.exports = Game;
