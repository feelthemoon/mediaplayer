import { addZero } from "./supscript.js";

export const videoPlayerInit = () => {
  /**
   * Получаем DOM элементы для видео-плеера
   */
  const videoPlayer = document.querySelector(".video-player");
  const videoButtonPlay = document.querySelector(".video-button__play");
  const videoButtonStop = document.querySelector(".video-button__stop");
  const videoProgress = document.querySelector(".video-progress");
  const videoTimePassed = document.querySelector(".video-time__passed");
  const videoTimeTotal = document.querySelector(".video-time__total");

  /**
   * Функция для смены иконок кнопки play
   */
  const reset = () => {
    stopPlay();
    toggleIcon();
  };
  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.add("fa-play");
      videoButtonPlay.classList.remove("fa-pause");
    } else {
      videoButtonPlay.classList.remove("fa-play");
      videoButtonPlay.classList.add("fa-pause");
    }
  };

  const togglePlay = () => {
    (videoPlayer.paused && videoPlayer.play()) || videoPlayer.pause();
  };
  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };
  /**
   * Для минут и секунд добавляем 0 в начало, если они меньше 10
   */

  videoPlayer.addEventListener("click", togglePlay);
  videoButtonPlay.addEventListener("click", togglePlay);
  videoPlayer.addEventListener("play", toggleIcon);
  videoPlayer.addEventListener("pause", toggleIcon);
  videoButtonStop.addEventListener("click", stopPlay);

  /**
   *
   * Обработчик события timeupdate, устанавливающий текущее время видео, все время и показываюший прогресс
   */
  videoPlayer.addEventListener("timeupdate", () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;
    const minutePassed = Math.floor(currentTime / 60);
    const secondsPassed = Math.floor(currentTime % 60);
    const minuteTotal = Math.floor(duration / 60);
    const secondsTotal = Math.floor(duration % 60);

    videoProgress.value = (currentTime / duration) * 100;
    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(
      secondsPassed
    )}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(
      secondsTotal
    )}`;
  });

  /**
   * Обработчик прогресса
   */
  videoProgress.addEventListener("input", () => {
    videoPlayer.currentTime =
      (videoProgress.value * videoPlayer.duration) / 100;
  });
  return reset;
};
