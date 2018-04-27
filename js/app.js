const yCoordinates = [53, 136, 219];
const myArray = [1, 5, 10, 500];

// Enemies our player must avoid
var Enemy = function() {

  this.sprite = "images/enemy-bug.png";
  this.x = 0;
  this.y = yCoordinates[Math.floor(Math.random() * yCoordinates.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  // let randomNum = myArray[Math.floor(Math.random()*myArray.length)];
  if (this.x < 404) {
    this.x = this.x + myArray[Math.floor(Math.random() * myArray.length)] * dt;
  } else {
    this.x = 0;
    this.y = yCoordinates[Math.floor(Math.random() * yCoordinates.length)];
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

var Player = function() {
  this.sprite = "images/char-pink-girl.png";
  this.x = 202;
  this.y = 385;
};
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function(dt) {
  checkForCollisions();
};

Player.prototype.render = function() {


  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keyPressed) {

  switch (keyPressed) {
    case "up":
      if (this.y > -30) {
        this.y = this.y - 83;
      }
      break;
    case "down":
      if (this.y < 385) {
        this.y = this.y + 83;
      }
      break;
    case "left":
      if (this.x > 0) {
        this.x = this.x - 101;
      }
      break;

    case "right":
      if (this.x < 404) {
        this.x = this.x + 101;
      }
  }
};

// Now instantiate your objects.
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();

// Place all enemy objects in an array called allEnemies

const allEnemies = [enemy1, enemy2, enemy3, enemy4];

// Place the player object in a variable called player

const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function checkForCollisions() {
  allEnemies.forEach(function(enemy) {
    if (
      enemy.x > player.x - 85 &&
      enemy.x < player.x + 85 &&
      enemy.y === player.y
    ) {
      player.x = 202;
      player.y = 385;
      console.log("checkForCollisions  called.");
    }
  });
}
