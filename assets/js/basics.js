$(document).ready(function() {
    // Random Number Generation
    $("#calculateRNG").click(function(e) {
        const max = parseInt($("#maxInput")[0].value);
        const min = parseInt($("#minInput")[0].value);
        let res = Math.floor(Math.random()*max);
        if(min < max && $("#maxInput")[0].value.length <= 6 && $("#minInput")[0].value.length <= 6) {
            while(res < min) {
                res = Math.floor(Math.random()*max)+1
            }
            $("#result")[0].innerHTML = res;
        } else {
            $("#result")[0].innerHTML = "N/A";
        }
    })
    
    // Calculator
    $(".calcBtns").click(function(e) { displayInput(e) }) 
    
    let answered = false;
    function displayInput(e, keyboard=false) {
        let val;
        if(!keyboard) {
            val = e.currentTarget.value;
        } else {
            val = e;
        } 
        if(answered) {
            $("#calcResult")[0].value = "";
            answered = false;
        }
        switch (val) {
            case 'C':
                // console.log($("calcResult"));
                $("#calcResult")[0].value = "";
                break;
            case "Backspace":
                // console.log($("calcResult"));
                $("#calcResult")[0].value = "";
                break;
            case '=':
                $("#calcResult")[0].value = eval($("#calcResult")[0].value);
                answered = true;
                break;
            case "Enter":
                $("#calcResult")[0].value = eval($("#calcResult")[0].value);
                answered = true;
                break;
            case "()":
                break;
            case "+/-":
                $("#calcResult")[0].value *= -1;
                break
            default:
                // if(isNaN($("#calcResult")[0].value)) {
                //     break;
                // }
                $("#calcResult")[0].value += val;
                break;
        }
    }


    document.addEventListener('keydown', function(e) {
        let code = e.code.slice(0, 3)
        switch (code) {
            case "Num":
                displayInput(e.key, true);
                break;
            case "Dig":
                displayInput(e.key, true);
                break;
            case "Bac":
                displayInput(e.key, true);
                break;
            default:
                break;
        }
    })

    // Parabola - Quadratic (3 points)
    $("#drawCurve").click(function(e) {
        let cvs = $("#quadraticCanvas")[0];
        let ctx = cvs.getContext("2d");
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.strokeStyle = randomColor();
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.quadraticCurveTo(50, 250, 200, 25);
        ctx.stroke();
    })

    function randomColor() {
        let color = `rgb(${Math.floor((Math.random()*255)+1)}, ${Math.floor((Math.random()*255)+1)}, ${Math.floor((Math.random()*255)+1)})`
        return color;
    }

    $("#resetCurve").click(function(e) {
        let cvs = $("#quadraticCanvas")[0];
        let ctx = cvs.getContext("2d");
        ctx.clearRect(0, 0, cvs.width, cvs.height);
    })

    // Mouse Coords
    var keyboardOnly = false;
    $("#toggleCoords").click(function(e) {
        $("#mouseCoords")[0].classList.toggle('hidden');
    })

    $("#mouseCanvas").mousemove(function(e) {
        let cvs = $("#mouseCanvas")[0];
        let ctx = cvs.getContext("2d");
        
        let rect = cvs.getBoundingClientRect();

        let x = Math.round((e.clientX - rect.left)*elementScaleWidth(e));
        let y = Math.round((e.clientY - rect.top)*elementScaleHeight(e));
        $("#mouseCoords")[0].textContent = `X: ${x}  |  Y: ${y}`;
    })

    $("#mouseCanvas").mousedown(function(e) {
        let cvs = $("#mouseCanvas")[0];
        let ctx = cvs.getContext("2d");
        
        let rect = cvs.getBoundingClientRect();

        let x = Math.round((e.clientX - rect.left)*elementScaleWidth(e));
        let y = Math.round((e.clientY - rect.top)*elementScaleHeight(e));

        ctx.fillStyle = randomColor();
        ctx.fillRect(x, y, 4, 4);
    })

    function elementScaleWidth(e) {
        return e.currentTarget.offsetWidth === 0 ? 0 : (e.currentTarget.width/e.currentTarget.offsetWidth);
    }

    function elementScaleHeight(e) {
        return e.currentTarget.offsetHeight === 0 ? 0 : (e.currentTarget.height/e.currentTarget.offsetHeight);
    }

    document.addEventListener('keydown', function(e) {
        console.log(e.code);
        if(e.code == "Escape" && keyboardOnly) {
            keyboardOnly = false;
            // bring back cursor
        }
    })
})