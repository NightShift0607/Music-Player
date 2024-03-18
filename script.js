const music = document.querySelector("audio");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const image = document.querySelector("img");
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const currentTimeEl = document.querySelector("#current-time");
const durationEl = document.querySelector("#duration");
let isPlaying = false;

const songs = [
  {
    name: "Slim Shady",
    displayName: "The Real Slim Shady",
    artist: "Eminem",
  },
  {
    name: "Mockingbird",
    displayName: "Mockingbird",
    artist: "Eminem",
  },
  {
    name: "Stan",
    displayName: "Stan feat Dido",
    artist: "Eminem",
  },
  {
    name: "Superman",
    displayName: "Superman",
    artist: "Eminem",
  },
];

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song) {
  title.innerHTML = song.displayName;
  artist.innerHTML = song.artist;
  music.src = `./music/${song.name}.mp3`;
  image.src = `./img/${song.name}.jpg`;
}

let songIndex = 0;

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    durationSeconds =
      durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;
    if (durationSeconds) {
      durationEl.innerHTML = `${durationMinutes}:${durationSeconds}`;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    currentSeconds =
      currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
    currentTimeEl.innerHTML = `${currentMinutes}:${currentSeconds}`;
  }
}

function setprogressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    isPlaying ? pauseSong() : playSong();
  } else if (e.key === "ArrowRight") {
    nextSong();
  } else if (e.key === "ArrowLeft") {
    prevSong();
  }
});
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setprogressBar);
music.addEventListener("ended", nextSong);
