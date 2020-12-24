import { radioPlayerInit } from './radioplayer.js';
import { videoPlayerInit } from './videoplayer.js';
import { musicPlayerInit } from './musicplayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivationPlayer = () => {
    playerBtn.forEach(btn => btn.classList.remove('active'));
    playerBlock.forEach(block => block.classList.remove('active'));
}

const [video, music, radio] = [videoPlayerInit(), musicPlayerInit(), radioPlayerInit()]
playerBtn.forEach((btn, index) => btn.addEventListener('click', e => {
    deactivationPlayer();
    if(e.target.classList[1] === 'player-video'){
        radio();
        music();
    }else if(e.target.classList[1] === 'player-audio'){
        radio()
        video()
    }else{
        music()
        video()
    }
    temp.style.display = 'none';
    btn.classList.add('active');
    playerBlock[index].classList.add('active');
}));


