const audio1 = document.getElementById('audio1');
    const video1 = document.getElementById('video1');

    // Create the AudioContext
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create nodes for audio1 (the control audio)
    const analyser1 = audioContext.createAnalyser();
    const source1 = audioContext.createMediaElementSource(audio1);
    source1.connect(analyser1);
    analyser1.connect(audioContext.destination);

    // Create nodes for video1 (audio from video)
    const gainNode2 = audioContext.createGain();
    const videoSource = audioContext.createMediaElementSource(video1);
    videoSource.connect(gainNode2);
    gainNode2.connect(audioContext.destination);

    // Set analyser properties
    analyser1.fftSize = 256;
    const bufferLength = analyser1.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function updateVolume() {
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
      gainNode2.gain.setValueAtTime(normalizedVolume, audioContext.currentTime);
      
      // Continuously adjust the volume
      requestAnimationFrame(updateVolume);
    }

    // Start updating the volume when audio1 starts playing
    audio1.onplay = () => {
      audioContext.resume().then(() => {
        updateVolume();
      });
    };
