import { addZero } from "./supscript.js";

export const musicPlayerInit = () => {
  const audio = document.querySelector(".audio");
  const audioImg = document.querySelector(".audio-img");
  const audioHeader = document.querySelector(".audio-header");
  const audioPlayer = document.querySelector(".audio-player");
  const audioNavigation = document.querySelector(".audio-navigation");
  const audioButtonPlay = document.querySelector(".audio-button__play");
  const audioProgress = document.querySelector(".audio-progress");
  const audioProgressTiming = document.querySelector(".audio-progress__timing");
  const audioTimePassed = document.querySelector(".audio-time__passed");
  const audioTimeTotal = document.querySelector(".audio-time__total");

  const playlist = ["hello", "flow", "speed"];

  let trackIndex = 0;
  const reset = () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    toggleIcon();
    trackIndex = 0;
    audioProgressTiming.style.width = "0";
    setImg();
  };
  const toggleIcon = () => {
    if(audioPlayer.paused) {
      audio.classList.remove("play");
      audioButtonPlay.classList.add("fa-play");
      audioButtonPlay.classList.remove("fa-pause");
    }else{
      audio.classList.add("play");
      audioButtonPlay.classList.remove("fa-play");
      audioButtonPlay.classList.add("fa-pause");
    }
  };
  const setImg = () => {
    audioPlayer.src = `./audio/${playlist[trackIndex]}.mp3`;
    audioImg.src = `./audio/${playlist[trackIndex]}.jpg`;
  };
  const loadTrack = () => {
    setImg();
    audioHeader.textContent = playlist[trackIndex].toUpperCase();
    (audioPlayer.paused && audioPlayer.play()) || audioPlayer.pause();
  };
  const nextTrack = () => {
    trackIndex = trackIndex === playlist.length - 1 ? 0 : ++trackIndex;
    loadTrack();
  };
  const prevTrack = () => {
    trackIndex = trackIndex !== 0 ? --trackIndex : playlist.length - 1;
    loadTrack();
  };
  audioNavigation.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("audio-button__play")) {
      (audioPlayer.paused && audioPlayer.play()) || audioPlayer.pause();
      toggleIcon();
      audioHeader.textContent = playlist[trackIndex].toUpperCase();
    } else if (target.classList.contains("audio-button__prev")) {
      prevTrack();
    } else if (target.classList.contains("audio-button__next")) {
      nextTrack();
    }
  });

  audioPlayer.addEventListener("ended", () => {
    nextTrack();
    audioPlayer.play();
  });

  audioPlayer.addEventListener("timeupdate", () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = progress + "%";

    const minutesPassed = Math.floor(currentTime / 60) || "0";
    const secondsPassed = Math.floor(currentTime % 60) || "0";

    const minutesTotal = Math.floor(duration / 60) || "0";
    const secondsTotal = Math.floor(duration % 60) || "0";

    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(
      secondsPassed
    )}`;
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(
      secondsTotal
    )}`;
  });

  audioProgress.addEventListener("click", (event) => {
    const coordX = event.offsetX;
    const allWidth = audioProgress.clientWidth;
    audioPlayer.currentTime = (coordX / allWidth) * audioPlayer.duration;
  });
  return reset;
};
