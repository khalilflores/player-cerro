document.addEventListener("DOMContentLoaded", () => {
  // --- Intro Animation Elements ---
  const introAnimation = document.getElementById("intro-animation");
  const introLogo = document.getElementById("intro-logo");
  const introSound = document.getElementById("intro-sound");
  const mainContent = document.getElementById("main-content");

  // --- Player Elements ---
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
  const alertIcon = document.getElementById("alertIcon"); // Get the alert icon
  const albumInfo = document.getElementById("albumInfo"); // Get the album info popup
  const closeAlbumInfo = document.getElementById("closeAlbumInfo"); // Get the close button for album info
  const bodyElement = document.body; // Get the body element

  const songs = [
    { title: "Que se Prenda el Cerro", artist: "Tao Tormenta & Hamura Beatsss", src: "assets/audio/Tao Tormenta  Hamura Beatsss  - Que se Prenda el Cerro.mp3", srt: "assets/audio/Tao Tormenta  Hamura Beatsss  - Que se Prenda el Cerro.srt", scene: "assets/scenes/cerro/cerro.gif", background: 'url("data:image/svg+xml,<svg id=\'patternId\' width=\'100%\' height=\'100%\' xmlns=\'http://www.w3.org/2000/svg\'><defs><pattern id=\'a\' patternUnits=\'userSpaceOnUse\' width=\'96\' height=\'144\' patternTransform=\'scale(2) rotate(0)\'><rect x=\'0\' y=\'0\' width=\'100%\' height=\'100%\' fill=\'%2336422cff\'/><path d=\'M0 0v4h4v4h4V4h4V0H0zm20 0v4h-4v4h-4v4H8v4H4v-4H0v12h4v4h4v-4h4v-4h4v-4h4v-4h4V8h4V4h4V0H20zm20 0v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4H8v4H4v-4H0v12h4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h-4v4h-4v4h-4v4h-4v4h-4v4H8v4H4v4H0v12h4v-4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h12v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4V8h4V4h4V0H40zm16 0v4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h4V28h-4v-4h-4v-4h-4v-4h-4v-4h-4V8h-4V4h-4V0H56zm20 0v4h4v4h4v4h4v4h4v4h4V8h-4V4h-4V0H76zM52 8v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-8h-4v-4h-4v-4h-4v-4h-4v4h-4v4h-4v4h-4v4h4v4h4v-4h4v-4h4v8h-4v4h-4v4h-4v-4h-4v-4h-4v-4h-4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v4h4v4h4v4h4v4h4v4h4v8h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v8h-4v4h-4v4h-4v4h-4v4h-4v4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h4v-4h4v-4h4v-4h4v4h4v4h4v8h-4v-4h-4v-4h-4v4h-4v4h4v4h4v4h4v4h4v-4h4v-4h4v-4h4v-8h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h-4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-8h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4V8h-4zm40 40v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h4v4h4v4h4v4h4v4h4v4h4v4h4V88h-4v-4h-4v-4h-4v-4h-4v-4h4v-4h4v-4h4v-4h4V48h-4zM0 52v4h4v-4H0zm4 8v4H0v12h4v-4h8v4H8v4H4v4H0v12h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h-4v-4h-4v-4h-4v-4H4zm88 8v4h-4v4h4v4h4V68h-4zm0 40v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h12v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-12h-4zM4 120v4H0v12h4v-4h4v4h4v4h4v4h12v-4h-4v-4h-4v-4h-4v-4h-4v-4H8v-4H4zm88 8v4h-4v4h-4v4h-4v4h12v-4h4v-12h-4zM4 140v4h4v-4H4z\'  stroke-width=\'1\' stroke=\'none\' fill=\'%23e6d6a1ff\'/></pattern></defs><rect width=\'800%\' height=\'800%\' transform=\'translate(0,0)\' fill=\'url(%23a)\'/></svg>")' },
    { title: "Milagro de Satan Teresa", artist: "Tao Tormenta & Hamura Beatsss feat. Martin Corona", src: "assets/audio/Tao Tormenta Hamura Beatsss -  Milagro de Satan Teresa feat Martin Corona.mp3", srt: "assets/audio/Tao Tormenta Hamura Beatsss -  Milagro de Satan Teresa feat Martin Corona.srt", scene: "assets/scenes/satan_teresa/satan_teresa.gif", background: 'url("data:image/svg+xml,<svg id=\'patternId\' width=\'100%\' height=\'100%\' xmlns=\'http://www.w3.org/2000/svg\'><defs><pattern id=\'a\' patternUnits=\'userSpaceOnUse\' width=\'48\' height=\'96\' patternTransform=\'scale(2) rotate(0)\'><rect x=\'0\' y=\'0\' width=\'100%\' height=\'100%\' fill=\'%2337432dff\'/><path d=\'M0 0v8h4v4h4v4h4v4h4v-4h4v-4h4V8h4V4h4V0H0zm40 0v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4H4v-4H0v8h4v4h4v4h4v4h36v-8h-4v-4h-4v-4h-4v-4h-4v4h-4v4h-4v4h-4v4h-4v-4h-4v-4h4v-4h4v-4h4v-4h4v-4h8v4h4v4h4v4h4v-8h-4v-4h-4v-4h-4v-4h4V8h4V4h4V0h-8zM8 4h12v4h-4v4h-4V8H8V4zm24 32h4v4h4v4H28v-4h4v-4zM0 44v4h4v-4H0zm0 8v12h4v4h8v-4h4v-4h4v-4h4v-4H0zm40 0v4h4v4h4v-8h-8zM4 56h8v4H4v-4zm24 4v8h8v-8h-8zm8 8v4h8v-4h-8zm8 4v4h4v-4h-4zm-16-4h-8v4h8v-4zm-8 4h-8v4h8v-4zm-8 4H4v8h8v-8zm-8 0v-4H0v4h4zm24 0v4h-4v4h-4v4h-4v4h32v-4h-4v-4h-4v-4h-4v-4h-8zm0 8h8v4h-8v-4z\'  stroke-width=\'1\' stroke=\'none\' fill=\'%23e6d6a2ff\'/></pattern></defs><rect width=\'800%\' height=\'800%\' transform=\'translate(0,0)\' fill=\'url(%23a)\'/></svg>")' },
    { title: "El Payaso Triste", artist: "Tao Tormenta feat. Hamura Beatsss", src: "assets/audio/Tao Tormenta feat.  Hamura Beatsss - El Payaso Triste.mp3", srt: "assets/audio/Tao Tormenta feat.  Hamura Beatsss - El Payaso Triste.srt", scene: "assets/scenes/payaso_triste/payaso_triste.gif", background: 'url("data:image/svg+xml,<svg id=\'patternId\' width=\'100%\' height=\'100%\' xmlns=\'http://www.w3.org/2000/svg\'><defs><pattern id=\'a\' patternUnits=\'userSpaceOnUse\' width=\'48\' height=\'96\' patternTransform=\'scale(2) rotate(0)\'><rect x=\'0\' y=\'0\' width=\'100%\' height=\'100%\' fill=\'%2337432dff\'/><path d=\'M4 0v4H0v8h4V8h4V4h4V0zm16 0v4h-4v4h-4v4H8v4H4v8H0v16h4v8h4v4h4v4h4v4h4v4h4v-4h4v-4h4v-4h4v-4h4v-8h4v-4h4v-8h-4v-4h-4v-8h-4v-4h-4V8h-4V4h-4V0zm12 0v4h4v4h4v4h4v4h4V8h-4V4h-4V0zM20 12h4v4h4v4h4v24h-4v4h-4v4h-4v-4h-4v-4h-4V20h4v-4h4zm0 8v4h-4v16h4v4h4v-4h4V24h-4v-4zm24 28v4h-4v4h-4v4h-4v4h-4v8h-4v4h-4v-4h-4v-8h-4v-4H8v-4H4v-4H0v12h4v4h4v24H4v4h12v-8h4v-4h4v4h4v8h12v-4h-4V68h4v-4h4v-4h4V48zm0 20v4h-4v16h4v4h4V68zM0 72v16h4V72z\'  stroke-width=\'1\' stroke=\'none\' fill=\'%23e6d6a2ff\'/></pattern></defs><rect width=\'800%\' height=\'800%\' transform=\'translate(0,0)\' fill=\'url(%23a)\'/></svg>")' },
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
    bodyElement.style.backgroundImage = song.background; // Set body background
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

  // --- Album Info Popup Logic ---
  alertIcon.addEventListener("click", () => {
    albumInfo.style.display = "block";
  });

  closeAlbumInfo.addEventListener("click", () => {
    albumInfo.style.display = "none";
  });

  // --- Intro Animation Logic ---
  const introDuration = 3500; // 3.5 seconds

  function showMainContent() {
    introAnimation.classList.add("hidden");
    mainContent.style.display = "block"; // Or 'flex' if needed, check CSS
    document.body.style.overflow = "auto"; // Restore body scroll

    // Ensure intro is fully hidden before removing from DOM flow (optional)
    setTimeout(() => {
        introAnimation.style.display = 'none';
    }, 500); // Match CSS transition duration
  }

  function startIntro() {
    // Reveal logo (triggers CSS animation)
    introLogo.classList.add("reveal");

    // Attempt to play intro sound
    introSound.play().catch(error => {
      console.warn("Intro sound autoplay failed:", error);
      // Autoplay might be blocked, sound won't play without user interaction.
    });

    // Set timeout to hide intro and show main content
    setTimeout(() => {
      showMainContent();
      // Mark intro as played for this session
      try {
        sessionStorage.setItem('introPlayed', 'true');
      } catch (e) {
        console.warn("SessionStorage not available:", e);
      }
    }, introDuration);
  }

  // --- Check if intro should play ---
  try {
    if (sessionStorage.getItem('introPlayed')) {
      // Intro already played this session, skip it
      showMainContent();
    } else {
      // First visit this session, play intro
      startIntro();
    }
  } catch (e) {
    // SessionStorage might be disabled or unavailable (e.g., private browsing)
    console.warn("SessionStorage check failed, playing intro by default:", e);
    startIntro(); // Play intro if sessionStorage check fails
  }

}); // End of DOMContentLoaded listener
