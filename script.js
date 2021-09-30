'use strict'

// game

let play = false;
let autoPlay = false;
let blockCountdown = -1000;
let jumpCountdown = -1530;
let newGameJump = true;
let letGameJump = false;
let c = 0;

let timer;

const gameArea = document.querySelector('.game-area');
const character = document.querySelector('.character');
const gameAreaWidth = gameArea.offsetWidth;
const updateInterval = 40;
const minBlockWidth = 10;
const maxBlockWidth = 105;
const blockRoadWidth = gameAreaWidth + maxBlockWidth;
const counter = document.querySelector('.counter');
const gameOver = document.querySelector('.game-over');
const playBtn = document.querySelector('.play-btn');
const autoPlayBtn = document.querySelector('.auto-play-btn');
const jumpBtn = document.querySelector('.jump-btn');
const endScores = document.querySelector('.end-scores');

gameArea.addEventListener('click', () => {
    if (autoPlay === false) {
        gameJump();
    }
});

playBtn.addEventListener('click', () => {

    if (play === false) {

        clearInterval(timer);
        playGame();

        autoPlay = false;

        character.classList.remove('character-lost');
        gameOver.classList.add('game-over-hide');
        counter.textContent = '0';

        letGameJump = true;

        setTimeout(() => {
            play = true;
            letGameJump = true;
        }, 1000);

        playBtn.classList.add('play-btn-active');
        setTimeout(()=> {
            playBtn.classList.remove('play-btn-active');
            playBtn.classList.add('play-btn-hide');
            autoPlayBtn.classList.add('auto-play-btn-hide');
        },300);

    }

});

autoPlayBtn.addEventListener('click', () => {

    if (play === false) {

        if (autoPlay === false) {
            playGame();
        }

        character.classList.remove('character-lost');
        play = false;
        autoPlay = true;
        blockCountdown = -1000;
        jumpCountdown = -1530;
        counter.textContent = '0';
        c = 0;
    
        autoPlayBtn.classList.add('play-btn-active');
        setTimeout(()=> {
            autoPlayBtn.classList.remove('play-btn-active');
        },300);
    
        gameOver.classList.add('game-over-hide');
    }

});


document.documentElement.addEventListener("keydown", function(event) {
    if (event.keyCode === 38) {
      event.preventDefault();
      if (letGameJump) {
            gameJump();
        }
    }
  });

jumpBtn.addEventListener('click', () => {
    if (letGameJump) {
        gameJump();
    }
});



function playGame() {

    let newBlock;

    let checkDead = true;

    timer = setInterval(() => {

        if (play === false && autoPlay === false && newBlock) {
            newBlock.remove();
        } 

        if (play) {

            if (blockCountdown >= 0) {

                checkDead = true;

                newBlock = document.createElement('div');
                addBlock(newBlock);

                blockCountdown = -1000 + updateInterval;

                counter.textContent = `${c}`;
                c++;

            } else {
                blockCountdown += updateInterval;
            }

        }

        if (autoPlay) {

            if (blockCountdown >= 0) {

                checkDead = true;

                newBlock = document.createElement('div');
                addBlock(newBlock);

                blockCountdown = -1000 + updateInterval;

            } else {
                blockCountdown += updateInterval;
            }

            if (newBlock) {
                if (checkDead && character.offsetTop + character.offsetHeight >= newBlock.offsetTop && newBlock.offsetLeft <= character.offsetWidth && newBlock.offsetLeft >= -newBlock.offsetWidth) {
                    checkDead = false;
                    blockCountdown = 0;
                    jumpCountdown = -530;
                }
            }

            if (jumpCountdown >= 0) {
                if (blockCountdown >= -410) {
                    gameJump();
                }
            } else {
                jumpCountdown += updateInterval;
            }

        } else {

            if (newBlock && checkDead && character.offsetTop + character.offsetHeight >= newBlock.offsetTop && newBlock.offsetLeft <= character.offsetWidth && newBlock.offsetLeft >= -newBlock.offsetWidth) {
                
                checkDead = false;
                letGameJump = false;
                
                if (play == true) {
                    character.classList.add('character-lost');

                    playBtn.classList.remove('play-btn-hide');

                    autoPlayBtn.classList.remove('auto-play-btn-hide');

                    gameOver.classList.remove('game-over-hide');

                    endScores.textContent = `${c - 1}`;
                    c = 0;
                }
                play = false;
                clearInterval(timer);

            }

        }


    }, updateInterval);

}

function addBlock(block) {

    block.className = 'block block-move';
    block.style.width = `${randomInteger(minBlockWidth, maxBlockWidth)}px`;
    block.style.height = `${randomInteger(minBlockWidth, maxBlockWidth)}px`;

    gameArea.append(block);

    setTimeout(() => block.remove(), 1000);

}

function gameJump() {

    if (newGameJump) {
        newGameJump = false;
        character.classList.add('character-jump');

        jumpBtn.classList.add('jump-btn-active');
        setTimeout(()=> jumpBtn.classList.remove('jump-btn-active'),300);

        setTimeout(() => {
            newGameJump = true;
            character.classList.remove('character-jump')
        }, 700);
    }    

}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}





