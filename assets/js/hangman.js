$(document).ready(function() {
    const canvas = document.getElementById('hangman');
    const context = canvas.getContext("2d");

    let cvs = $("#letterDisplay")[0];
    let ctx = cvs.getContext("2d");

    // Initialize word & word array for words to be added
    let wordBank = [];
    let word = "";

    // Overlay on page load prompting user to choose what styled game (singleplayer/multiplayer, custom words, single words, phrases, categories, etc)?
    function startOverlay() {}

    function getSingleWords() {
        // get all single words
        fetch('../data/singleWordList.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(d => {
                wordBank.push(d);
            })
        })
    }

    function getMultipleWords() {
        // get all multiple words
        fetch('../data/singleWordList.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(d => {
                wordBank.push(d);
            })
        })
    }

    function getCategory(category="") {
        if(category="") {
            return category;
        }
        return category;
    }

    clearHangmanCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    }

    clearWordCanvas = () => {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
    }

    Draw = (part) => {
        switch (part) {
            case 'gallows' :
                context.strokeStyle = 'rgb(125, 108, 87)';
                context.lineWidth = 10; 
                context.beginPath();
                // move brush to point
                context.moveTo(270, 470);
                // draw line from previous point to new point
                context.lineTo(25, 470);
                // move brush to point
                context.moveTo(120, 470);
                // draw line from previous point to new point
                context.lineTo(120, 30);
                // draw line from previous point to new point
                context.lineTo(370, 30);
                // draw line from previous point to new point
                context.lineTo(370, 95);
                context.stroke();
                break;

            case 'head':
                context.strokeStyle = 'rgb(218, 148, 18)';
                context.lineWidth = 10;
                context.beginPath();
                context.arc(370, 145, 50, 0, Math.PI*2, true);
                context.closePath();
                context.stroke();
                break;
            
            case 'body':
                context.beginPath();
                context.moveTo(370, 195);
                context.lineTo(370, 370);
                context.stroke();
                break;

            case 'rightHarm':
                context.beginPath();
                context.moveTo(370, 270);
                context.lineTo(295, 235);
                context.stroke();
                break;

            case 'leftHarm':
                context.beginPath();
                context.moveTo(370, 270);
                context.lineTo(445, 245);
                context.stroke();
                break;

            case 'rightLeg':
                context.beginPath();
                context.moveTo(370, 370);
                context.lineTo(420, 420);
                context.stroke();
                break;

            case 'rightFoot':
                context.beginPath();
                context.moveTo(415, 420);
                context.lineTo(445, 395);
                context.stroke();
            break;

            case 'leftLeg':
                context.beginPath();
                context.moveTo(370, 370);
                context.lineTo(320, 420);
                context.stroke();
            break;

            case 'leftFoot':
                context.beginPath();
                context.moveTo(325, 420);
                context.lineTo(295, 395);
                context.stroke();
            break;
        } 
    }

    const draws = [
    'gallows', 
    'head', 
    'body', 
    'rightHarm', 
    'leftHarm',
    'rightLeg',
    'leftLeg',
    'rightFoot',
    'leftFoot',
    ]
    var step = 0;

    function drawNext() {
        Draw(draws[step++]);
        // display win/lose when final step has been reached/passed
        if(step >= 9) {
            // overlay display of win/lose?
            alert("GAME OVER")
        }
    }

    function drawLines(single=0) {
        ctx.strokeStyle = 'rgb(125, 75, 125)';
        ctx.lineWidth = 3;
        
        switch (single) {
            case 0:
                console.log("What style of game are we playing? huh?");
                console.log(`${single} - default value, no game playing.`);
                break;
            case 1:
                let width = (cvs.width-(cvs.width/5))/2;
                let x = ((width)/word.length)+14;
                console.log(`x=${x}`);
                let space = 14;
                let distance = ((cvs.width-(cvs.width/5))/word.length)-space;

                for(let i = 0; i < word.length; i++) {
                    console.log(`x${i} = ${x}`);
                    ctx.beginPath();
                    ctx.moveTo(x, 80);
                    x = x+distance;
                    console.log(`x${i+1} = ${x}`);
                    ctx.lineTo(x, 80);
                    ctx.stroke();
                    x = x+space;
                }

                console.log("Single Word Mode");
                break;
            case 2:
                console.log("Multi Word Mode");
                break
            case 3:
                console.log("Category Mode");
                break;
            case 4:
                console.log("All the above");
                break;
            default:
                console.log("Game has broken, I don't know how, but it did.");
                break;
        }
    }

    function drawLetter(letter='', x=0, y=0) {
        if(letter == '' || x == 0 || y == 0) {
            console.log("Letter cannot be drawn");
            return;
        }
        ctx.font = "30px serif";
        ctx.fillText(letter, x, y)
    }

    function resetGame() {
        let btnGroup = $(".letterBtn");
        for(let i = 0; i < btnGroup.length; i++) {
            btnGroup[i].disabled = false;
        }
    }

    // find a random word from the wordBank & reset word
    function findWord() {
        let random = Math.floor(Math.random() * wordBank.length);
        word = wordBank[random].toLowerCase();
        console.log(random + " - " + word);
        console.log("Max Words: " + wordBank.length);
    }

    // check letter to word
    function checkLetter(letter) {
        if(word.indexOf(letter) > -1) {
            return true;
        }
        drawNext();
        return false;
    }

    // reset word bank
    function resetWordBank() {
        wordBank.length = 0;
    }

    $("#getWordBank").click(function(e){ getSingleWords(); })
    $("#getWord").click(function(e) { findWord(); })

    // on letter guess event
    $(".letterBtn").click(function(e) {
        if(word == "") {
            console.log("No word chosen");
            return;
        }
        let letter = e["currentTarget"].textContent;

        // disable button that has already been guessed
        e["currentTarget"].disabled = true;

        // check letter against word
        if(checkLetter(letter.toLowerCase())) {
            console.log("letter found");
            console.log(drawLetter(letter.toUpperCase(), 50, 50));
            return;
        } else {
            console.log("Letter not found");
        }
    })
    $("#newWord").click(function(e) {
        clearHangmanCanvas();
        clearWordCanvas();
        resetGame();
        findWord();
        drawLines(1)
        step = 0;
    })
})
