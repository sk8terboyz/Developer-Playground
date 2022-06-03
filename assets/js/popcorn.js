$(document).ready(function() {
    const canvas = document.getElementById("popcornCanvas");
    const ctx = canvas.getContext("2d");
    
    let playAnim = false;
    
    const XMAX = canvas.width-50;
    const YMAX = canvas.height-30;
    const SPEED = 0.01;

    
    
    let ball = {x:getRandomValue(XMAX), y:175, speed:0.0085, t:0, radius:10}; 
    
    let points = [
        {x:ball.x, y:ball.y},
        {x:getRandomValue(200, 100), y:0},
        {x:getRandomValue(200, 100), y:0},
        {x:getRandomValue(XMAX, 0, true), y:175}
    ]

    function getRandomValue(max, min=0, endpoint=false) {
        let val = Math.floor(Math.random()*max+1);
        while(val <= min) { val = Math.floor(Math.random()*max+1) }
        if(endpoint) {
            if(ball.x > canvas.width/2) {
                while(val >= ball.x/1.5) { val = Math.floor(Math.random()*max+1) }
            } else {
                while(val <= ball.x*1.5) { val = Math.floor(Math.random()*max+1) }
            }
        }
        return val;
    }
    
    function createObject() {
        let obj = { x:getRandomValue(XMAX), y:175, speed:SPEED, t:0, src:"../images/seed.png" };
    }

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

    $(".seed").click(function(e) {
       
    })

    function oldAnimateSeed() {
        playAnim = true;
        let rand = Math.floor(Math.random()*500)

        if(rand > 300) { rand = (rand*(-1))+200; }
        const pop = [
            { transform: `translateX(0px) translateY(0px) rotate(0)` },
            { transform: `translateX(${rand + "px"}) translateY(-500px) rotate(180deg)` },
            { transform: `translateX(${2*rand + "px"}) translateY(0px) rotate(360deg)`}
        ];
    
        const popTime = {
            duration: 3000,
            iterations: 1,
        }

        $(".seed")[0].animate(pop, popTime);
    }

    function startGame() {
        playAnim = true;
        oldAnimateSeed();
        setTimeout(() => {
            playAnim = false;
            ball = {x:getRandomValue(XMAX), y:175, speed:0.008, t:0, radius:10};
            points = [
                {x:ball.x, y:ball.y},
                {x:getRandomValue(200, 100), y:0},
                {x:getRandomValue(200, 100), y:0},
                {x:getRandomValue(XMAX, 0, true), y:175}
            ]
        }, 3000);
    }

    $("#playBtn").click(function(e) {
        $("#countdown")[0].classList.remove("hidden");
        var count = 3;
        var countdownInterval = setInterval(function() {
            $("#countdown")[0].textContent = count;
            count--;
            if(count == 0) {
                clearInterval(countdownInterval);
                $("#countdown")[0].classList.add("hidden");
                startGame();
            }
        }, 1000)
    })
})