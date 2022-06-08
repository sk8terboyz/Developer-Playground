$(document).ready(function() {
    const canvas = document.getElementById("popcornCanvas");
    const ctx = canvas.getContext("2d");
    
    let score = 0;
    const FULLCOUNT = 10;
    const GAMETIMER = 30000;    // in miliseconds (30 seconds)

    const XMAX = canvas.width-30;
    const YMAX = canvas.height-30;
    const SPEED = 0.01;

    function getRandomValue(max, min=0, endpoint=false, obj=null) {
        let val = Math.floor(Math.random()*max+1);
        while(val <= min) { val = Math.floor(Math.random()*max+1) }
        if(endpoint && obj != null) {
            if(obj.x > canvas.width/2) {
                while(val >= obj.x/1.5) { val = Math.floor(Math.random()*max+1) }
            } else {
                while(val <= obj.x*1.5) { val = Math.floor(Math.random()*max+1) }
            }
        }
        return val;
    }
    
    function createObject() {
        let obj = { x:getRandomValue(XMAX), y:canvas.height+25, speed:SPEED, t:0, src:"../images/seed.png", points:[], time:0 };
        obj.points = [ {x:obj.x, y:obj.y}, {x:getRandomValue(200, 100), y:0}, {x:getRandomValue(200, 100), y:0}, {x:getRandomValue(XMAX, 0, true), y:canvas.height+25} ];
        const node = document.createElement("img");
        node.setAttribute("src", obj.src);
        node.setAttribute("alt", "Popcorn seed");
        node.setAttribute("height", canvas.height);
        node.setAttribute("width", canvas.width/2);
        node.setAttribute("id", "seedling");
        node.style.position = "absolute";
        $(".seedContainer")[0].appendChild(node);
        return obj;
    }
    
    document.body.addEventListener('click', function(e) {
        if(e.target.id == "seedling") {
            e.target.classList.add('hidden');
            score++;
            $(".score")[0].innerHTML =`Score: ${score}`;
            if(score == FULLCOUNT) {
                gameOver(true);
            }
        }
    })

    function animateSeed(obj) {
        let startX = getRandomValue(XMAX);
        let peak = getRandomValue(XMAX);
        let endX = getRandomValue(XMAX, 0, true, obj);
        console.log(startX, peak, endX);
        
        const pop = [
            { transform: `translateX(${startX + "px"}) translateY(0px) rotate(0)` },
            { transform: `translateX(${peak + "px"}) translateY(-500px) rotate(360deg)` },
            { transform: `translateX(${endX + "px"}) translateY(0px) rotate(0)`}
        ];
        const popTime = {
            duration: 2000,
            easing: `cubic-bezier(${Math.random()}, 0, ${Math.random()}, 0)`,
            iterations: 1,
        }
        const nodes = ($(".seedContainer")[0].childNodes);
        obj.time = Math.floor(Math.random()*GAMETIMER);
        console.log(`time (ms): ${obj.time}`);
        nodes.forEach(seed => {
            setTimeout(() => {
                seed.animate(pop, popTime);
            }, obj.time);      
        });
        // $("#seedling")[0].animate(pop, popTime);
        console.log($(".seedling"));
    }

    function startGame(numObjs) {
        var objs = [];
        for(let i = 0; i < numObjs; i++) {
            obj = createObject();
            objs.push(obj);
            animateSeed(obj);
        }
        // Display/Reset score counter
        score = 0;
        $(".score")[0].innerHTML =`Score: 0`;
        $(".scoreContainer")[0].classList.remove("hidden");

        // Time limit on game (set to 30seconds currently)
        setTimeout(() => {
            gameOver();
        }, GAMETIMER);

        // set timer values (30 seconds added to current time for timer)
        var timeLimit = new Date().getSeconds() + 30;
        var now = new Date().getSeconds();
        var distance = timeLimit - now;
        
        var timer = setInterval(() => {
            distance--;
            if(distance < 10 ) {
                $(".timer")[0].innerHTML = `0:0${distance}`
            } else {
                $(".timer")[0].innerHTML = `0:${distance}`;
            }
            if(distance < 0) {
                $(".timer")[0].innerHTML = "0:00";
                clearInterval(timer);
            }
        }, 1000);
    }

    function resetSeeds() {
        while($(".seedContainer")[0].firstChild) {
            $(".seedContainer")[0].removeChild($(".seedContainer")[0].firstChild);
        }
    }
    
    function gameOver(winner=false) {
        if(winner) {
            $("#overlayText")[0].innerHTML = "You Win!"
        }
        $(".overlay")[0].style.display = "block";
        resetSeeds();
    }

    $("#playBtn").click(function(e) {
        $("#countdown")[0].classList.remove("hidden");
        var count = 3;
        var countdownInterval = setInterval(function() {
            $("#countdown")[0].textContent = count;
            if(count == 0) {
                clearInterval(countdownInterval);
                $("#countdown")[0].classList.add("hidden");
                startGame(FULLCOUNT);
                $("#countdown")[0].textContent = "";
            }
            count--;
        }, 1000)
    })
})