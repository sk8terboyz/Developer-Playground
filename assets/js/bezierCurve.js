$(document).ready(function() {
    const canvas = document.getElementById("bezierCanvas");
    const ctx = canvas.getContext("2d");
    let savedPatterns = [];
    let points = [];
    let showCoords = false;

    // get all saved patterns
    fetch('../data/bcPatterns.json')
            .then(res => res.json())
            .then(data => {
                savedPatterns.push(data["savedPatterns"]);
                setPoints(0);
                displayPatterns();
            })
    
    let playAnim = false;
    let ball = {x:0, y:0, speed:0.01, t:0, radius:20};

    function setPoints(index=0) {
        switch (index) {
            case 0: 
                points = savedPatterns[0]["pattern1"];
                break;
            case 1:
                points = savedPatterns[0]["pattern2"];
                break;
            case 2:
                points = savedPatterns[0]["pattern3"];
                break;
            case 3:
                points = savedPatterns[0]["pattern4"];
                break;
            default:
                console.error("ERROR: POINTS NOT SET");
                break;
        }
        ball.x = points[0].x;
        ball.y = points[0].y;
    }

    function displayPatterns() {
        patternImages = savedPatterns[0]["images"][0];
        $("#sp1")[0].src = patternImages["pattern1"];
        $("#sp2")[0].src = patternImages["pattern2"];
        $("#sp3")[0].src = patternImages["pattern3"];
        $("#sp4")[0].src = patternImages["pattern4"];
        // $("#sp5")[0].src = patternImages[""];
        // $("#sp6")[0].src = patternImages[""];
        // $("#sp7")[0].src = patternImages[""];
        // $("#sp8")[0].src = patternImages[""];

    }

    function drawBall() {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false);
        ctx.fill();
        $("#bcCoords")[0].textContent = `X: ${Math.floor(ball.x)} Y: ${Math.floor(ball.y)}`;
    }

    function moveBallInBezierCurve() {
        let [p0, p1, p2, p3] = points;
        // Calculate the coefficients based on where the ball currently is in the animation
        let cx = 3 * (p1.x - p0.x);
        let bx = 3 * (p2.x - p1.x) - cx;
        let ax = p3.x - p0.x - cx - bx;
        
        let cy = 3 * (p1.y - p0.y);
        let by = 3 * (p2.y - p1.y) - cy;
        let ay = p3.y - p0.y - cy - by;
        
        let t = ball.t;
        // Increment t value by speed
        ball.t += ball.speed;
        // Calculate the new X and Y coords of the ball
        let xt = ax*(t*t*t) + bx*(t*t) + cx*t + p0.x;
        let yt = ay*(t*t*t) + by*(t*t) + cy*t + p0.y;
        
        if(ball.t > 1) {
            // t is still being incremented each frame so to stop movement we must set t=1
            ball.t = 1;
        }
        
        // draw the ball to the canvas in the new location
        // If the object was not created with the arc method, this math would instead be something along the lines of (object.x = xt-object.width/2 and object.y = yt-object.height/2). This is due to the fact the arc already works based off the center point while other objects would not
        ball.x = xt;
        ball.y = yt;
        drawBall();
    }
    
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Ball code comes below
        if(!playAnim) { drawBall(); }
        else { moveBallInBezierCurve(); }
    }
    
    animate();

    function reset() {
        playAnim = false;
        ball = {x:30, y:30, speed:0.01, t:0, radius:20};
        $("#playBtn")[0].disabled = false;
    }

    // button event listeners

    $("#showCoords").click(function(e) {
        $("#bcCoords")[0].classList.toggle("hidden");
    })

    $("#playBtn").click(function(e) {
        reset();
        playAnim = true;
        // e["currentTarget"].disabled = true;
    })
    
    $("#resetBtn").click(function(e) {
        reset();
    })
    
    // Saved Patterns Listeners
    $("#sp1").click(function(e) {
        reset();
        setPoints(0);
    })
    $("#sp2").click(function(e) {
        reset();
        setPoints(1);
    })
    $("#sp3").click(function(e) {
        reset();
        setPoints(2);
    })
    $("#sp4").click(function(e) {
        reset();
        setPoints(3);
    })
})