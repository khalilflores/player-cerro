export class LoadingOverlay {
    constructor(overlayId, progressId) {
        this.overlay = document.getElementById(overlayId);
        this.progressBar = document.getElementById(progressId);
    }

    show() {
        this.overlay.classList.add("active");
        this.updateProgress(0);
    }

    hide() {
        // Pulse to 100% before hiding for better UX
        this.updateProgress(100);
        setTimeout(() => {
            this.overlay.classList.remove("active");
        }, 300);
    }

    updateProgress(percentage) {
        this.progressBar.style.width = `${percentage}%`;
    }

    incrementProgress(amount) {
        const current = parseFloat(this.progressBar.style.width) || 0;
        this.updateProgress(Math.min(current + amount, 100));
    }
}
