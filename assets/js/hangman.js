$(document).ready(function() {
    
    const canvas = document.getElementById('hangman');
    const context = canvas.getContext("2d");

    let cvs = $("#letterDisplay")[0];
    let ctx = cvs.getContext("2d");

    // Initialize word & word array for words to be added
    let wordBank = [];
    let word = "";
    
    // Initialize count to know when game ends
    let count = 0;

    // Initialize array for x coords of the lines on the word canvas
    let xCoords = [];

    // Overlay
    $("#overlay").fadeIn();
    $("#overlayContent").show();
    $("#overlayContent").animate({top: "100"});

    // close overlay (breaks game so maybe remove this)
    $("#cross").click(function () {
        $("#overlay").hide();
        $("#overlayContent").hide();
        $("#overlayContent").css("top", "-310px");
    });
    // single word
    $("#single").click(function() {
        $("#overlay").hide();
        $("#overlayContent").hide();
        $("#overlayContent").css("top", "-310px");

        wordBank.length=0;
        getSingleWords();
        // Timer allows words to be pulled from JSON file before a word is selected
        setTimeout(() => {
            findWord();
            drawLines(1);
        }, 250);

        console.log("Single Word Mode Selected");
    })
    $("#multi").click(function() {
        // start multi-word gamemode
    })
    $("#categories").click(function() {
        // Display category overlay choices
    })
    $("#custom").click(function() {
        // Allow user to enter their own words into new array (maybe allow imports of txt files with words)
    })

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

            case 'dead':
                context.font = "25px fantasy";
                context.fillStyle = "red";
                context.fillText('X', 350, 135)

                context.font = "25px fantasy";
                context.fillStyle = "red";
                context.fillText('X', 385, 135)
                // context.beginPath();
                // context.moveTo(350, 135);
                // context.lineTo(355, 140);
                // context.stroke();

                // context.beginPath();
                // context.moveTo(355, 135);
                // context.lineTo(350, 140);
                // context.stroke();
                break;

            case 'smiley':
                context.beginPath();
                context.arc(350, 135, 10, 90, Math.PI, true);
                context.closePath();
                context.stroke();

                context.beginPath();
                context.arc(390, 135, 10, 90, Math.PI, true);
                context.closePath();
                context.stroke();

                context.beginPath();
                context.arc(370, 160, 10, 0, Math.PI, false);
                context.closePath();
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
    'dead',
    'smiley',
    ]
    var step = 0;

    function drawNext() {
        Draw(draws[step++]);
        // display win/lose when final step has been reached/passed
        if(step >= 9) {
            gameOver(2);
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
                // Single Word Mode
                let width = (cvs.width-(cvs.width/5))/2;
                let x = ((width)/word.length)+14;
                // console.log(`x=${x}`);
                let space = 14;
                let distance = ((cvs.width-(cvs.width/5))/word.length)-space;

                for(let i = 0; i < word.length; i++) {
                    xCoords.push(x);
                    ctx.beginPath();
                    ctx.moveTo(x, 80);
                    x = x+distance;
                    // xCoords.push(x);
                    ctx.lineTo(x, 80);
                    ctx.stroke();
                    x = x+space;
                }
                // console.log(xCoords);
                break;
            case 2:
                // Multi Word Mode
                console.log("Multi Word Mode");
                break
            case 3:
                // 
                console.log("Category Mode");
                break;
            case 4:
                console.log("More Categories");
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
        let fontSize = 7 * ((30-word.length)/word.length);
        ctx.font = `${fontSize}px math`;
        ctx.fillStyle = "rgb(14, 204, 84)";
        ctx.fillText(letter, x, y);
    }

    function resetGame() {
        let btnGroup = $(".letterBtn");
        for(let i = 0; i < btnGroup.length; i++) {
            btnGroup[i].disabled = false;
        }
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        context.clearRect(0, 0, canvas.width, canvas.height);
        count = 0;
        step = 0;
        xCoords.length = 0;
        $("#letterDisplay")[0].style.opacity = "100%";
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
        // if(word.indexOf(letter) > -1) {
        //     return word.indexOf(letter);
        // }
        let indices = [];
        for(let i = 0; i < word.length; i++) {
            if(letter == word[i]) {
                indices.push(i);
            }
        }
        if(indices.length > 0) {
            // console.log(`indices = ${indices}`);
            return indices;
        } else {
            drawNext();
            return -1;
        }
    }

    // reset word bank
    function resetWordBank() {
        wordBank.length = 0;
    }
    
    function gameOver(result=0) {
        let btns = document.querySelectorAll(".letterBtn")
        btns.forEach(btn => {
            btn.disabled = true;
        })
        switch (result) {
            case 1:
                console.log("You Win!");
                context.clearRect(0, 0, canvas.width, canvas.height);
                Draw(draws[1]);
                Draw(draws[2]);
                Draw(draws[3]);
                Draw(draws[4]);
                Draw(draws[5]);
                Draw(draws[6]);
                Draw(draws[7]);
                Draw(draws[8]);
                Draw(draws[10]);
                break;
            case 2:
                Draw(draws[9]);
                console.log("Game Over");
                $("#letterDisplay")[0].style.opacity = "50%";
                break;
            default:
                console.log(`False Alarm: result=${result}`);
                break;
        }
    }

    // temporary way to set words in word bank
    $("#getWordBank").click(function(e){  })

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
        let index = checkLetter(letter.toLowerCase());
        if(index != -1) {
            for(let i = 0; i < index.length; i++) {
                drawLetter(letter.toUpperCase(), xCoords[index[i]]+5, 75);
                count++;
            }
        }
        if(count == word.length) {
            gameOver(1);
        }
    })
    $("#newWord").click(function(e) {
        console.log("Selecting New Word...");
        resetGame();
        findWord();
        drawLines(1);
    })
})
