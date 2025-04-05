var audioElement = document.getElementById("myAudio");
var video1 = document.getElementById("myVideo");  
var midContent = document.getElementById("midContent");
var content = document.getElementById("content");
//var myAudio = document.getElementById("myAudio");
var curTime = 0;
var list = [];
var chkList = ["Ghost","Ghost","Ghost"];



function addWord(s)
{list.push(s);}

function startComp() {

    // Play the audio after the AudioContext has been resumed
    audioElement.play().catch((error) => {
        console.log("Error starting audio: ", error);
    });

}

//Method for compression
function compressor()
{
  // Create the AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
window.audioContext = audioContext;
// Create nodes to analyse the Video's volume
var analyser1 = audioContext.createAnalyser();
var source1 = audioContext.createMediaElementSource(video1);
source1.connect(analyser1);
analyser1.connect(audioContext.destination);
// Set analyser properties
analyser1.fftSize = 256;
var bufferLength = analyser1.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
// Create nodes to affect the gain of the audio
var gainNode2 = audioContext.createGain();
var source2 = audioContext.createMediaElementSource(audioElement);
  
  function updateVolume() {
      console.log("Eveliina is a fitty");
  
      // Get the frequency data from the first audio (audio1)
      analyser1.getByteFrequencyData(dataArray);
      
      // Calculate the volume of audio1 based on frequency data
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const averageVolume = sum / bufferLength;
      
      // Map the average volume (0 to 255) to a range between 0 and 1 for video audio (audio2)
      const normalizedVolume = averageVolume / 255;
      
      
      // Set the volume of video1's audio based on the volume of audio1
     gainNode2.gain.setValueAtTime((1-(normalizedVolume*4)), audioContext.currentTime);
      
      //Print the gain value after calculation
      console.log("Current gain value:", gainNode2.gain.value);
      
      // Continuously adjust the volume
      if(!video1.paused)
      {requestAnimationFrame(updateVolume);}
    }
  
  
try {
  
  source2.connect(gainNode2);
  gainNode2.connect(audioContext.destination);
  // Start updating the volume when video1 starts playing
    video1.onplay = () => 
    {
      audioContext.resume().then(() =>{updateVolume();});
    };


// Check if the element was found
  if (!myVideo) 
  {  
    throw new Error('Element with id "myVideo" not found');
  }
	} 
  catch (error) 
    {
 	 console.log('Error: ', error.message);
	}
}



function getCurTime() { 
  curTime = audioElement.currentTime;
} 

function setCurTime() { 
  audioElement.currentTime = curTime;
} 

function start() 
{
  midContent.innerHTML="";
  audioElement.play();
  getCurTime();
  video1.src="INTRO.mp4";
  video1.loop = false;
  video1.play();
  //compressor();
  content.innerHTML = `
  <div class='grid-container-one-column'>
  <div class='grid-item'><button class='myBtn' onclick='reaction();'>Try the Incantation</button></div>
  </div>`;
  setCurTime();
}

function reaction()
{
  if(list.length<3)
  {
    console.log("Empty List");
    duckyReact();
  }
  else
  {
    if(list.equals(chkList)===true){list.length=0;goodEnding();}
    if(list[0]==="Father"){ console.log("Father");list.length=0;fatherReact();}
    if(list[0]==="Son"){ console.log("Son");list.length=0;sonReact();}
    if(list[0]==="Ghost"){ console.log("Ghost");list.length=0;ghostReact();}
  }
}

function choose() {
  if(list.length===3)
  {
  getCurTime();
  video1.src="THINKING.mp4";
  video1.loop = true;
  video1.play();
  compressor();
  content.innerHTML = `
  <div class='grid-container-one-column'>
  <div class='grid-item'><button class='myBtn' onclick='reaction()'>Try The Incantation</button></div>
  </div>`
  ;
  setCurTime();
  }
  else{
  getCurTime();
  video1.src="THINKING.mp4";
  video1.play();
  compressor();
  content.innerHTML = `
  <div class='grid-container-one-column'>
  <div class='grid-item'><button class='myBtn' onclick='guessFather()'>Father</button></div>
  <div class='grid-item'><button class='myBtn' onclick='guessSon()'>Son</button></div>
  <div class='grid-item'><button class='myBtn' onclick='guessGhost()'>Ghost</button></div>
  </div>`
  ;
  setCurTime();
  }
}

function guessFather() {
  getCurTime();
  addWord("Father");
  video1.src="FATHER.mp4";
  video1.play();
  compressor();
  content.innerHTML = `
  <div class='grid-container-one-column'>
  <div class='grid-item'><button class='myBtn' onclick='choose()'>Go Back</button></div>
  </div>`
  ;
  setCurTime();
}

function guessSon() {
  getCurTime();
  addWord("Son");
  video1.src="SON.mp4";
  video1.play();
  compressor();
  content.innerHTML = `
  <div class='grid-container-one-column'>
  <div class='grid-item'><button class='myBtn' onclick='choose()'>Go Back</button></div>
  </div>`
  ;
  setCurTime();
}

function guessGhost() {
  getCurTime();
  addWord("Ghost");
  video1.src="GHOST.mp4";
  video1.play();
  compressor();
  content.innerHTML = `
  <div class='grid-container-one-column'>
  <div class='grid-item'><button class='myBtn' onclick='choose()'>Go Back</button></div>
  </div>`
  ;
  setCurTime();
}

function duckyReact() {
  getCurTime();
  video1.src="DUCKY.mp4";
  video1.muted = false;
  video1.play();  
  onended = (event) => {audioElement.play();};
  //compressor();
  content.innerHTML = `
  <div class='grid-container-one-column'>
  <div class='grid-item'><button class='myBtn' onclick='choose();'>Go Back</button></div>
  </div>`
  ;
  setCurTime(); 
}

function fatherReact() {
  getCurTime();
  video1.src="RFATHER.mp4";
  video1.play();
  compressor();
  content.innerHTML = `
  <div class='grid-container-one-column'>
  <div class='grid-item'><button class='myBtn' onclick='choose()'>Go Back</button></div>
  </div>`
  ;
  setCurTime();
}

function sonReact() {
  getCurTime();
  video1.src="RSON.mp4";
  video1.play();
  compressor();
  content.innerHTML = `
  <div class='grid-container-one-column'>
  <div class='grid-item'><button class='myBtn' onclick='choose()'>Go Back</button></div>
  </div>`
  ;
  setCurTime();
}

function ghostReact() {
  getCurTime();
  video1.src="RGHOST.mp4";
  video1.play();
  compressor();
  content.innerHTML = `
  <div class='grid-container-one-column'>
  <div class='grid-item'><button class='myBtn' onclick='choose()'>Go Back</button></div>
  </div>`
  ;
  setCurTime();
}

function goodEnding() {
  getCurTime();
  video1.src="";
  //compressor();
  midContent.innerHTML=`<p style="font-size: 10vh">Congratulations. The door opens to a blinding light.</p>`;
  content.innerHTML = `
  <div class='grid-container-one-column'>
  <div class='grid-item'><button class='myBtn' onclick='start()'>Start Again</button></div>
  </div>`
  ;
  setCurTime();
}

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
    // if the argument is the same array, we can be sure the contents are same as well
    if(array === this)
        return true;
    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
};
