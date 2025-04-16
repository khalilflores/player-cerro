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
  const sceneImage = document.querySelector(".scene-container img"); // Get the image element

  const songs = [
    { title: "Que se Prenda el Cerro", artist: "Tao Tormenta & Hamura Beatsss", src: "assets/audio/Tao Tormenta  Hamura Beatsss  - Que se Prenda el Cerro.mp3", scene: "assets/scenes/cerro/cerro.gif" },
    { title: "Milagro de satan Teresa", artist: "Tao Tormenta & Ahau Talam feat. Martin Corona", src: "assets/audio/Tao Tormenta Ahau Talam -  Milagro de satan Teresa feat Martin Corona.mp3", scene: "assets/scenes/satan_teresa/satan_teresa.gif" },
    { title: "El Payaso Triste", artist: "Tao Tormenta feat. Hamura Beatsss", src: "assets/audio/Tao Tormenta feaat.  Hamura Beatsss - El Payaso Triste.mp3", scene: "assets/scenes/payaso_triste/payaso_triste.gif" },
  ];
  let currentSongIndex = 0;
  let isMuted = false;

  function loadSong(songIndex) {
    const song = songs[songIndex];
    audioPlayer.src = song.src;
    songTitleElement.textContent = `${song.title} - ${song.artist}`; // Set title and artist
    sceneImage.src = song.scene; // Update scene image
    sceneImage.alt = song.title; // Update alt text
    // Reset play button icon if needed when loading a new song
    if (audioPlayer.paused) {
        playButton.textContent = "▶️";
    } else {
        // If it was playing, play the new song immediately
        audioPlayer.play().catch(e => console.error("Error playing audio:", e));
        playButton.textContent = "⏸️";
    }
  }

  function playPauseSong() {
    if (audioPlayer.paused) {
      audioPlayer.play().catch(e => console.error("Error playing audio:", e));
      playButton.textContent = "⏸️";
    } else {
      audioPlayer.pause();
      playButton.textContent = "▶️";
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
    muteButton.textContent = isMuted ? " Muted" : "🔇"; // Update icon/text
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
    playButton.textContent = "⏸️";
  });
  audioPlayer.addEventListener("pause", () => {
    playButton.textContent = "▶️";
  });
}); // End of DOMContentLoaded listener
