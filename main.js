// --- Configuration ---
const songs = [
    {
        title: "Milagro de satan Teresa feat Martin Corona",
        artist: "Tao Tormenta Ahau Talam",
        src: "assets/audio/Tao Tormenta Ahau Talam -  Milagro de satan Teresa feat Martin Corona.mp3",
        scene: "assets/scenes/satan_teresa/",
        sceneGif: "satan_teresa.gif"
    },
    {
        title: "El Payaso Triste",
        artist: "Tao Tormenta feaat. Hamura Beatsss",
        src: "assets/audio/Tao Tormenta feaat.  Hamura Beatsss - El Payaso Triste.mp3",
        scene: "assets/scenes/payaso_triste/",
        sceneGif: "payaso_triste.gif"
    },
    {
        title: "Que se Prenda el Cerro",
        artist: "Tao Tormenta  Hamura Beatsss",
        src: "assets/audio/Tao Tormenta  Hamura Beatsss  - Que se Prenda el Cerro.mp3",
        scene: "assets/scenes/cerro/",
        sceneGif: "cerro.gif"
    }
];

// --- DOM Elements ---
const playerContainer = document.querySelector('.player-container');
const crtScreen = document.querySelector('.crt-screen');
const sceneContainer = document.querySelector('.scene-container');
const songTitleElement = document.querySelector('.song-title');
const playButton = document.querySelector('.play');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const muteButton = document.querySelector('.mute');

// --- State ---
let currentSongIndex = 0;
let audio = new Audio();
let isPlaying = false;
let isMuted = false;

// --- Functions ---
function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitleElement.textContent = `${song.title} - ${song.artist}`;
    // Clear existing scene
    sceneContainer.innerHTML = '';
    // Create and append the scene image
    const img = document.createElement('img');
    img.src = song.scene + song.sceneGif;
    img.alt = song.title;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    sceneContainer.appendChild(img);
}

function playSong() {
    audio.play();
    isPlaying = true;
    playButton.textContent = '⏸️'; // Pause icon
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playButton.textContent = '▶️'; // Play icon
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function toggleMute() {
    isMuted = !isMuted;
    audio.muted = isMuted;
    muteButton.textContent = isMuted ? '🔊' : '🔇';
}

// --- Event Listeners ---
playButton.addEventListener('click', togglePlay);
nextButton.addEventListener('click', playNextSong);
prevButton.addEventListener('click', playPrevSong);
muteButton.addEventListener('click', toggleMute);

// --- Initialization ---
loadSong(currentSongIndex);
