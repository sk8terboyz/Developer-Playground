$(document).ready(function(e) {

    let ctx = $("#cursorCanvas")[0].getContext('2d');
    
    $("#cursorCanvas").mousemove(function(e) {
        let x = e.clientX - ctx.canvas.offsetLeft;
        let y = e.clientY - ctx.canvas.offsetTop;
        $("#coords")[0].textContent = `${x}  |  ${y}`;
    })

    $("#cursorCanvas").click(function(e) {
        let x = e.clientX - ctx.canvas.offsetLeft;
        let y = e.clientY - ctx.canvas.offsetTop;
        ctx.fillStyle = "rgb(80, 80, 80)";
        ctx.fillRect(x, y, 30, 30);
        console.log(x, y);
    })

})