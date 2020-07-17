/* Get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const volumeDisplay = player.querySelector('.volume');
const playbackDisplay = player.querySelector('.speed');
const fullscreenDisplay = player.querySelector('.fullscreen');

/* Build Our Functions */

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    if (this.name === 'volume') {
        volumeDisplay.textContent = `${this.value}`;
    }
    if (this.name === 'playbackRate') {
        playbackDisplay.textContent = `${this.value}x`;
    }
}

function handleProgess() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleFullscreen() {
    console.log('FULLSCREEN!');
    video.requestFullscreen();
}

/* Hook up event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgess);
toggle.addEventListener('click', togglePlay);
fullscreenDisplay.addEventListener('click', handleFullscreen);

// skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// volume and speed
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// scrub
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
