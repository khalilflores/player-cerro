import { songs } from './config/songs.js';
import { AudioPlayer } from './core/AudioPlayer.js';
import { LoadingOverlay } from './ui/LoadingOverlay.js';
import { IntroAnimation } from './ui/IntroAnimation.js';
import { PlayerUI } from './ui/PlayerUI.js';

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Initialize Core Services
    const audioPlayerElement = document.getElementById("audioPlayer");
    const audioPlayer = new AudioPlayer(audioPlayerElement);

    // 2. Initialize UI Components
    const loadingOverlay = new LoadingOverlay("loadingOverlay", "loadingProgress");
    const playerUI = new PlayerUI(audioPlayer, loadingOverlay);
    const introAnimation = new IntroAnimation("intro-animation", "intro-logo", "intro-sound", "main-content");

    // 3. Application State
    let currentSongIndex = 0;

    // 4. Initialization Logic
    introAnimation.init();

    // 5. Wiring Application Logic
    async function loadCurrentSong(autoPlay = false) {
        await playerUI.loadSong(songs[currentSongIndex]);
        if (autoPlay) {
            audioPlayer.play().catch(console.error);
        }
    }

    const nextSong = () => {
        const wasPlaying = audioPlayer.isPlaying() || playerUI.isAutoplayEnabled;
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadCurrentSong(wasPlaying);
    };

    const prevSong = () => {
        const wasPlaying = audioPlayer.isPlaying();
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadCurrentSong(wasPlaying);
    };

    // Bind navigation
    playerUI.setOnNextSong(nextSong);
    playerUI.setOnPrevSong(prevSong);

    // Load initial song
    loadCurrentSong(false);

    // PWA Install Prompt
    installPromptInit();
});

function installPromptInit() {
    let deferredInstallPrompt = null;
    const installButton = document.createElement('button');
    installButton.textContent = 'Install App';
    installButton.style.display = 'none';
    installButton.style.position = 'absolute';
    installButton.style.top = '10px';
    installButton.style.left = '10px';
    installButton.style.zIndex = '1000';
    document.body.appendChild(installButton);

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredInstallPrompt = e;
        installButton.style.display = 'block';

        installButton.addEventListener('click', () => {
            if (deferredInstallPrompt) {
                deferredInstallPrompt.prompt();
                deferredInstallPrompt.userChoice.then((choiceResult) => {
                    deferredInstallPrompt = null;
                    installButton.style.display = 'none';
                });
            }
        });
    });

    window.addEventListener('appinstalled', (event) => {
        // App installed
    });
}
