$(document).ready(function() {

    $("#roll").click(function(e) {
        dice = setInterval(rolldice, 20);
        setTimeout(() => {
            clearInterval(dice);
        }, 2500)
    })

    function rolldice() {
        var ranNum = Math.floor(1 + Math.random() * 6);
        $("#dice")[0].innerHTML = ranNum;
    }
    
    
})