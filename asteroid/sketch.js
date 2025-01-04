function setup() {
  createCanvas(400, 400);
  {
    textFont(loadFont("OCRAEXT.TTF", 1));
    var scene = 0;
    var rock = loadImage("cute/Rock");
    var rocks = [];
    var Rock = function (x, y, size, distance) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.distance = distance;
      this.end = false;
    };
    var time = millis();
    var points = 0;
    var lFrame = false;
    var Button = function (xPosition, yPosition, tWidth, tLength, text) {
      this.xPosition = xPosition;
      this.yPosition = yPosition;
      this.tWidth = tWidth;
      this.tLength = tLength;
      this.text = text;
    };
    var start = false;
  } // variables

  {
    Button.prototype.retry = function () {
      var a;
      var b;
      if (
        mouseX > this.xPosition &&
        mouseX < this.xPosition + this.tWidth &&
        mouseY > this.yPosition &&
        mouseY < this.yPosition + this.tLength
      ) {
        var a = color(150, 150, 150);
        var b = color(255, 255, 255);
        if (mouseIsPressed) {
          time = millis();
          points = 0;
          rocks = [];
          textAlign(LEFT, TOP);
          textSize(21);
          scene = 1;
        }
      } else {
        var a = color(255, 255, 255);
        var b = color(100, 100, 100);
      }
      fill(a);
      rect(this.xPosition, this.yPosition, this.tWidth, this.tLength);
      fill(b);
      textAlign(CENTER, CENTER);
      text(
        "RETRY",
        this.xPosition + this.tWidth / 2,
        this.yPosition + this.tLength / 2
      );
    };
    Button.prototype.start = function () {
      Button.prototype.retry = function () {
        var a;
        var b;
        if (
          mouseX > this.xPosition &&
          mouseX < this.xPosition + this.tWidth &&
          mouseY > this.yPosition &&
          mouseY < this.yPosition + this.tLength
        ) {
          var a = color(150, 150, 150);
          var b = color(255, 255, 255);
          if (mouseIsPressed) {
            scene = 1;
          }
        } else {
          var a = color(255, 255, 255);
          var b = color(100, 100, 100);
        }
        fill(a);
        rect(this.xPosition, this.yPosition, this.tWidth, this.tLength);
        fill(b);
        textAlign(CENTER, CENTER);
        text(
          "START",
          this.xPosition + this.tWidth / 2,
          this.yPosition + this.tLength / 2
        );
      };
    };

    var retry = new Button(150, 300, 100, 33, "Retry");
  } // buttons

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
    stars.push(new Star(random(0, 400), random(0, 400)));
  }

  var drawStars = function () {
    for (var i = 0; i < stars.length; i++) {
      stars[i].draw();
    }
  };

  textSize(21);
  Rock.prototype.draw = function () {
    if (this.distance < 100 && !this.end) {
      image(
        rock,
        this.x,
        this.y,
        this.size + this.distance,
        (this.size + this.distance) * 1.5
      );
      var time = millis();
      //println(millis() % 429);
      this.distance += 1;

      if (
        mouseX > this.x - (this.size + this.distance) / 2 &&
        mouseX < this.x + (this.size + this.distance) / 2 &&
        mouseY > this.y - (this.size + this.distance) / 2 &&
        mouseY < this.y + (this.size + this.distance) / 2 &&
        mouseIsPressed
      ) {
        points += 110 - this.distance;
        this.end = true;
      }
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
      background(10, 0, 50);
      fill(255, 255, 0);
      drawStars();

      textAlign(LEFT, TOP);
      // random number, if 1:
      {
        if (floor(random(1, 32)) === 1) {
          rocks.push(
            new Rock(
              floor(random(50, 350)),
              floor(random(50, 350)),
              floor(random(80, 100)),
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
        "Points: " + points + "\nTime: " + ((now - time) / 1000).toFixed(3),
        5,
        5
      );
    } else if (scene === 2) {
      background(10, 0, 50);
      fill(255, 255, 0);
      drawStars();
      for (var i = 0; i < rocks.length; i++) {
        rocks[i].draw();
      }
      fill(255, 255, 255, 50);
      rect(0, 0, 400, 400);
      fill(255, 255, 255);
      text("Points: " + points + "\nTime: 15", 5, 5);
      textSize(41);
      textAlign(CENTER, CENTER);
      text("GAME OVER", 200, 150);
      textSize(35);
      text("Your score is:", 200, 200);
      textSize(57);
      text(points, 200, 255);
      textSize(21);
      scene = 3;
    } else {
      retry.retry();
    }
  };
}
