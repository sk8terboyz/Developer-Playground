$(document).ready(function() {
    $(".seed").click(function(e) {
        let rand = Math.floor(Math.random()*500)
        let qe = 1-Math.sin(Math.acos(0.05));
        console.log(qe);
        if(rand > 300) { rand = (rand*(-1))+200; }
        const pop = [
            { transform: `translateX(0px) translateY(0px) rotate(0)` },
            { transform: `translateX(${rand + "px"}) translateY(-500px) rotate(180deg)` },
            { transform: `translateX(${2*rand + "px"}) translateY(0px) rotate(360deg)`}
        ];

        const popTime = {
            duration: 1500,
            iterations: 1,
        }
        e.currentTarget.animate(pop, popTime);
    })
})