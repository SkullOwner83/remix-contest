import React, { useEffect, useState } from 'react'
import ImgGrgeAnimated from "../Images/Gallery/Grge Avatar Animated.gif";
import ImgGrge from "../Images/Gallery/Grge Avatar.png";
import SndNokiaArabic from "../Sounds/Nokia Arabic.mp3";

export const NoPage = () => {
    const [isPlaying, SetisPlaying] = useState(false);
    const [Sound, SetSound] = useState(null);

    //Create sound instance
    useEffect(() => {
        const ObjSound = new Audio(SndNokiaArabic);
        ObjSound.volume = 0.1;
        SetSound(ObjSound);

        return () => {
            if (ObjSound) {
                ObjSound.pause();
                ObjSound.currentTime = 0;
            }
        };
    }, []);

    //Play sound if the sound is not playing 
    const handlePlaySound = () => {
        if (!isPlaying && Sound) {
            Sound.play();
            SetisPlaying(true);
        }
    };

    //HTML section
    return (
        <main className="NoFound-Page">
            <div className="Background-Page"/>
            <div className="Gif-Container Centered-Container">
                <section>
                    <button className="Trigger-Button" onClick={() => handlePlaySound()}/>
                    <img src={!isPlaying ? ImgGrge : ImgGrgeAnimated} alt="Grge bailando gif"/>
                    <h1>¡Error 404!</h1>
                    <p>Página no encontrada</p>
                </section>
            </div>
        </main>
    )
}
