import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import {  useLocalStorage, FormatTime } from "../Functions";
import WaveSurfer from "wavesurfer.js";

import { ReactComponent as ImgVolume } from "../Images/Icons/Volume.svg";
import { ReactComponent as ImgMuted } from "../Images/Icons/Muted.svg"
import { ReactComponent as ImgPlay } from "../Images/Icons/Play.svg";
import { ReactComponent as ImgPause } from "../Images/Icons/Pause.svg";
import { ReactComponent as ImgStop } from "../Images/Icons/Stop.svg";
import { Slider } from './Slider';

export const WaveForm = ({ AudioFile, AudioName, Simple, onPlay }) => {
    const WaveFormRef = useRef(null);
    const ObjWaveFrom = useRef(null);
    const ButtonsRef = useRef(null);
    const InfoRef = useRef(null);

    const [Playing, SetPlaying] = useState(false);
    const [Paused, SetPaused] = useState(false);
    const [Muted, SetMuted] = useState(false);
    const [Duration, SetDuration] = useState(0);
    const [CurrenTime, SetCurrentTime] = useState(0);
    const [Volume, SetVolume] = useLocalStorage(`Volume-${AudioName}`, "1");
    const [ToggleVolume, SetToggleVolume] = useState(false);

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
        barWidth: 2,
        barRadius: 4,
        barGap: 0
    });

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
        
        ObjWaveFrom.current.on("play", () => {
            SetPlaying(true);
            SetPaused(false);
            
        })

        ObjWaveFrom.current.on("pause", () => {
            SetPaused(true);
            SetPlaying(false);
        })

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
                ObjWaveFrom.current.play();
                onPlay(ObjWaveFrom.current);
                break;

            case "Stop":
                ObjWaveFrom.current.stop();
                SetPaused(false);
                break;

            case "Pause":
                ObjWaveFrom.current.pause();
                break;

            case "Mute":
                SetMuted(!Muted);
                ObjWaveFrom.current.setVolume(Muted ? Volume : 0);
                break;

            case "TogglePlayback":
                if (!Playing) {
                    ObjWaveFrom.current.play();
                    onPlay(ObjWaveFrom.current);
                } else {
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
    function handleVolumeChange(NewVolume) {
        SetVolume(NewVolume);
        ObjWaveFrom.current.setVolume(NewVolume);
        SetMuted(NewVolume === 0);
    }

    //Show volume slider and hide the playback controls and audio tempo in mobile device
    function handleToggleVolume() {
        if (ToggleVolume) {
            ButtonsRef.current.classList.remove("Hide-Control");
            InfoRef.current.classList.remove("Hide-Control");
        } else {
            ButtonsRef.current.classList.add("Hide-Control");
            InfoRef.current.classList.add("Hide-Control");
        }

        SetToggleVolume(!ToggleVolume);
    }

    if (!Simple) {
        //Normal waveform component render
        return (
            <div className="WaveForm-Component">
                <p className="Title">{AudioName}</p>
                <div id="WaveForm" ref={WaveFormRef}/>

                <div className={ToggleVolume ? "Show-Volume Controls-Container" : "Controls-Container"}>
                    {/* Volume of song section */}
                    <div className="Volume-Container">
                        <button className="Volume-Button" onClick={() => {window.innerWidth >= 800 ? handleControls("Mute") : handleToggleVolume()}}>{ Muted ? <ImgMuted/> : <ImgVolume/> }</button>
                        
                        <Slider
                            id="Volume-Slider"
                            min="0"
                            max="1"
                            step="0.01"
                            color="#d737c2"
                            value={Muted ? 0 : Volume}
                            className={ToggleVolume ? "Show-Volume" : ""}
                            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                        />

                        <p className="Volume-Value">{!Muted ? Math.round(Volume * 100) : 0}%</p>
                    </div>

                    {/* Control of song buttons section */}
                    <div className="Buttons-Container Centered-Container Flex-Row" ref={ButtonsRef}>
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
                    <div className="Audio-Info" ref={InfoRef}>
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