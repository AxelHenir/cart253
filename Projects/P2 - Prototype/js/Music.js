class Music{ // Plug n Play Audio player

  constructor(){

    // music = current track selected
    this.music=undefined;
    this.currentSongName="N/A";

    // My 5 demo songs

    this.song1=loadSound("assets/sounds/music/Cowboy Bebop - Rush.mp3");
    this.song2=loadSound("assets/sounds/music/Glass Animals - Heatwaves.mp3");
    this.song3=loadSound("assets/sounds/music/KAYTRANADA - Gray Area.mp3");
    this.song4=loadSound("assets/sounds/music/Karma Fields - Dreams.mp3");
    this.song5=loadSound("assets/sounds/music/Denzel Curry - Dynasties and Dystopia.mp3");


    // Amplitude object from p5.sound
    this.amp = new p5.Amplitude();

    // FTT object from p5.sound
    this.ftt = new p5.FFT();
  }

  displayMusicInfo(){ // Display the "now-playing"

    push();
    textAlign(LEFT);
    textSize(24);
    fill(0);
    noStroke();
    text("Now playing: "+this.currentSongName, 25,50);
    pop();

  }

  changeTracks(t){
    switch(t){

      case 1: // 1 = Play song 1
        this.currentSongName = "SEATBELTS - Rush";
        if(this.music==undefined){ // check if first
          this.music = this.song1; // Set music to selected song
          this.music.loop(); // Begin looping music
        }
        else{
          this.music.stop(); // Stop old song
          this.music = this.song1; // Set music to selected song
          this.music.loop(); // Begin looping music
        }

        break;


      case 2: // 2 = Play song 2
        this.currentSongName = "Glass Animals - Heat Waves";
        if(this.music==undefined){ // check if first
          this.music = this.song2; // Set music to selected song
          this.music.loop(); // Begin looping music
        }
        else{
          this.music.stop(); // Stop old song
          this.music = this.song2; // Set music to selected song
          this.music.loop(); // Begin looping music
        }

        break;


      case 3: // 3 = Play song 3
        this.currentSongName = "KAYTRANADA - Grey Area (ft. Mick Jensen)";
        if(this.music==undefined){ // check if first
          this.music = this.song3; // Set music to selected song
          this.music.loop(); // Begin looping music
        }
        else{
          this.music.stop(); // Stop old song
          this.music = this.song3; // Set music to selected song
          this.music.loop(); // Begin looping music
        }

        break;


      case 4: // 2 = Play song 2
        this.currentSongName = "Karma Fields - Dreams (ft. Shey Baba)";
        if(this.music==undefined){ // check if first
          this.music = this.song4; // Set music to selected song
          this.music.loop(); // Begin looping music
        }
        else{
          this.music.stop(); // Stop old song
          this.music = this.song4; // Set music to selected song
          this.music.loop(); // Begin looping music
        }

        break;


      case 5: // 3 = Play song 3
        this.currentSongName = "Denzel Curry, Gizzle, Bren Joy - Dynasties and Dystopia";
        if(this.music==undefined){ // check if first
          this.music = this.song5; // Set music to selected song
          this.music.loop(); // Begin looping music
        }
        else{
          this.music.stop(); // Stop old song
          this.music = this.song5; // Set music to selected song
          this.music.loop(); // Begin looping music
        }

        break;

    }
  }

  pauseMusic(){
    if(this.music!=undefined){
      if(this.music.isPlaying()){
        this.music.pause(); // Pause music
      }
      else{
        this.music.loop(); // Resume music
      }
    }
  }

}
 
