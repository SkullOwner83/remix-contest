import React from 'react'
import ImgArtwork from "../Images/Artwork.jpg";
import { Timer } from "../Components/Timer";
import { WaveForm } from "../Components/WaveForm";
import Audio from "../Solo tu.mp3";

export const Home = () => {
    const Song = {
        Name: "Blue Larimar Music (feat. GRGE) - Solo Tú"
    }

    //HTML section
    return (
        <div class="Banner-Container">
            <div class="Background">
            {/* Artwork of song section */}
            <div class="Image-Container"><img src={ImgArtwork}/></div>

            {/* Waveform of and information of song section */}
            <div className="WaveForm-Container">
                <WaveForm AudioFile={Audio} SongName={Song.Name}/>
            </div>

            {/* Count down and entry button section */}
            <div className="Counter-Container Centered-Container">
                <p><Timer Date="April 25, 2024 00:00:00"/></p>
                <button className="Convencional-Button">Entrar al contest</button>
            </div>
            </div>
        </div>
    )
}