class character {
  // Speed is an integer number.
  // animation is an array with all the sprites for an specific movement.
  constructor(speed, x, y, animation) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.len = animation.length;
    this.animation = animation;
    this.index = 0;
  }

  draw(ctx) {
    ctx.putImageData(this.animation[this.index % this.len], this.x, this.y);
    console.log('index = ' + this.index + ' len = ' + this.len + ' modulo = ' + (this.index % this.len));
    this.animate();
  }

  animate() {
    this.index += this.speed;
  }
}
