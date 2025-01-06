function setup() {
  createCanvas(document.body.offsetWidth, document.body.offsetWidth);

  {
    textFont(loadFont("OCRAEXT.TTF", 1));
    var scene = 0;
    var rock = loadImage("Rock.png");
    var rocks = [];
    var Rock = function (x, y, size, distance) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.distance = distance;
      this.end = false;
    };
    var time;
    var points = 0;
    var lFrame = false;
    var Button = function (things) {
      this.xPosition = things.xPosition;
      this.yPosition = things.yPosition;
      this.tWidth = things.tWidth;
      this.tLength = things.tLength;
      this.text = things.text;
      this.doF = things.doF;
    };
    var bColor = color(10, 0, 50);
  } // variables

  {
    Button.prototype.draw = function () {
      var a;
      var b;
      if (
        mouseX > this.xPosition &&
        mouseX < this.xPosition + this.tWidth &&
        mouseY > this.yPosition &&
        mouseY < this.yPosition + this.tLength
      ) {
        a = color(150, 150, 150);
        b = color(255, 255, 255);

        /*
            time = millis();
            points = 0;
            rocks = [];
            textAlign(LEFT, TOP);
            textSize(21);
            scene = 1;
            */
      } else {
        a = color(255, 255, 255);
        b = color(100, 100, 100);
      }
      fill(a);
      rect(this.xPosition, this.yPosition, this.tWidth, this.tLength);
      fill(b);
      textAlign(CENTER, CENTER);
      textSize(21);
      text(
        this.text,
        this.xPosition + this.tWidth / 2,
        this.yPosition + this.tLength / 2
      );
    };

    Button.prototype.handle = function () {
      if (
        mouseX > this.xPosition &&
        mouseX < this.xPosition + this.tWidth &&
        mouseY > this.yPosition &&
        mouseY < this.yPosition + this.tLength
      ) {
        this.doF();
      }
    };

    var retry = new Button({
      xPosition: 150 / 400 * document.body.offsetWidth,
      yPosition: 300 / 400 * document.body.offsetWidth,
      tWidth: 100  / 400 * document.body.offsetWidth,
      tLength: 33 / 400 * document.body.offsetWidth,
      text: "Retry",
      doF: function () {
        time = millis();
        points = 0;
        rocks = [];
        textAlign(LEFT, TOP);
        textSize(21  / 400 * document.body.offsetWidth);
        scene = 1;
      },
    });

    var start = new Button({
      xPosition: 150 / 400 * document.body.offsetWidth,
      yPosition: 300 / 400 * document.body.offsetWidth,
      tWidth: 100 / 400 * document.body.offsetWidth,
      tLength: 33 / 400 * document.body.offsetWidth,
      text: "Start",
      doF: function () {
        scene = 1;
        rocks = [];
        time = millis();
      },
    });
  } // buttons

  {
    noStroke();
    var stars = [];

    var Star = function (x, y) {
      this.x = x;
      this.y = y;
    };

    Star.prototype.draw = function () {
      if (floor(random(0, 60)) !== 0) {
        ellipse(this.x, this.y, 1, 1);
      }
    };

    for (var i = 0; i < 200; i++) {
      stars.push(new Star(random(0, document.body.offsetWidth), random(0, document.body.offsetWidth)));
    }

    var drawStars = function () {
      for (var i = 0; i < stars.length; i++) {
        stars[i].draw();
      }
    };
  } // stars

  textSize(21);
  Rock.prototype.draw = function () {
    if (this.distance < 100 / 400 * document.body.offsetWidth && !this.end) {
      image(
        rock,
        this.x,
        this.y,
        this.size + this.distance,
        (this.size + this.distance) * 1.5
      );
      this.distance += 1  / 400 * document.body.offsetWidth;
      /*   
        if (mouseX > this.x - (this.size+this.distance) / 2 && mouseX < this.x + (this.size+this.distance) / 2 && mouseY > this.y - (this.size+this.distance) / 2 && mouseY < this.y + (this.size+this.distance) / 2 && mouseIsPressed) {
            points += 110-this.distance;
            this.end = true;
        }
        */
    }
  };

  Rock.prototype.handle = function () {
    if (
      mouseX > this.x - (this.size + this.distance) / 2 &&
      mouseX < this.x + (this.size + this.distance) / 2 &&
      mouseY > this.y - (this.size + this.distance) / 2 &&
      mouseY < this.y + (this.size + this.distance) / 2 &&
      !this.end
    ) {
      points += 110 - this.distance / document.body.offsetWidth * 400;
      this.end = true;
    }
  };

  // draw
  imageMode(CENTER);

  draw = function () {
    var now = millis();
    if (scene === 1) {
      if (now - time >= 15000) {
        scene = 2;
      }
      background(bColor);
      fill(255, 255, 0);
      drawStars();

      textAlign(LEFT, TOP);
      // create rocks
      {
        // random number, if 1:
        if (floor(random(1, 32)) === 1) {
          rocks.push(
            new Rock(
              floor(random(50, document.body.offsetWidth - 50)),
              floor(random(50, document.body.offsetWidth - 50)),
              floor(random(80  / 400 * document.body.offsetWidth, 100 / 400 * document.body.offsetWidth)),
              0
            )
          );
        }
      } // create rocks
      {
        for (var i = 0; i < rocks.length; i++) {
          rocks[i].draw();
        }
      } // draw rocks
      fill(255, 255, 255);
      text(
        "Points: " + floor(points) + "\nTime: " + ((now - time) / 1000).toFixed(3),
        5,
        5
      );
    } else if (scene === 2) {
      background(bColor);
      fill(255, 255, 0);
      drawStars();
      for (var i = 0; i < rocks.length; i++) {
        rocks[i].draw();
      }
      fill(255, 255, 255, 50);
      rect(0, 0, 400, 400);
      fill(255, 255, 255);
      text("Points: " + floor(points) + "\nTime: 15", 5  / 400 * document.body.offsetWidth, 5 / 400 * document.body.offsetWidth);
      textSize(41 / 400 * document.body.offsetWidth);
      textAlign(CENTER, CENTER);
      text("GAME OVER", 200 / 400 * document.body.offsetWidth, 150 / 400 * document.body.offsetWidth);
      textSize(35 / 400 * document.body.offsetWidth);
      text("Your score is:", 200 / 400 * document.body.offsetWidth, 200 / 400 * document.body.offsetWidth);
      textSize(57 / 400 * document.body.offsetWidth);
      text(floor(points), 200 / 400 * document.body.offsetWidth, 255 / 400 * document.body.offsetWidth);
      textSize(21 / 400 * document.body.offsetWidth);
      scene = 3;
    } else if (scene === 3) {
      retry.draw();
    } else if (scene === 0) {
      background(bColor);
      fill(255, 255, 0);
      if (floor(random(1, 32)) === 1) {
        rocks.push(
          new Rock(
            floor(random(50,  document.body.offsetWidth - 50)),
            floor(random(50,  document.body.offsetWidth - 50)),
            floor(random(80 / 400 * document.body.offsetWidth, 100 / 400 * document.body.offsetWidth)),
            0
          )
        );
      }
      for (var i = 0; i < stars.length; i++) {
        stars[i].draw();
      }
      for (var i = 0; i < rocks.length; i++) {
        rocks[i].draw();
      }
      fill(255, 255, 255);
      textSize(64 / 400 * document.body.offsetWidth);
      text("ASTEROID", 200 / 400 * document.body.offsetWidth, 200 / 400 * document.body.offsetWidth);
      start.draw();
    }
  };
  mousePressed = function () {
    if (scene === 1) {
      for (var i = 0; i < rocks.length; i++) {
        rocks[i].handle();
      }
    }
  };
  mouseClicked = function () {
    if (scene === 0) {
      start.handle();
    } else if (scene === 3) {
      retry.handle();
    }
  };
}
