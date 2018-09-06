console.log("<CHRIS> music.js has loaded");

let mySound;

function preload() {
    // soundFormats('mp3', 'ogg');
    mySound = loadSound('assets/audio/V1.0-MSOMusic_25-ForWeb.mp3');
  }
  
  function setup() {
    
    mySound.setVolume(1);
    mySound.setLoop(true);
    mySound.play();
    
    console.log("<CHRIS> MUSIC LOADED AND SET TO LOOP: " + mySound.isLooping());
    
  }

