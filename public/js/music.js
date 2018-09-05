console.log("<CHRIS> music.js has loaded");

function preload() {
    // soundFormats('mp3', 'ogg');
    mySound = loadSound('assets/audio/V1.0-MSOMusic_22-For-Web.mp3');
  }
  
  function setup() {
    mySound.setVolume(1.3);
    mySound.setLoop(true);
    mySound.play();
    console.log("<CHRIS> MUSIC LOADED AND SET TO LOOP: " + mySound.isLooping());
    
  }