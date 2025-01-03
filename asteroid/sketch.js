function setup() {
  createCanvas(1000, 1000);
  /*
This programs draws a star at the mouse coordinates when it's clicked and connect every star to the closest one.
*/

var xPositions = [100];
var yPositions = [200];
fill(255, 255, 0);
stroke(255, 255, 0);



// creates variable drawLines
var drawLines = function() {
    // sets the background
    background(9, 5, 59);
    
    // for every star (the lenght of xPositions or yPositions is the number of stars)
    for (var i = 0; i < xPositions.length; i++) {
        var idShorter = 0;
        var shorter = Infinity;
        // for every other star
        for (var j = 0; j < xPositions.length; j++) {
            // if the two selected stars aren't the same
            if (i !== j) {
                
                // calculates distance between the two stars using pythagorean theorem
                var path = Math.hypot(xPositions[i] - xPositions[j], yPositions[i] - yPositions[j]);
                // if the star is the closest star analized until now
                if (path < shorter) {
                
                // saves the distance and the id
                idShorter = j;
                shorter = path;
                }
                
            }
        }
        
        // draw a line between the star and the closest star
        line(xPositions[i], yPositions[i], xPositions[idShorter], yPositions[idShorter]);
    }
};

// creates function drawStars
var drawStars = function() {
    // calls drawLines function
    drawLines();
    // makes so that the coordinates for an image are at its center and not at its corner
    imageMode(CENTER);
    // for every star
    for (var i = 0; i < yPositions.length; i++) {
        // draws a star at the coordinates in the xPositions or yPositions array
        ellipse(xPositions[i], yPositions[i], 10, 10);
    }
};

// calls drawStars function
drawStars();

// when the mouse is clicked
mouseClicked = function() {
        // registers x position
        xPositions.push(mouseX);
        // registers y position
        yPositions.push(mouseY);
        // calls drawStars function
        drawStars();
    
};
}

