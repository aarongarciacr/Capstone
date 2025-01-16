import React, { useState } from "react";
import * as Tone from "tone";

const MusicExercise = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playMelody = async () => {
    const synth = new Tone.Synth().toDestination();
    const melody = ["C4", "E4", "G4", "C5"];
    let index = 0;

    const loop = new Tone.Loop((time) => {
      if (index < melody.length) {
        synth.triggerAttackRelease(melody[index], "8n", time);
        index++;
      } else {
        Tone.Transport.stop(); // Stop when done
      }
    }, "1n");

    await Tone.start();
    Tone.Transport.start();
    loop.start(0);
    setIsPlaying(true);
  };

  const stopMelody = () => {
    Tone.Transport.stop();
    setIsPlaying(false);
  };

  return (
    <div>
      <h1>Music Exercise</h1>
      <button onClick={playMelody} disabled={isPlaying}>
        Play Melody
      </button>
      <button onClick={stopMelody} disabled={!isPlaying}>
        Stop
      </button>
    </div>
  );
};

export default MusicExercise;
