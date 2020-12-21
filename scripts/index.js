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

playerBtn.forEach((btn, index) => btn.addEventListener('click', () => {
    deactivationPlayer();
    temp.style.display = 'none';
    btn.classList.add('active');
    playerBlock[index].classList.add('active');
}));

radioPlayerInit();
videoPlayerInit();
musicPlayerInit();