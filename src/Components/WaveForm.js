import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import {  useLocalStorage, FormatTime } from "../Functions";
import WaveSurfer from "wavesurfer.js";

import { ReactComponent as ImgVolume } from "../Images/Icons/Volume.svg";
import { ReactComponent as ImgMuted } from "../Images/Icons/Muted.svg"
import { ReactComponent as ImgPlay } from "../Images/Icons/Play.svg";
import { ReactComponent as ImgPause } from "../Images/Icons/Pause.svg";
import { ReactComponent as ImgStop } from "../Images/Icons/Stop.svg";

export const WaveForm = ({ AudioFile, AudioName, Simple }) => {
    const WaveFormRef = useRef(null);
    const ObjWaveFrom = useRef(null);
    const [Playing, SetPlaying] = useState(false);
    const [Paused, SetPaused] = useState(false);
    const [Muted, SetMuted] = useState(false);
    const [Duration, SetDuration] = useState(0);
    const [CurrenTime, SetCurrentTime] = useState(0);
    const [Volume, SetVolume] = useLocalStorage(`Volume-${AudioName}`, "1");

    //Waveform audio configuration
    const WaveConfig = () => {
        let Config = {
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
        };

        if (window.innerWidth < 500) {
            Config.barWidth = 2;
        }

        return Config;
    }

    //Initialize WaveSurfer and set up event listeners
    useEffect(() => {
        //Create WaveSurfer instance with previous configuration
        ObjWaveFrom.current = WaveSurfer.create(WaveConfig());
    
        //Set the volume and duration state, when the WaveSurfer is ready
        ObjWaveFrom.current.on("ready", () => {
            ObjWaveFrom.current.setVolume(Volume);
            SetDuration(ObjWaveFrom.current.getDuration());
        });

        //Update current time in state as audio position changes
        ObjWaveFrom.current.on("timeupdate", () => {
            SetCurrentTime(ObjWaveFrom.current.getCurrentTime());
        });    

        //Clean up event listeners and destroy instance on unmount
        return () => {
            ObjWaveFrom.current.un("audioprocess");
            ObjWaveFrom.current.un("ready");
            ObjWaveFrom.current.destroy();
        };
    }, []);
    
    //Function to control the playing state of the song
    const handleControls = (Parameter) => {
        switch(Parameter) 
        {
            case "Play":
                SetPlaying(true);
                SetPaused(false);
                ObjWaveFrom.current.play();
                break;

            case "Stop":
                SetPlaying(false);
                SetPaused(false);
                ObjWaveFrom.current.stop();
                SetCurrentTime(ObjWaveFrom.current.getCurrentTime());
                break;

            case "Pause":
                SetPlaying(false);
                SetPaused(true);
                ObjWaveFrom.current.pause();
                break;

            case "Mute":
                SetMuted(!Muted);
                ObjWaveFrom.current.setVolume(Muted ? Volume : 0);
                break;

            case "TogglePlayback":
                if (!Playing) {
                    SetPlaying(true);
                    SetPaused(false);
                    ObjWaveFrom.current.play();
                } else {
                    SetPlaying(false);
                    SetPaused(true);
                    ObjWaveFrom.current.pause();
                }
                break;

            default: return;
        }
    }

    //Set the sound gain when the Volume state changes
    useEffect(() => {
        ObjWaveFrom.current.setVolume(Volume);
    }, [Volume]);

    //Adjust audio volume using controls
    const handleVolumeChange = (NewVolume) => {
        SetVolume(NewVolume);
        ObjWaveFrom.current.setVolume(NewVolume);
        SetMuted(NewVolume === 0);
    }

    if (!Simple) {
        //Normal waveform component render
        return (
            <div className="WaveForm-Component">
                <p className="Title">{AudioName}</p>
                <div id="WaveForm" ref={WaveFormRef}/>

                <div className="Controls-Container">
                    {/* Volume of song section */}
                    <div className="Volume-Container">
                        <button onClick={() => handleControls("Mute")}>{ Muted ? <ImgMuted/> : <ImgVolume/> }</button> 

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
                        <button onClick={() => handleControls("Stop")}><ImgStop/></button>

                        <button onClick={() => handleControls("Play")} 
                                className={Playing ? "Pressed" : ""}>
                            <ImgPlay/>
                        </button>

                        <button onClick={() => handleControls("Pause")} 
                                className={Paused ? "Pressed" : ""}>
                            <ImgPause/>
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
    } else {
        //Simple waveform component render
        return(
            <div className="SimpleWaveForm-Container">
                <button className="Play-Button" onClick={() => handleControls("TogglePlayback")}>
                    {!Playing ? <ImgPlay className="Logo-Svg"/> : <ImgPause className="Logo-Svg"/>}
                </button>

                <div>
                    <p>{AudioName}</p>
                    <div id="WaveForm" ref={WaveFormRef}/>
                </div>
            </div>
        );
    }
}