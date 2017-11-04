console.log( 'hello' );

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
}
