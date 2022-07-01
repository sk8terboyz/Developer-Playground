$(document).ready(function(e) {
    let cvs = document.createElement("canvas");
    let ctx = cvs.getContext('2d');
    let freedraw = false;

    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    
    init();

    function init() {
        cvs.setAttribute('id', 'cursorCanvas');
        cvs.width = WIDTH;
        cvs.height = HEIGHT;
        cvs.innerHTML = "Your browser does not support the HTML canvas.";
        $(".cursorCanvasContainer")[0].appendChild(cvs);

        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        ctx.fillRect(0, 0, cvs.width, cvs.height);

    }

    function elementScaleWidth(e) {
        return e.currentTarget.offsetWidth == 0 ? 0 : (e.currentTarget.width/e.currentTarget.offsetWidth);
    }

    function elementScaleHeight(e) {
        return e.currentTarget.offsetHeight == 0 ? 0 : (e.currentTarget.height/e.currentTarget.offsetHeight);
    }
    
    $("#clear").click(function(e) {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
    })
    
    $("#cursorCanvas").mousemove(function(e) {
        let x = Math.round((e.clientX - ctx.canvas.offsetLeft)*elementScaleWidth(e));
        let y = Math.round((e.clientY - ctx.canvas.offsetTop)*elementScaleHeight(e));
        $("#coords")[0].textContent = `${x}  |  ${y}`;
        if(freedraw) {
            ctx.fillStyle = "rgb(80, 80, 80)";
            ctx.fillRect(x, y, 3, 3);
        }
    });

    // $("#cursorCanvas").mousedown(function(e) {
    //     freedraw = true;
    // })

    // $("#cursorCanvas").mouseup(function(e) {
    //     freedraw = false;
    // })
    
    $("#cursorCanvas").click(function(e) {
        let x = Math.round((e.clientX - ctx.canvas.offsetLeft)*elementScaleWidth(e));
        let y = Math.round((e.clientY - ctx.canvas.offsetTop)*elementScaleHeight(e));
        ctx.fillStyle = "rgba(80, 80, 80, 0.75)";
        ctx.fillRect(x, y, 30, 30);
        console.log(`x=${x} | y=${y}`);
        // console.log(`${}`);

    })

})