import React, { useEffect, useState, useRef } from "react";
import "./App.css";

const drumPad = [
    {text: "Q", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},
    {text: "W", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},
    {text: "E", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
    {text: "A", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},
    {text: "S", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
    {text: "D", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},
    {text: "Z", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"},
    {text: "X", src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"},
    {text: "C", src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"}];

function App() {
    const [activeKey, setActiveKey] = useState('');
    const audioRefs = useRef([]);

    useEffect(() => {
        const onKeyDown = e => {
            const key = e.key.toUpperCase();
            const index = drumPad.findIndex(pad => pad.text === key);
            if (index >= 0) playSound(index);
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            // cleanup listener when component unmounts
            document.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    const playSound = index => {
        audioRefs.current[index].currentTime = 0; // This will reset the sound to start if pressed multiple times
        audioRefs.current[index].play();
        setActiveKey(drumPad[index].text);
    };

    return (
        <div className="App">
            <div id="drum-machine">
                <div id="display">{activeKey}</div>
                <div className="drum-pads">
                    {drumPad.map((pad, index) => (
                        <div key={pad.src}
                             onClick={() => playSound(index)}
                             className="drum-pad"
                             id={pad.text}
                        >
                            {pad.text}
                            <audio
                                ref={ref => audioRefs.current[index] = ref}
                                className="clip"
                                id={pad.text}
                                src={pad.src}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;