import React from 'react'
import { Timer } from "../Components/Timer";
import { WaveForm } from "../Components/WaveForm";
import ImgArtwork from "../Images/Artwork.jpg";
import ImgTriangle from "../Images/Synthwave Triangle.png";
import Audio from "../Solo tu.mp3";

export const Home = () => {
    const Contest = {
        SongName: "Blue Larimar Music & GRGE - Solo Tú",
        Date: "April 27, 2024 00:00:00"
    }

    //HTML section
    return (
        <div>
            <div class="Background"/>

            <div class="Banner-Container">  
                <div className="Title-Container">
                    <img src={ImgTriangle}/>
                </div>

                <div class="Song-Container">
                    {/* Artwork of song section */}
                    <div class="Image-Container"><img src={ImgArtwork}/></div>
                    {/* Waveform of and information of song section */}
                    <div className="WaveForm-Container">
                        <WaveForm AudioFile={Audio} SongName={Contest.SongName}/>
                    </div>
                    {/* Count down and entry button section */}
                    <div className="CountDown-Container Centered-Container">
                        <button className="Convencional-Button">Entrar al contest</button>
                    </div>
                </div>

                <section className="Centered-Container Flex-Row">
                    <div class="Counter">
                        <Timer DueDate={Contest.Date}/>
                    </div>
                </section>

                <section>
                    <button>Dellates</button>
                    <button>Reglas de</button>
                </section>
            </div>

            <main>
                <section>
                    <p>Como celebracion del aniversario del lanzamiento de "Solo tu", se ha decidido hacer este Remix</p>
                </section>
            </main>
        </div>
    )
}
