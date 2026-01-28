export class AudioPlayer {
    constructor(audioElement) {
        this.audio = audioElement;
        this.isMuted = false;
    }

    play() {
        return this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.audio.muted = this.isMuted;
        return this.isMuted;
    }

    setVolume(volume) {
        this.audio.volume = volume;
        // Unmute if volume is adjusted while muted
        if (this.isMuted && volume > 0) {
            this.toggleMute();
        }
    }

    isPlaying() {
        return !this.audio.paused;
    }

    hasStarted() {
        return this.audio.currentTime > 0;
    }

    get currentTime() {
        return this.audio.currentTime;
    }

    get ended() {
        return this.audio.ended;
    }

    set src(url) {
        this.audio.src = url;
    }
}
