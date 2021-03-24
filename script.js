//Global Variables
const clueHoldTime = 1000; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
var pattern = []; //initialize this to an empty list to modify later
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;


function getRandomInt(min, max) {
  /**
 * Description: create random integer between two integers
 * @param  {[int]} min :minimum number in range 
 * @param  {[int]} max :minimum number in range 
 * @return {[int]}     :random int in range of min (inclusive) and max (exclusive)
 */
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function grabDifficulty(){
  /**
 * Description: grabs difficulty from dropdown
 */
  return document.getElementById("difficulty").value;
}


function enableStart(){
  /**
 * Description: Changes disabled state of start button to enabled state
 */
  document.getElementById("startBtn").classList.remove("disable");
  document.getElementById("startBtn").classList.remove("disabled-start")
  document.getElementById("startBtn").classList.add("enabled-start")
}

function disableStart(){
  /**
 * Description: Changes enabled state of start button to disabled state
 */
  document.getElementById("startBtn").classList.add("disable");
  document.getElementById("startBtn").classList.remove("enabled-start");
  document.getElementById("startBtn").classList.add("disabled-start");
}
function get_pattern_length(){
  /**
 * Description: Selects diffculty choosen in dropdown menu
 */
  switch(grabDifficulty()){
    case "default":
      disableStart();
      break;
    case "Easy":
      enableStart();
      return 4
    case "Medium":
      enableStart();
      return 8
    case "Hard":
      enableStart();
      return 12
  }
}


function randomPattern(pattern){
  /**
 * Description: Create randomPatterns automatically
 * @param  {[list]} pattern :empty pattern list
 * @return {[none]}         :modifies pattern inplace
 */
  var pattern_length = get_pattern_length();
  for(var i =0; i<pattern_length; i++){
    pattern.push(getRandomInt(1, 5))
  }
}

function startGame(){
    /**
 * Description: starts game when start button is pressed 
 */
    //check that the player has choosen a difficulty
    if (grabDifficulty() == 'default'){
      document.getElementById("startBtn").classList.add("disable");
    }else{
      //create pattern to play
      pattern = []
      randomPattern(pattern)
      addCircleMargin();
      addRound();
      
      //initialize game variables
      progress = 0;
      gamePlaying = true;
      
      // swap the Start and Stop buttons
      document.getElementById("startBtn").classList.add("gone");
      document.getElementById("gameDifficulty").classList.add("gone");
      document.getElementById("stopBtn").classList.remove("gone");
      playClueSequence();
    }
    
}


function disableButtons(){
   /**
 * Description: Disables buttons when called 
 */
  document.getElementById("button1").classList.add("disable");
  document.getElementById("button2").classList.add("disable");
  document.getElementById("button3").classList.add("disable");
  document.getElementById("button4").classList.add("disable");
}


function enableButtons(){
  /**
 * Description: Enables buttons when called 
 */
  document.getElementById("button1").classList.remove("disable");
  document.getElementById("button2").classList.remove("disable");
  document.getElementById("button3").classList.remove("disable");
  document.getElementById("button4").classList.remove("disable");
}

function stopGame(){
   /**
 * Description: Returns game to orginal state
 */
  gamePlaying = false;
  removeCircleMargin();
  removeRound();
  document.getElementById("startBtn").classList.remove("gone");
  document.getElementById("stopBtn").classList.add("gone");
  document.getElementById("gameDifficulty").classList.remove("gone");
  document.getElementById("difficulty").value = "default";
  disableStart();
}

function removeCircleMargin(){
  /**
 * Description: Return circles to original state
 */
  document.getElementById("button1").classList.add("overlap");
  document.getElementById("button1").classList.remove("circle-spread");
  document.getElementById("button2").classList.add("overlap");
  document.getElementById("button2").classList.remove("circle-spread");
  document.getElementById("button3").classList.add("overlap");
  document.getElementById("button3").classList.remove("circle-spread");
  document.getElementById("button4").classList.add("overlap");
  document.getElementById("button4").classList.remove("circle-spread");
}

function addCircleMargin(){
  /**
 * Description: Spreads circles when the game begins
 */
  document.getElementById("button1").classList.remove("overlap");
  document.getElementById("button1").classList.add("circle-spread");
  document.getElementById("button2").classList.remove("overlap");
  document.getElementById("button2").classList.add("circle-spread");
  document.getElementById("button3").classList.remove("overlap");
  document.getElementById("button3").classList.add("circle-spread");
  document.getElementById("button4").classList.remove("overlap");
  document.getElementById("button4").classList.add("circle-spread");
}

// Sound Synthesis Functions

// Customized frequency map to include piano key notes frquency
const freqMap = {
  1: 261.6,  //middle C
  2: 293.66, //middle D
  3: 349.23, //middle F
  4: 440.00    //middle A
}

function playTone(btn,len){ 
  /**
 * Description: Plays tone when specfic button is pressed 
 * @param  {[int]} btn :number of button to play tone for
 * @param  {[int]} len :length of setTimeout delay
 */
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}

function startTone(btn){
  /**
 * Description: Ensure tone will start if button pressed 
               and nothing is playing in parallel
 * @param  {[int]} btn :number of button to play tone for
 */
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}

function stopTone(){
   /**
 * Description: Stop tone after given tone playtime is over
 */
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

function lightButton(btn){
  /**
 * Description: Light our button when sequence plays 
 * @param  {[int]} btn :number of button to play tone for
 */
  document.getElementById("button"+btn).classList.add("lit")
}

function clearButton(btn){
  /**
 * Description: Stop our lit button to stop or continue sequence 
 * @param  {[int]} btn :number of button to play tone for
 */
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  /**
 * Description: Play our clue given our button
 * @param  {[int]} btn :number of button to play tone for
 */
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}


function addRound(){
  /**
 * Description: Display round during the game
 */
  document.getElementById("directions").classList.add("gone")
  document.getElementById("roundCounter").classList.remove("gone")
}

function removeRound(){
  /**
 * Description: Remove round when game ends
 */
  document.getElementById("directions").classList.remove("gone")
  document.getElementById("roundCounter").classList.add("gone")
}

function changeRound(round){
  /**
 * Description: Displays current round 
 * @param  {[int]} round :Gives what round player is currently on
 */
  document.getElementById("roundCounter").innerText = "Round " + round 
}


function playClueSequence(){
  /**
 * Description: Plays sequence of clues for each round
 */
  guessCounter =0;
  disableButtons(); //disable buttons to stop users from pressing during sequence
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    changeRound(progress+1);
    setTimeout(playSingleClue,delay,pattern[i]);// set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  setTimeout(enableButtons,delay);
}

function losePopUp(){
  /**
 * Description: Display popup if player loses
 */
  document.getElementById("loseBox").classList.remove("gone");
}

function winPopUp(){
  /**
 * Description: Display popup if player wins
 */
  document.getElementById("winBox").classList.remove("gone");
}

function winRestart(){
  /**
 * Description: Return game to original state
 */
  document.getElementById("winBox").classList.add("gone");
  document.getElementById("gameDifficulty").classList.remove("gone");
}

function loseRestart(){
  /**
 * Description: Return game to original state
 */
  document.getElementById("loseBox").classList.add("gone");
  document.getElementById("gameDifficulty").classList.remove("gone");
}

function loseGame(){
  /**
 * Description: Displays losePopUp and return game to original state in the background 
 */
  removeCircleMargin();
  removeRound();
  stopGame();
  losePopUp();
}

function winGame(){
  /**
 * Description: Displays winPopUp and return game to original state in the background 
 */
  removeCircleMargin();
  removeRound();
  stopGame();
  winPopUp();
}

function guess(btn){
  /**
 * Description: Allows us to make a guess after sequence plays 
 * @param  {[int]} btn :number of button to play tone for
 */
  if(!gamePlaying){
    return;
  }
  // add game logic here
  console.log(guessCounter,progress,pattern.length)
  if (btn != pattern[guessCounter]){
    loseGame()
  }else if (guessCounter == pattern.length-1 & guessCounter== progress){
    winGame()
  }else if (guessCounter == progress){
    progress +=1
    playClueSequence();
  }else{
    guessCounter +=1
  }
}

