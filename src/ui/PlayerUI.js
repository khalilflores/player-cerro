import { AssetLoader } from '../infrastructure/AssetLoader.js';
import { LyricsParser } from '../core/LyricsParser.js';

export class PlayerUI {
    constructor(audioPlayer, loadingOverlay) {
        this.audioPlayer = audioPlayer;
        this.loadingOverlay = loadingOverlay;

        // Elements
        this.elements = {
            playButton: document.querySelector(".control-button.play"),
            prevButton: document.querySelector(".control-button.prev"),
            nextButton: document.querySelector(".control-button.next"),
            muteButton: document.querySelector(".control-button.mute"),
            songTitle: document.querySelector(".song-title span"),
            volumeControl: document.getElementById("volumeControl"),
            lyricsButton: document.getElementById("lyricsButton"),
            lyricsContainer: document.getElementById("lyricsContainer"),
            lyricsText: document.getElementById("lyricsText"),
            sceneImage: document.querySelector(".scene-container img"),
            body: document.body,
            alertIcon: document.getElementById("alertIcon"),
            albumInfo: document.getElementById("albumInfo"),
            closeAlbumInfo: document.getElementById("closeAlbumInfo"),
            autoplayToggle: document.getElementById("autoplayToggle")
        };

        // State
        this.currentLyrics = [];
        this.currentLyricIndex = -1;
        this.isAutoplayEnabled = false;
        this.autoplayListener = null;
        this.loadId = 0; // To track active load requests

        this.bindEvents();
    }

    bindEvents() {
        // Audio Controls
        this.elements.playButton.addEventListener("click", () => {
            if (this.audioPlayer.isPlaying()) {
                this.audioPlayer.pause();
            } else {
                this.audioPlayer.play().catch(console.error);
            }
        });

        this.elements.volumeControl.addEventListener("input", (e) => {
            this.audioPlayer.setVolume(e.target.value);
            if (this.audioPlayer.isMuted && this.audioPlayer.audio.volume > 0) {
                this.updateMuteIcon(false);
            }
        });

        this.elements.muteButton.addEventListener("click", () => {
            const isMuted = this.audioPlayer.toggleMute();
            this.updateMuteIcon(isMuted);
        });

        this.elements.lyricsButton.addEventListener("click", () => {
            this.toggleLyrics();
        });

        this.elements.alertIcon.addEventListener("click", () => this.toggleAlbumInfo());
        this.elements.closeAlbumInfo.addEventListener("click", () => this.toggleAlbumInfo(false));

        if (this.elements.autoplayToggle) {
            this.isAutoplayEnabled = this.elements.autoplayToggle.checked;
            this.elements.autoplayToggle.addEventListener('change', () => {
                this.isAutoplayEnabled = this.elements.autoplayToggle.checked;
                // Trigger next song if song ended and autoplay is now ON
                if (this.isAutoplayEnabled && this.audioPlayer.ended && this.autoplayListener) {
                    this.autoplayListener();
                }
            });
        }

        // Sync events
        this.audioPlayer.audio.addEventListener("timeupdate", () => this.syncLyrics());

        // Icon updates
        this.audioPlayer.audio.addEventListener("play", () => this.updatePlayIcon(true));
        this.audioPlayer.audio.addEventListener("pause", () => this.updatePlayIcon(false));

        // Auto-next (This needs to be wired to the main controller's next action)
        // Done via main.js passing a callback or event, or exposing an onEnded
    }

    setOnNextSong(callback) {
        this.elements.nextButton.addEventListener("click", callback);
        this.autoplayListener = callback;
        this.audioPlayer.audio.addEventListener("ended", () => {
            this.updatePlayIcon(false);
            if (this.isAutoplayEnabled) {
                callback();
            }
        });
    }

    setOnPrevSong(callback) {
        this.elements.prevButton.addEventListener("click", callback);
    }

    async loadSong(song) {
        this.loadId++; // Increment ID for new request
        const currentId = this.loadId;

        this.loadingOverlay.show();
        this.loadingOverlay.updateProgress(20);

        // Reset lyrics immediately to prevent stale lyrics display
        this.currentLyrics = [];
        this.currentLyricIndex = -1;
        this.elements.lyricsText.textContent = "";

        try {
            // Audio
            this.audioPlayer.src = song.src;
            this.elements.songTitle.textContent = `${song.title} - ${song.artist}`;
            this.elements.songTitle.style.animation = 'none';
            void this.elements.songTitle.offsetWidth; // Trigger reflow
            this.elements.songTitle.style.animation = 'scroll-text 15s linear infinite 1s';

            // Preload content
            const tasks = [];

            // Image
            tasks.push(AssetLoader.preloadImage(song.scene).then(() => {
                if (this.loadId === currentId) {
                    this.elements.sceneImage.src = song.scene;
                    this.elements.sceneImage.alt = song.title;
                    this.loadingOverlay.incrementProgress(40);
                }
            }));

            // Lyrics
            if (song.srt) {
                tasks.push(AssetLoader.loadText(song.srt)
                    .then(text => {
                        if (this.loadId === currentId) {
                            this.currentLyrics = LyricsParser.parseSRT(text);
                            this.loadingOverlay.incrementProgress(40);
                        }
                    })
                    .catch(err => {
                        if (this.loadId === currentId) {
                            console.error(err);
                            this.elements.lyricsText.textContent = "Lyrics not available.";
                            this.currentLyrics = [];
                            this.loadingOverlay.incrementProgress(40);
                        }
                    })
                );
            } else {
                if (this.loadId === currentId) {
                    this.elements.lyricsText.textContent = "Lyrics not available.";
                    this.currentLyrics = [];
                    this.loadingOverlay.incrementProgress(40);
                }
            }

            this.elements.body.style.backgroundImage = song.background;

            // Initial reset (okay to do here as it's sync with start of load)
            this.currentLyricIndex = -1;
            this.elements.lyricsText.textContent = "";

            await Promise.all(tasks);

            if (this.loadId === currentId) {
                this.loadingOverlay.hide();
                this.updatePlayIcon(false); // Reset to play icon (stopped)
            }

        } catch (err) {
            console.error("Error loading song", err);
            if (this.loadId === currentId) {
                this.loadingOverlay.hide();
            }
        }
    }

    updatePlayIcon(isPlaying) {
        const icon = isPlaying ? 'pause' : 'play';
        this.elements.playButton.innerHTML = `<span class="pixelarticons pixelarticons--${icon}"></span>`;
    }

    updateMuteIcon(isMuted) {
        const icon = isMuted ? 'volume-x' : 'volume-3';
        this.elements.muteButton.innerHTML = `<span class="pixelarticons pixelarticons--${icon}"></span>`;
    }

    toggleLyrics() {
        const display = this.elements.lyricsContainer.style.display;
        this.elements.lyricsContainer.style.display = (display === "none" || display === "") ? "flex" : "none";
    }

    toggleAlbumInfo(show) {
        if (show === undefined) {
            show = this.elements.albumInfo.style.display === "none";
        }
        this.elements.albumInfo.style.display = show ? "block" : "none";
    }

    syncLyrics() {
        if (!this.currentLyrics.length) return;

        const time = this.audioPlayer.currentTime;
        let found = false;

        for (let i = 0; i < this.currentLyrics.length; i++) {
            const lyric = this.currentLyrics[i];
            if (time >= lyric.startTime && time <= lyric.endTime) {
                if (i !== this.currentLyricIndex) {
                    this.elements.lyricsText.textContent = lyric.text;
                    this.currentLyricIndex = i;
                }
                found = true;
                break;
            }
        }

        if (!found && this.currentLyricIndex !== -1) {
            this.elements.lyricsText.textContent = "";
            this.currentLyricIndex = -1;
        }
    }
}
