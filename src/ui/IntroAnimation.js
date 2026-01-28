export class IntroAnimation {
    constructor(introId, logoId, soundId, contentId) {
        this.introAnimation = document.getElementById(introId);
        this.introLogo = document.getElementById(logoId);
        this.introSound = document.getElementById(soundId);
        this.mainContent = document.getElementById(contentId);
        this.duration = 3500;
    }

    init() {
        const startScreen = document.getElementById('start-screen');

        const startSequence = () => {
            if (startScreen) startScreen.style.display = 'none';
            this.start();
        };

        if (startScreen) {
            startScreen.addEventListener('click', startSequence);
        } else {
            // Fallback if no start screen exists
            this.start();
        }
    }

    start() {
        this.introLogo.classList.add("reveal");
        this.introSound.play().catch(() => {
            // Autoplay blocked
        });

        setTimeout(() => {
            this.showMainContent();
            try {
                sessionStorage.setItem('introPlayed', 'true');
            } catch (e) {
                // Ignore
            }
        }, this.duration);
    }

    showMainContent() {
        this.introAnimation.classList.add("hidden");
        this.mainContent.style.display = "block";
        document.body.style.overflow = "auto";

        setTimeout(() => {
            this.introAnimation.style.display = 'none';
        }, 500);
    }
}
