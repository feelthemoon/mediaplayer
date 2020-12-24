export const radioPlayerInit = () => {
  const radio = document.querySelector(".radio");
  const radioCover = document.querySelector(".radio-cover__img");
  const radioHeader = document.querySelector(".radio-header__big");
  const radioNavigation = document.querySelector(".radio-navigation");
  const radioItem = document.querySelectorAll(".radio-item");
  const radioStop = document.querySelector(".radio-stop");
  const radioVolumeRange = document.querySelector(".radio__volume-range");
  const audio = new Audio();
  audio.type = "audio/aac";
  audio.volume = radioVolumeRange.value / 100;
  radioStop.disabled = true;

  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove("play");
      radioStop.classList.add("fa-play");
      radioStop.classList.remove("fa-stop");
    } else {
      radio.classList.add("play");
      radioStop.classList.add("fa-stop");
      radioStop.classList.remove("fa-play");
    }
  };
  const selectItem = (elem) => {
    radioItem.forEach((item) =>
      item === elem
        ? item.classList.add("select")
        : item.classList.remove("select")
    );
  };
  radioNavigation.addEventListener("change", (event) => {
    const target = event.target;
    const parrent = target.closest(".radio-item");
    selectItem(parrent);
    radioHeader.textContent = parrent.querySelector(".radio-name").textContent;
    radioCover.src = parrent.querySelector('.radio-img').src;
    radioStop.disabled = false;
    audio.src = target.dataset.radioStantion.toString();
    audio
      .play()
      .then((_) => {})
      .catch((e) => console.log(e));
    changeIconPlay();
  });
  radioStop.addEventListener("click", () => {
    (audio.paused && audio.play()) || audio.pause();
    changeIconPlay();
  });
  radioVolumeRange.addEventListener('input', ()=>{
    audio.volume = radioVolumeRange.value / 100;
  })
};
