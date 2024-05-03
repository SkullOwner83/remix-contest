import React, { useEffect } from 'react'
import ImgGrge from "../Images/Grge.gif";
import SndNokiaArabic from "../Sounds/Nokia Arabic.mp3";

export const NoPage = () => {
    useEffect(() => {
        const Sound = new Audio(SndNokiaArabic);
        Sound.play();
        Sound.volume = 0.05;
    }, []);

    //HTML section
    return (
        <div className="NoFound-Page">
            <div className="Background-Page"/>
            <div className="Gif-Container Centered-Container">
                <img src={ImgGrge} alt="Grge bailando gif"/>
                <h1>¡Error 404!</h1>
                <h1>Pagina no encontrada</h1>
            </div>
        </div>
    )
}
