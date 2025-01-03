function setup() {
  createCanvas(400, 400);
  var rock = loadImage("Rock.png");
var rocks = [];
var Rock = function(x, y, size, distance, end) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.distance = distance;
    this.end = end;
};
var time = millis();
var points = 0;
var lFrame = false;
var Button = function(xPosition, yPosition, tWidth, tLength, text) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.tWidth = tWidth;
    this.tLength = tLength;
    this.text = text;
};
var start = false;

Button.prototype.retry = function () {
    var a;
    var b;
    if (mouseX > this.xPosition && mouseX < this.xPosition + this.tWidth && mouseY > this.yPosition && mouseY < this.yPosition + this.tLength) {
        var a = color(150, 150, 150);
        var b = color(255, 255, 255);
        if (mouseIsPressed) {
            time = millis();
            lFrame = false;
            points = 0;
            rocks = [];
            textAlign(LEFT, TOP);
            textSize(21);
            start = true;
        }
    } else {
        var a = color(255, 255, 255);
        var b = color(100, 100, 100);

    }
    fill(a);
    rect(this.xPosition, this.yPosition, this.tWidth, this.tLength);
    fill(b);
    textAlign(CENTER, CENTER);
    text("RETRY", this.xPosition + this.tWidth / 2, this.yPosition + this.tLength / 2);

};

var retry = new Button(150, 300, 100, 33, "Retry");


    



textSize(21);
Rock.prototype.draw = function() {
    if (this.distance < 100) {
        image(rock, this.x, this.y, this.size+this.distance, (this.size+this.distance)*1.5);
        var time = millis();
        //println(millis() % 429);
        this.distance += 1;
            
        if (mouseX > this.x - (this.size+this.distance) / 2 && mouseX < this.x + (this.size+this.distance) / 2 && mouseY > this.y - (this.size+this.distance) / 2 && mouseY < this.y + (this.size+this.distance) / 2 && mouseIsPressed) {
            points += 110-this.distance;
            this.distance = 100;
        }
        
    }
};
    
// draw
imageMode(CENTER);

draw = function() {
    var now = millis();
    if (now - time < 15000) { 
        background(255, 255, 255);
        textAlign(LEFT, TOP);
        // random number, if 1:
        if (floor(random(1, 45)) === 1) {
            rocks.push(new Rock(floor(random(50, 350)), floor(random(50, 350)), floor(random(80, 100)), 0));
        }
        for (var i = 0; i < rocks.length; i++) {
            rocks[i].draw();
        }
        fill(0, 0, 0);
        text("Points: " + points + "\nTime: " + ((now- time)/1000).toFixed(3), 5, 5);
        
    } else if (!lFrame) {
        background(255, 255, 255);
        for (var i = 0; i < rocks.length; i++) {
            rocks[i].draw();
        }
        fill(255, 255, 255, 50);
        rect(0, 0, 400, 400);
        fill(0, 0, 0);
        text("Points: " + points + "\nTime: 15", 5, 5);
        textSize(41);
        textAlign(CENTER, CENTER);
        text("GAME OVER\nYour score is: "+ points, 200, 200);
        textSize(21);
        lFrame = true;
    } else {
        retry.retry();
        
    }
};

}

