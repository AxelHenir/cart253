// Music class - Responsible for playing and pausing music, analyzing frequencies and level of the music.

// I have 5 demo tracks loaded with this class.
// Music has a fucntion which reads the energy of the music and queues effects accordingly.
// These are handled by 5 different Peakdetection objects set to different frequencies.
// The level of the overall volume and mic volume are also able to set and/or queue effects.

class Music{ // Plug n Play Audio player

  constructor(){


    this.music=undefined; // music = current track selected
    this.currentSongName="N/A"; // Current song name

    // My 5 demo songs

    this.song1=loadSound("assets/sounds/music/Cowboy Bebop - Rush.mp3");
    this.song2=loadSound("assets/sounds/music/Glass Animals - Heatwaves.mp3");
    this.song3=loadSound("assets/sounds/music/KAYTRANADA - Gray Area.mp3");
    this.song4=loadSound("assets/sounds/music/Karma Fields - Dreams.mp3");
    this.song5=loadSound("assets/sounds/music/Denzel Curry - Dynasties and Dystopia.mp3");

    // P5 Microphone
    this.mic = new p5.AudioIn();
    this.mic.start();

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
    rectMode(CENTER,CENTER);
    fill(0);
    rect(width/2,10,width,20);
    textAlign(LEFT);
    textSize(12);
    fill(255);
    noStroke();
    text("Now playing: "+this.currentSongName, 50,15);
    text("Q = New scene   SPACE = Pause/Play    H = Close/Open Help", 500,15)
    pop();

  }

  changeTracks(t){ // t = which track to switch to.

    switch(t){

      case 1: // 1 = Play song 1
        this.currentSongName = "SEATBELTS - Rush";
        if(this.music==undefined){ // check if first play
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
        if(this.music==undefined){ // check if first play
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
        if(this.music==undefined){ // check if first play
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
        if(this.music==undefined){ // check if first play
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
        if(this.music==undefined){ // check if first play
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

    // Set the input to the music (not the mic)
    this.amp.setInput(this.music);
  }

  pauseMusic(){

    if(this.music!=undefined){ // Check if first play
      if(this.music.isPlaying()){ // Check if music is playing
        this.music.pause(); // Pause music
      }
      else{
        this.music.loop(); // Resume music
      }
    }
  }

  callEffectsFromMusic(){ // Uses the energy of the music to queue visual effects

    // This function uses the getFreq() function to see if, "At this frequency range, was there recently a hit of energy?"
    // If there was, the effects in that code block execute.
    // These can be the queueing effects in VDiagram.js or even its attributes directly.

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
      diagram.queue_Explosion(15);

    }

    // Analyze music level
    diagram.cellStrokeWeight = map(this.amp.getLevel(),0,1,0,8);

    // Analyze mic input level
    diagram.siteStrokeWeight = map(this.mic.getLevel(),0,1,0,25);
    if(this.mic.getLevel()>0.50){
      diagram.queue_Explosion(3);
    }

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

        // Update the peakdetect for mid
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

        // Update the peakdetect for highMid
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

        // Update the peakdetect for treble
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
