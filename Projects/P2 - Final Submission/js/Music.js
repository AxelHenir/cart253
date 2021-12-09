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

    // FFT object from p5.sound
    this.fft = new p5.FFT(0.2,512);

    // PeakDetect objects from p5.sound
    this.pDBass = new p5.PeakDetect(0,200,0.92);
    this.pDLowMid = new p5.PeakDetect(250,500,0.90);
    this.pDMid = new p5.PeakDetect(550,2000,0.75);
    this.pDHighMid = new p5.PeakDetect(2100,6000,0.715);
    this.pDTreble = new p5.PeakDetect(6200,20000,0.5);

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

  callEffectsFromMusic(){ // Uses the energy of the music to queue visual effects

    // Analyze bass frequencies
    if(this.getFreq("bass")){

      // Call bass effect

    }

    // Analyze low-mid frequencies
    if(this.getFreq("lowMid")){

      // Call lowMid effect
      diagram.add_Jitter(8);

    }

    // Analyze mid frequencies
    if(this.getFreq("mid")){

      // Call mid effect
      diagram.queue_Explosion(15);

    }

    // Analyze high-mid frequencies
    if(this.getFreq("highMid")){

      // Call highMid-effect
      diagram.cellSpeed += 6;
      diagram.cellSpeed = constrain(diagram.cellSpeed,0,6);

    }

    // Analyze high frequencies
    if(this.getFreq("treble")){

      // Call treble effect

    }

    // Analyze overall level

    this.amp.getLevel();

  }

  getFreq(s){

    // Analyze the fft, required by p5.sound
    this.fft.analyze();

    switch(s){
      case "bass":

        // Update the peakdetect for bass
        this.pDBass.update(this.fft);

        // If a peak is detected
        if (this.pDBass.isDetected){
          return(true); // true = do effect
        }
        else{
          return(false); // false = do no effects
        }
        break;

      case "lowMid":

        // Update the peakdetect for lowMid
        this.pDLowMid.update(this.fft);

        // If a peak is detected
        if (this.pDLowMid.isDetected){
          return(true); // true = do effect
        }
        else{
          return(false); // false = do no effects
        }
        break;

      case "mid":

        // Update the peakdetect for bass
        this.pDMid.update(this.fft);

        // If a peak is detected
        if (this.pDMid.isDetected){
          return(true); // true = do effect
        }
        else{
          return(false); // false = do no effects
        }
        break;

      case "highMid":

        // Update the peakdetect for bass
        this.pDHighMid.update(this.fft);

        // If a peak is detected
        if (this.pDHighMid.isDetected){
          return(true); // true = do effect
        }
        else{
          return(false); // false = do no effects
        }
        break;

      case "treble":

        // Update the peakdetect for bass
        this.pDTreble.update(this.fft);

        // If a peak is detected
        if (this.pDTreble.isDetected){
          return(true); // true = do effect
        }
        else{
          return(false); // false = do no effects
        }
        break;

    }
  }

}
