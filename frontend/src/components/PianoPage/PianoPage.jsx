import { useEffect, useRef } from "react";
import "./PianoPage.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LogoLottie from "../../assets/lotties/logo.json";
import Astronauta from "../../assets/lotties/astronauta.json";
import GuyLottie from "../../assets/lotties/guy.json";
import Lottie from "lottie-react";

function PianoPage() {
  const sessionUser = useSelector((state) => state.userSession?.user);
  const allKeysRef = useRef([]);
  const pressedKeys = useRef(new Set());
  const audioElements = useRef({});

  useEffect(() => {
    const pianoKeys = document.querySelectorAll(".piano-keys .key");
    const volumeSlider = document.querySelector(".volume-slider input");
    const keysCheckbox = document.querySelector(".keys-checkbox input");

    if (!pianoKeys || !volumeSlider || !keysCheckbox) {
      console.error("Required elements not found in the DOM");
      return;
    }

    allKeysRef.current = Array.from(pianoKeys).map((key) => key.dataset.key);

    // Pre-load all audio files
    allKeysRef.current.forEach((key) => {
      const audio = new Audio(`/tunes/${key}.wav`);
      audio.load(); // Explicitly load the audio
      audioElements.current[key] = audio;
    });

    const playTune = (key) => {
      if (pressedKeys.current.has(key)) return;
      pressedKeys.current.add(key);

      const audio = audioElements.current[key];
      if (audio) {
        audio.currentTime = 0; // Reset audio to start
        audio.volume = volumeSlider.value;
        audio.play();
      }

      const clickedKey = document.querySelector(`[data-key="${key}"]`);
      if (clickedKey) {
        clickedKey.classList.add("active");
        audio.addEventListener("ended", () => {
          clickedKey.classList.remove("active");
        });
      }
    };

    const removeActiveClass = (key) => {
      const clickedKey = document.querySelector(`[data-key="${key}"]`);
      if (clickedKey) {
        clickedKey.classList.remove("active");
      }
      pressedKeys.current.delete(key);
    };

    const handleVolume = (e) => {
      console.log(`Volume set to: ${e.target.value}`);
    };

    const showHideKeys = () => {
      pianoKeys.forEach((key) => key.classList.toggle("hide"));
    };

    const handleKeyDown = (e) => {
      if (allKeysRef.current.includes(e.key)) {
        playTune(e.key);
      }
    };

    const handleKeyUp = (e) => {
      if (allKeysRef.current.includes(e.key)) {
        removeActiveClass(e.key);
      }
    };

    pianoKeys.forEach((key) => {
      key.addEventListener("mousedown", () => playTune(key.dataset.key));
      key.addEventListener("mouseup", () => removeActiveClass(key.dataset.key));
    });

    keysCheckbox.addEventListener("click", showHideKeys);
    volumeSlider.addEventListener("input", handleVolume);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      // Clean up audio elements
      Object.values(audioElements.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
      audioElements.current = {};
      pianoKeys.forEach((key) => {
        key.removeEventListener("mousedown", () => playTune(key.dataset.key));
        key.removeEventListener("mouseup", () =>
          removeActiveClass(key.dataset.key)
        );
      });
      keysCheckbox.removeEventListener("click", showHideKeys);
      volumeSlider.removeEventListener("input", handleVolume);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <main>
      <div className="body">
        <div className="wrapper">
          <header>
            <h2>Playable PIANO</h2>
            <div className="column volume-slider">
              <span>Volume</span>
              <input
                type="range"
                min="0"
                max="1"
                defaultValue="0.5"
                step="any"
              />
            </div>
            <div className="column keys-checkbox">
              <span>Show Keys</span>
              <input type="checkbox" defaultChecked />
            </div>
          </header>
          <ul className="piano-keys">
            <li className="key white" data-key="a">
              <span>a</span>
            </li>
            <li className="key black" data-key="w">
              <span>w</span>
            </li>
            <li className="key white" data-key="s">
              <span>s</span>
            </li>
            <li className="key black" data-key="e">
              <span>e</span>
            </li>
            <li className="key white" data-key="d">
              <span>d</span>
            </li>
            <li className="key white" data-key="f">
              <span>f</span>
            </li>
            <li className="key black" data-key="t">
              <span>t</span>
            </li>
            <li className="key white" data-key="g">
              <span>g</span>
            </li>
            <li className="key black" data-key="y">
              <span>y</span>
            </li>
            <li className="key white" data-key="h">
              <span>h</span>
            </li>
            <li className="key black" data-key="u">
              <span>u</span>
            </li>
            <li className="key white" data-key="j">
              <span>j</span>
            </li>
            <li className="key white" data-key="k">
              <span>k</span>
            </li>
            <li className="key black" data-key="o">
              <span>o</span>
            </li>
            <li className="key white" data-key="l">
              <span>l</span>
            </li>
            <li className="key black" data-key="p">
              <span>p</span>
            </li>
            <li className="key white" data-key=";">
              <span>;</span>
            </li>
          </ul>
        </div>
        <div className="astro-ctn">
          <Lottie animationData={Astronauta} />
        </div>
        <div className="logo-ctn">
          <Lottie animationData={LogoLottie} />
        </div>
        <div className="guy-ctn">
          <Lottie animationData={GuyLottie} />
        </div>
      </div>
    </main>
  );
}

export default PianoPage;
