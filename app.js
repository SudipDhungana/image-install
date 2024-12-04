const video = document.getElementById('video');
const playPauseBtn = document.getElementById('play-pause');
const fullscreenBtn = document.getElementById('fullscreen');
const currentTimeText = document.getElementById('current-time');
const progressBar = document.getElementById('progress-bar');
const videoURLInput = document.getElementById('videoURL');
let isPlaying = false;


let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('video', {
    events: {
      'onStateChange': onPlayerStateChange,
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    isPlaying = true;
  } else if (event.data === YT.PlayerState.PAUSED) {
    isPlaying = false;
  }
}

playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
  isPlaying = !isPlaying;
});

fullscreenBtn.addEventListener('click', () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  }
});


setInterval(() => {
  if (player && isPlaying) {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    const percent = (currentTime / duration) * 100;
    
   
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    currentTimeText.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

   
    progressBar.style.width = `${percent}%`;
  }
}, 1000);


videoURLInput.addEventListener('input', () => {
const url = videoURLInput.value.trim();
const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=))([\w-]{11})/);

if (videoIdMatch && videoIdMatch[1]) {
player.loadVideoById(videoIdMatch[1]);
isPlaying = true;
} else if (url.length === 0) {
player.stopVideo();
isPlaying = false;
}
});



const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);