import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import {  useLocalStorage, FormatTime } from "../Functions";
import WaveSurfer from "wavesurfer.js";

import ImgVolume from "../Images/Icons/Volume.svg";
import ImgMuted from "../Images/Icons/Muted.svg"
import ImgPlay from "../Images/Icons/Play.svg";
import ImgPause from "../Images/Icons/Pause.svg";
import ImgStop from "../Images/Icons/Stop.svg";

export const WaveForm = ({ AudioFile, SongName }) => {
    const WaveFormRef = useRef(null);
    const WaveFrom = useRef(null);
    const [Playing, SetPlaying] = useState(false);
    const [Volume, SetVolume] = useLocalStorage("Volume", "0.5");
    const [Paused, SetPaused] = useState(false);
    const [Muted, SetMuted] = useState(false);
    const [Duration, SetDuration] = useState(0);
    const [CurrenTime, SetCurrentTime] = useState(0);

    //Waveform audio configuration
    const WaveConfig = () => ({
        container: WaveFormRef.current,
        url: AudioFile,
        waveColor: "#FFFF",
        progressColor: "#389eec",
        cursorColor: "transparent",

        backend: "WebAudio",
        responsive: true,
        normalize: false,
        dragToSeek: true,
        autoplay: false,
        hideScrollbar: true,
        autoScroll: true,

        width: "auto",
        height: "auto",
        barWidth: 3,
        barRadius: 4,
        barGap: 0
    })

    //Initialize WaveSurfer and set up event listeners
    useEffect(() => {
        //Create WaveSurfer instance with previous configuration
        WaveFrom.current = WaveSurfer.create(WaveConfig());
    
        //Set the volume and duration state, when the WaveSurfer is ready
        WaveFrom.current.on("ready", () => {
            WaveFrom.current.setVolume(Volume);
            SetDuration(WaveFrom.current.getDuration());
        })

        //Update current time in state as audio plays
        WaveFrom.current.on("audioprocess", () => {
            SetCurrentTime(WaveFrom.current.getCurrentTime());
        })

        //Clean up event listeners and destroy instance on unmount
        return () => {
            WaveFrom.current.un("audioprocess");
            WaveFrom.current.un("ready");
            WaveFrom.current.destroy();
        };
    }, []);
    
    //Function to control the playing state of the song
    const handleControls = (Parameter) => {
        switch(Parameter) 
        {
            case "Play":
                SetPlaying(true);
                SetPaused(false);
                WaveFrom.current.play();
                break;

            case "Stop":
                SetPlaying(false);
                SetPaused(false);
                WaveFrom.current.stop();
                break;

            case "Pause":
                SetPlaying(false);
                SetPaused(true);
                WaveFrom.current.pause();
                break;

            case "Mute":
                SetMuted(!Muted);
                WaveFrom.current.setVolume(Muted ? Volume : 0);
                break;

            default: return;
        }
    }

    //Adjust audio volume
    const handleVolumeChange = (NewVolume) => {
        SetVolume(NewVolume);
        WaveFrom.current.setVolume(NewVolume);
        SetMuted(NewVolume === 0);
    }

    //Increase volume by 10%
    const handleVolumeUp = () => {
        handleVolumeChange(Math.min(Volume + 0.1, 1));
    }

    //Decrease volume by 10%
    const handleVolumeDown = () => {
        handleVolumeChange(Math.max(Volume - 0.1, 0));
    }

    return (
        <div className="WaveForm-Component">
            <p className="Title">{SongName}</p>
            <div id="WaveForm" ref={WaveFormRef}/>

            <div className="Controls-Container">
                {/* Volume of song section */}
                <div className="Volume-Container">
                    <button onClick={() => handleControls("Mute")}><img src={ Muted ? ImgMuted : ImgVolume } alt="Control de columen"/></button> 

                    <input
                        type="range"
                        id="volume"
                        name="volume"
                        min="0"
                        max="1"
                        step="0.01"
                        value={Muted ? 0 : Volume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    />

                    <p>{!Muted ? Math.round(Volume * 100) : 0}%</p>
                </div>

                {/* Control of song buttons section */}
                <div className="Buttons-Container Centered-Container Flex-Row">
                    <button onClick={() => handleControls("Stop")}><img src={ImgStop} alt="Control de parar"/></button>

                    <button onClick={() => handleControls("Play")} 
                            className={Playing ? "Pressed" : ""}>
                        <img src={ImgPlay} alt="Control de reproducción"/>
                    </button>

                    <button onClick={() => handleControls("Pause")} 
                            className={Paused ? "Pressed" : ""}>
                        <img src={ImgPause} alt="Control de pausa"/>
                    </button>
                </div>

                {/* Info of song section */}
                <div className="Audio-Info">
                    <p>
                        <span className="CurrentTime-Container">{FormatTime(CurrenTime)}</span> 
                        <span className="Duration-Container"> / {FormatTime(Duration )}</span>
                    </p>
                </div>
            </div>  
        </div>
    )
}