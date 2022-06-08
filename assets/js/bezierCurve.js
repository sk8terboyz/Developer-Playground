$(document).ready(function() {
    const canvas = document.getElementById("bezierCanvas");
    const ctx = canvas.getContext("2d");

    let playAnim = false;

    let ball = {x:30, y:30, speed:0.01, t:0, radius:20};

    let points = [
        {x:ball.x, y:ball.y},
        {x:70, y:20},
        {x:125, y:95},
        {x:350, y:350}
    ]

    function drawBall() {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false);
        ctx.fill();
    }

    function moveBallInBezierCurve() {
        let [p0, p1, p2, p3] = points;
        // Calvulate the coefficients based on where the ball currently is in the animation
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

        // draw the ball to the vancas in the new location
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
    
    // button event listeners

    $("#playBtn").click(function(e) {
        playAnim = true;
    })

    $("#resetBtn").click(function(e) {
        playAnim = false;
        ball = {x:30, y:30, speed:0.01, t:0, radius:20};
        document.querySelectorAll(".value").forEach(val => {
            val.textContent = 0;
        })
    })

    $(".decremental").click(function(e) {
        if(e.currentTarget.parentNode.children[1].textContent > 0) {
            e.currentTarget.parentNode.children[1].textContent -= 1;
        }
    })

    $(".incremental").click(function(e) {
        if(e.currentTarget.parentNode.children[1].textContent < 600) {
            e.currentTarget.parentNode.children[1].textContent = parseInt(e.currentTarget.parentNode.children[1].textContent) + 1;
        }
    })
})