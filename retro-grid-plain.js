document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('retro-grid-container');

  if (gridContainer) {
    // Create the rotated container
    const rotatedContainer = document.createElement('div');
    rotatedContainer.className = 'retro-grid-rotated-container';

    // Create the lines container
    const linesContainer = document.createElement('div');
    linesContainer.className = 'retro-grid-lines';

    // Create the fade overlay
    const fadeOverlay = document.createElement('div');
    fadeOverlay.className = 'retro-grid-fade';

    // Assemble the structure
    rotatedContainer.appendChild(linesContainer);
    gridContainer.appendChild(rotatedContainer);
    // gridContainer.appendChild(fadeOverlay); // Temporarily removed fade overlay

    // Optional: Set CSS variables dynamically if needed
    // gridContainer.style.setProperty('--grid-angle', '65deg');
    // gridContainer.style.setProperty('--cell-size', '60px');
    // gridContainer.style.setProperty('--opacity', '0.3');
    // gridContainer.style.setProperty('--line-color', 'rgba(255, 255, 255, 0.2)');
  } else {
    console.error('Retro grid container not found!');
  }
});
