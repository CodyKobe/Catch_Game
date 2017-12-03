/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(1);
var newGame = new Game();
newGame.showFurry();
newGame.showCoin();
newGame.startGame();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(2);
var Coin = __webpack_require__(3);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

module.exports = Furry;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function Coin() {
    this.x = Math.floor( Math.random() * 10 );
    this.y = Math.floor( Math.random() * 10 );
}

module.exports = Coin;


/***/ })
/******/ ]);