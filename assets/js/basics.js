$(document).ready(function() {
    $("#calculateRNG").click(function(e) {
        const max = parseInt($("#maxInput")[0].value);
        const min = parseInt($("#minInput")[0].value);
        let res = Math.floor(Math.random()*max);
        if(min < max && $("#maxInput")[0].value.length <= 6 && $("#minInput")[0].value <= 6) {
            while(res < min) {
                res = Math.floor(Math.random()*max)+1
            }
            $("#result")[0].innerHTML = res;
        } else {
            $("#result")[0].innerHTML = "N/A";
        }
    })
})