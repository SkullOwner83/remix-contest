import React, { useState } from 'react'
import { Timer } from "../Components/Timer";
import { WaveForm } from "../Components/WaveForm";
import ImgArtwork from "../Images/Artwork.jpg";
import ImgTitle from "../Images/Synthwave Triangle.png";
import Audio from "../Solo tu.mp3";

export const Home = () => {
    const Contest = {
        SongName: "Blue Larimar Music & GRGE - Solo Tú",
        Date: "April 29, 2024 00:00:00"
    }

    const [CurrentSection, SetCurrentSection] = useState("Details");
    const [EndOfContest, SetEndOfContest] = useState(false);

    function handleSelectSection(Section) {
        SetCurrentSection(Section);
    }

    //HTML section
    return (
        <div className="Home-Page">
            <div class="Background"/>

            <div class="Banner-Container Centered-Container">  
                <div class="Title-Image"><img src={ImgTitle}/></div>

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

                {/* Coundown date section */}
                <div>
                    <Timer DueDate={Contest.Date}/>
                </div>        

                <div class="Centered-Container">                    
                    <button className="Convencional-Button">Entrar al contest</button>
                </div>
            </div>

            <main>
                <div class="Main-Background">
                    {/* Navigate buttons section */}
                    <div className="Navigate-Buttons Centered-Container Flex-Row">
                        <button className={CurrentSection == "Details" ? "Selected" : ""}
                                onClick={() => handleSelectSection("Details")}>
                            Dellates
                        </button>

                        <button className={CurrentSection == "Rules" ? "Selected" : ""}
                                onClick={() => handleSelectSection("Rules")}>
                            Reglas
                        </button>
                        
                        <button className={CurrentSection == "Prizes" ? "Selected" : ""}
                                onClick={() => handleSelectSection("Prizes")}>
                            Premios
                        </button>

                        <button className={CurrentSection == "Resources" ? "Selected" : ""}
                                onClick={() => handleSelectSection("Resources")}>
                            Recursos
                        </button>
                    </div>

                    <section>
                        <h1>Detalles</h1>
                        <p>Como celebracion del aniversario del lanzamiento de "Solo tu", se ha decidido hacer este Remix</p>
                    </section>
                </div>
            </main>
        </div>
    )
}
