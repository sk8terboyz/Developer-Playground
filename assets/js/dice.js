$(document).ready(function() {

    $("#roll").click(function(e) {
        dice = setInterval(rolldie, 20);
        setTimeout(() => {
            clearInterval(dice);
        }, 2500)
    })

    function rolldie() {
        var ranNum = Math.floor(1 + Math.random() * 6);
        $("#dice")[0].innerHTML = ranNum;
    }
    
    
})