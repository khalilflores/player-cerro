var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener("DOMContentLoaded", function () {
    var audioPlayer = document.getElementById("audioPlayer");
    var playButton = document.querySelector(".control-button.play");
    var prevButton = document.querySelector(".control-button.prev");
    var nextButton = document.querySelector(".control-button.next");
    var muteButton = document.querySelector(".control-button.mute");
    var songTitleElement = document.querySelector(".song-title span"); // Target the inner span
    var volumeControl = document.getElementById("volumeControl");
    var lyricsButton = document.getElementById("lyricsButton");
    var lyricsContainer = document.getElementById("lyricsContainer");
    var lyricsTextElement = document.getElementById("lyricsText"); // Get the lyrics text element
    var sceneImage = document.querySelector(".scene-container img"); // Get the image element
    var alertIcon = document.getElementById("alertIcon"); // Get the alert icon
    var albumInfo = document.getElementById("albumInfo"); // Get the album info popup
    var closeAlbumInfo = document.getElementById("closeAlbumInfo"); // Get the close button for album info
    var songs = [
        { title: "Que se Prenda el Cerro", artist: "Tao Tormenta & Hamura Beatsss", src: "assets/audio/Tao Tormenta  Hamura Beatsss  - Que se Prenda el Cerro.mp3", srt: "assets/audio/Tao Tormenta  Hamura Beatsss  - Que se Prenda el Cerro.srt", scene: "assets/scenes/cerro/cerro.gif" },
        { title: "Milagro de Satan Teresa", artist: "Tao Tormenta & Hamura Beatsss feat. Martin Corona", src: "assets/audio/Tao Tormenta Hamura Beatsss -  Milagro de Satan Teresa feat Martin Corona.mp3", srt: "assets/audio/Tao Tormenta Hamura Beatsss -  Milagro de Satan Teresa feat Martin Corona.srt", scene: "assets/scenes/satan_teresa/satan_teresa.gif" },
        { title: "El Payaso Triste", artist: "Tao Tormenta feat. Hamura Beatsss", src: "assets/audio/Tao Tormenta feat.  Hamura Beatsss - El Payaso Triste.mp3", srt: "assets/audio/Tao Tormenta feat.  Hamura Beatsss - El Payaso Triste.srt", scene: "assets/scenes/payaso_triste/payaso_triste.gif" },
    ];
    var currentSongIndex = 0;
    var isMuted = false;
    var currentLyrics = []; // To store parsed lyrics for the current song
    var currentLyricIndex = -1; // To track the currently displayed lyric
    // --- SRT Parsing Function ---
    function parseSRT(srtContent) {
        var lines = srtContent.trim().split(/\r?\n\r?\n/);
        var lyrics = [];
        var timeFormat = /(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})/;
        lines.forEach(function (line) {
            var parts = line.split(/\r?\n/);
            if (parts.length >= 3) {
                var timeMatch = parts[1].match(timeFormat);
                if (timeMatch) {
                    var startTime = parseInt(timeMatch[1]) * 3600 +
                        parseInt(timeMatch[2]) * 60 +
                        parseInt(timeMatch[3]) +
                        parseInt(timeMatch[4]) / 1000;
                    var endTime = parseInt(timeMatch[5]) * 3600 +
                        parseInt(timeMatch[6]) * 60 +
                        parseInt(timeMatch[7]) +
                        parseInt(timeMatch[8]) / 1000;
                    var text = parts.slice(2).join("\n").trim();
                    lyrics.push({ startTime: startTime, endTime: endTime, text: text });
                }
            }
        });
        return lyrics;
    }
    // --- Load Song and Lyrics ---
    function loadSong(songIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var song, response, srtContent, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        song = songs[songIndex];
                        audioPlayer.src = song.src;
                        songTitleElement.textContent = "".concat(song.title, " - ").concat(song.artist);
                        sceneImage.src = song.scene;
                        sceneImage.alt = song.title;
                        currentLyrics = []; // Reset lyrics
                        currentLyricIndex = -1; // Reset lyric index
                        lyricsTextElement.textContent = ""; // Clear lyrics display
                        if (!song.srt) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(song.srt)];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("HTTP error! status: ".concat(response.status));
                        }
                        return [4 /*yield*/, response.text()];
                    case 3:
                        srtContent = _a.sent();
                        currentLyrics = parseSRT(srtContent);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error loading or parsing SRT file:", error_1);
                        lyricsTextElement.textContent = "Lyrics not available.";
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        lyricsTextElement.textContent = "Lyrics not available.";
                        _a.label = 7;
                    case 7:
                        // Reset play button icon
                        if (audioPlayer.paused) {
                            playButton.innerHTML = '<span class="pixelarticons pixelarticons--play"></span>';
                        }
                        else {
                            // If it was playing, play the new song immediately
                            audioPlayer.play().catch(function (e) { return console.error("Error playing audio:", e); });
                            playButton.innerHTML = '<span class="pixelarticons pixelarticons--pause"></span>';
                        }
                        // Set the correct icon based on the initial paused state
                        if (audioPlayer.paused) {
                            playButton.innerHTML = '<span class="pixelarticons pixelarticons--play"></span>';
                        }
                        else {
                            playButton.innerHTML = '<span class="pixelarticons pixelarticons--pause"></span>';
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    function playPauseSong() {
        if (audioPlayer.paused) {
            audioPlayer.play().catch(function (e) { return console.error("Error playing audio:", e); });
            playButton.innerHTML = '<span class="pixelarticons pixelarticons--pause"></span>';
        }
        else {
            audioPlayer.pause();
            playButton.innerHTML = '<span class="pixelarticons pixelarticons--play"></span>';
        }
        // Ensure the icon reflects the *actual* state after the play/pause action
        if (audioPlayer.paused) {
            playButton.innerHTML = '<span class="pixelarticons pixelarticons--play"></span>';
        }
        else {
            playButton.innerHTML = '<span class="pixelarticons pixelarticons--pause"></span>';
        }
    }
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
    }
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
    }
    function toggleMute() {
        isMuted = !isMuted;
        audioPlayer.muted = isMuted;
        muteButton.innerHTML = isMuted ? '<span class="pixelarticons pixelarticons--volume-x"></span>' : '<span class="pixelarticons pixelarticons--volume-3"></span>';
    }
    // Event Listeners for Audio Controls
    playButton.addEventListener("click", playPauseSong);
    nextButton.addEventListener("click", nextSong);
    prevButton.addEventListener("click", prevSong);
    muteButton.addEventListener("click", toggleMute);
    // Keep existing Volume and Lyrics logic
    volumeControl.addEventListener("input", function () {
        audioPlayer.volume = volumeControl.value;
        // Unmute if user adjusts volume while muted
        if (isMuted && audioPlayer.volume > 0) {
            toggleMute();
        }
    });
    lyricsButton.addEventListener("click", function () {
        lyricsContainer.style.display =
            lyricsContainer.style.display === "none" ? "flex" : "none";
    });
    // Load the initial song
    loadSong(currentSongIndex);
    // Update play/pause button when song ends
    audioPlayer.addEventListener('ended', function () {
        playButton.textContent = "▶️";
        // Optional: Automatically play next song
        // nextSong();
    });
    // Update play/pause button state if playback state changes externally
    audioPlayer.addEventListener('play', function () {
        playButton.innerHTML = '<span class="pixelarticons pixelarticons--pause"></span>';
    });
    audioPlayer.addEventListener("pause", function () {
        playButton.innerHTML = '<span class="pixelarticons pixelarticons--play"></span>';
    });
    // --- Lyrics Synchronization ---
    audioPlayer.addEventListener("timeupdate", function () {
        if (!currentLyrics.length)
            return; // No lyrics loaded
        var currentTime = audioPlayer.currentTime;
        var foundLyric = false;
        for (var i = 0; i < currentLyrics.length; i++) {
            var lyric = currentLyrics[i];
            if (currentTime >= lyric.startTime && currentTime <= lyric.endTime) {
                if (i !== currentLyricIndex) {
                    lyricsTextElement.textContent = lyric.text;
                    lyricsTextElement.textContent = lyric.text;
                    currentLyricIndex = i;
                    console.log("Lyric updated:", lyric.text); // Add this line
                }
                foundLyric = true;
                break; // Found the current lyric, exit loop
            }
        }
        // If no lyric matches the current time (e.g., silence), clear the display
        // only if a lyric was previously displayed
        if (!foundLyric && currentLyricIndex !== -1) {
            lyricsTextElement.textContent = "";
            currentLyricIndex = -1; // Reset index since nothing is displayed
        }
    });
    // --- Album Info Popup Logic ---
    alertIcon.addEventListener("click", function () {
        albumInfo.style.display = "block";
    });
    closeAlbumInfo.addEventListener("click", function () {
        albumInfo.style.display = "none";
    });
}); // End of DOMContentLoaded listener
