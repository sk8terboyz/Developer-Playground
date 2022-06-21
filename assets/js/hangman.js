$(document).ready(function() {
    const canvas = document.getElementById('hangman');
    const context = canvas.getContext("2d");

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

    clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    }

    Draw = (part) => {
        switch (part) {
            case 'gallows' :
                context.strokeStyle = '#444';
                context.lineWidth = 10; 
                context.beginPath();
                // move brush to point
                context.moveTo(250, 450);
                // draw line from previous point to new point
                context.lineTo(5, 450);
                // move brush to point
                context.moveTo(100, 450);
                // draw line from previous point to new point
                context.lineTo(100, 10);
                // draw line from previous point to new point
                context.lineTo(350, 10);
                // draw line from previous point to new point
                context.lineTo(350, 75);
                context.stroke();
                break;

            case 'head':
                context.lineWidth = 10;
                context.beginPath();
                context.arc(350, 125, 50, 0, Math.PI*2, true);
                context.closePath();
                context.stroke();
                break;
            
            case 'body':
                context.beginPath();
                context.moveTo(350, 175);
                context.lineTo(350, 350);
                context.stroke();
                break;

            case 'rightHarm':
                context.beginPath();
                context.moveTo(350, 250);
                context.lineTo(275, 225);
                context.stroke();
                break;

            case 'leftHarm':
                context.beginPath();
                context.moveTo(350, 250);
                context.lineTo(425, 225);
                context.stroke();
                break;

            case 'rightLeg':
                context.beginPath();
                context.moveTo(350, 350);
                context.lineTo(400, 400);
                context.stroke();
                break;

            case 'rightFoot':
                context.beginPath();
                context.moveTo(395, 395);
                context.lineTo(425, 375);
                context.stroke();
            break;

            case 'leftLeg':
                context.beginPath();
                context.moveTo(350, 350);
                context.lineTo(300, 400);
                context.stroke();
            break;

            case 'leftFoot':
                context.beginPath();
                context.moveTo(305, 395);
                context.lineTo(275, 375);
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
        // console.log(e);
        // check letter against word

        if(checkLetter(letter.toLowerCase())) {
            console.log("letter found");
            return;
        } else {
            console.log("Letter not found");
        }
    })
    $("#newWord").click(function(e) {
        clearCanvas();
        resetGame();
        findWord();
        step = 0;
    })
})