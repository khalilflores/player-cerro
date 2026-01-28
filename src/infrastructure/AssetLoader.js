export class AssetLoader {
    static preloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
        });
    }

    static preloadVideo(url) {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.src = url;
            video.onloadeddata = () => resolve(video);
            video.onerror = (err) => reject(err);
            video.load(); // Start loading
        });
    }

    static async loadText(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    }
}
