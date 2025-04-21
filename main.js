document.addEventListener("DOMContentLoaded", () => {
  const audioPlayer = document.getElementById("audioPlayer");
  const playButton = document.querySelector(".control-button.play");
  const prevButton = document.querySelector(".control-button.prev");
  const nextButton = document.querySelector(".control-button.next");
  const muteButton = document.querySelector(".control-button.mute");
  const songTitleElement = document.querySelector(".song-title span"); // Target the inner span
  const volumeControl = document.getElementById("volumeControl");
  const lyricsButton = document.getElementById("lyricsButton");
  const lyricsContainer = document.getElementById("lyricsContainer");
  const lyricsTextElement = document.getElementById("lyricsText"); // Get the lyrics text element
  const sceneImage = document.querySelector(".scene-container img"); // Get the image element

  const songs = [
    { title: "Que se Prenda el Cerro", artist: "Tao Tormenta & Hamura Beatsss", src: "assets/audio/Tao Tormenta  Hamura Beatsss  - Que se Prenda el Cerro.mp3", srt: "assets/audio/Tao Tormenta  Hamura Beatsss  - Que se Prenda el Cerro.srt", scene: "assets/scenes/cerro/cerro.gif" },
    { title: "Milagro de satan Teresa", artist: "Tao Tormenta & Ahau Talam feat. Martin Corona", src: "assets/audio/Tao Tormenta Ahau Talam -  Milagro de satan Teresa feat Martin Corona.mp3", srt: "assets/audio/Tao Tormenta Ahau Talam -  Milagro de satan Teresa feat Martin Corona.srt", scene: "assets/scenes/satan_teresa/satan_teresa.gif" },
    { title: "El Payaso Triste", artist: "Tao Tormenta feat. Hamura Beatsss", src: "assets/audio/Tao Tormenta feaat.  Hamura Beatsss - El Payaso Triste.mp3", srt: "assets/audio/Tao Tormenta feaat.  Hamura Beatsss - El Payaso Triste.srt", scene: "assets/scenes/payaso_triste/payaso_triste.gif" },
  ];
  let currentSongIndex = 0;
  let isMuted = false;
  let currentLyrics = []; // To store parsed lyrics for the current song
  let currentLyricIndex = -1; // To track the currently displayed lyric

  // --- SRT Parsing Function ---
  function parseSRT(srtContent) {
    const lines = srtContent.trim().split(/\r?\n\r?\n/);
    const lyrics = [];
    const timeFormat = /(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})/;

    lines.forEach(line => {
      const parts = line.split(/\r?\n/);
      if (parts.length >= 3) {
        const timeMatch = parts[1].match(timeFormat);
        if (timeMatch) {
          const startTime =
            parseInt(timeMatch[1]) * 3600 +
            parseInt(timeMatch[2]) * 60 +
            parseInt(timeMatch[3]) +
            parseInt(timeMatch[4]) / 1000;
          const endTime =
            parseInt(timeMatch[5]) * 3600 +
            parseInt(timeMatch[6]) * 60 +
            parseInt(timeMatch[7]) +
            parseInt(timeMatch[8]) / 1000;
          const text = parts.slice(2).join("\n").trim();
          lyrics.push({ startTime, endTime, text });
        }
      }
    });
    return lyrics;
  }

  // --- Load Song and Lyrics ---
  async function loadSong(songIndex) {
    const song = songs[songIndex];
    audioPlayer.src = song.src;
    songTitleElement.textContent = `${song.title} - ${song.artist}`;
    sceneImage.src = song.scene;
    sceneImage.alt = song.title;
    currentLyrics = []; // Reset lyrics
    currentLyricIndex = -1; // Reset lyric index
    lyricsTextElement.textContent = ""; // Clear lyrics display

    // Fetch and parse SRT file
    if (song.srt) {
      try {
        const response = await fetch(song.srt);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const srtContent = await response.text();
        currentLyrics = parseSRT(srtContent);
      } catch (error) {
        console.error("Error loading or parsing SRT file:", error);
        lyricsTextElement.textContent = "Lyrics not available.";
      }
    } else {
        lyricsTextElement.textContent = "Lyrics not available.";
    }

    // Reset play button icon
    if (audioPlayer.paused) {
      playButton.innerHTML = '<span class="pixelarticons pixelarticons--play"></span>';
    } else {
      // If it was playing, play the new song immediately
      audioPlayer.play().catch(e => console.error("Error playing audio:", e));
      playButton.innerHTML = '<span class="pixelarticons pixelarticons--pause"></span>';
    }

    // Set the correct icon based on the initial paused state
    if (audioPlayer.paused) {
        playButton.innerHTML = '<span class="pixelarticons pixelarticons--play"></span>';
    } else {
        playButton.innerHTML = '<span class="pixelarticons pixelarticons--pause"></span>';
    }
  }

  function playPauseSong() {
    if (audioPlayer.paused) {
      audioPlayer.play().catch(e => console.error("Error playing audio:", e));
      playButton.innerHTML = '<span class="pixelarticons pixelarticons--pause"></span>';
    } else {
      audioPlayer.pause();
      playButton.innerHTML = '<span class="pixelarticons pixelarticons--play"></span>';
    }

    // Ensure the icon reflects the *actual* state after the play/pause action
    if (audioPlayer.paused) {
        playButton.innerHTML = '<span class="pixelarticons pixelarticons--play"></span>';
    } else {
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
  volumeControl.addEventListener("input", () => {
    audioPlayer.volume = volumeControl.value;
    // Unmute if user adjusts volume while muted
    if (isMuted && audioPlayer.volume > 0) {
        toggleMute();
    }
  });

  lyricsButton.addEventListener("click", () => {
    lyricsContainer.style.display =
      lyricsContainer.style.display === "none" ? "flex" : "none";
  });

  // Load the initial song
  loadSong(currentSongIndex);

  // Update play/pause button when song ends
  audioPlayer.addEventListener('ended', () => {
    playButton.textContent = "▶️";
    // Optional: Automatically play next song
    // nextSong();
  });

  // Update play/pause button state if playback state changes externally
  audioPlayer.addEventListener('play', () => {
    playButton.innerHTML = '<span class="pixelarticons pixelarticons--pause"></span>';
  });
  audioPlayer.addEventListener("pause", () => {
    playButton.innerHTML = '<span class="pixelarticons pixelarticons--play"></span>';
  });

  // --- Lyrics Synchronization ---
  audioPlayer.addEventListener("timeupdate", () => {
    if (!currentLyrics.length) return; // No lyrics loaded

    const currentTime = audioPlayer.currentTime;
    let foundLyric = false;

    for (let i = 0; i < currentLyrics.length; i++) {
      const lyric = currentLyrics[i];
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
}); // End of DOMContentLoaded listener
