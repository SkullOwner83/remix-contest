import React, { useEffect, useRef, useState } from 'react'
import { Timer } from "../Components/Timer";
import { WaveForm } from "../Components/WaveForm";
import ImgArtwork from "../Images/Artwork.jpg";
import ImgTitle from "../Images/Isologo.png";
import Audio from "../Solo tu.mp3";

import ImgMixMaster from "../Images/Illustrations/Mix and Master.svg";
import ImgCreativity from "../Images/Illustrations/Creativity.svg";
import ImgComposition from "../Images/Illustrations/Musical Composition.svg";
import ImgSoundChoice from "../Images/Illustrations/Sound Choice.svg";

export const Home = () => {
    const Contest = {
        SongName: "Blue Larimar Music & GRGE - Solo Tú",
        Date: "April 29, 2024 21:00:00"
    }

    const [CurrentInfoTab, SetCurrentInfoTab] = useState("Details");
    const [EndOfContest, SetEndOfContest] = useState(false);
    const TabControl = useRef(null);

    function handleSelectSection(Section) {
        SetCurrentInfoTab(Section);
    }

    useEffect(() => {
        //Get all first childs of tabcontrol and save it a list
        const TabsContent = Array.from(TabControl.current.querySelectorAll("& > div"));

        //Iterate over each container and remove the show content class and it in case the class name is the same as current tab
        TabsContent.forEach(Element => {
            Element.classList.remove("Show-Tab");

            if (Element.classList.contains(`TabContent-${CurrentInfoTab}`)) {
                Element.classList.add("Show-Tab");
            }
        });
    }, [CurrentInfoTab])

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
                <div className="CountDown-Container">
                    <Timer DueDate={Contest.Date}/>
                </div>        

                <div class="EndOfBanner-Button">                    
                    <button className="Convencional-Button">Ver detalles</button>
                </div>
            </div>

            <main>
                <div class="Main-Background">
                    {/* Tabcontrol navigate buttons */}
                    <div className="TabControl-Buttons Centered-Container Flex-Row">
                        <button className={CurrentInfoTab == "Details" ? "Selected" : ""}
                                onClick={() => handleSelectSection("Details")}>
                            Dellates
                        </button>

                        <button className={CurrentInfoTab == "Rules" ? "Selected" : ""}
                                onClick={() => handleSelectSection("Rules")}>
                            Reglas
                        </button>
                        
                        <button className={CurrentInfoTab == "Prizes" ? "Selected" : ""}
                                onClick={() => handleSelectSection("Prizes")}>
                            Premios
                        </button>

                        <button className={CurrentInfoTab == "Resources" ? "Selected" : ""}
                                onClick={() => handleSelectSection("Resources")}>
                            Recursos
                        </button>
                    </div>

                    {/* Section that contain the infor of each tab */}
                    <section className="TabControl-Content" ref={TabControl}>
                        <div className="TabContent-Details">
                            <h1>Detalles</h1>
                            <article>
                                <p>Como celebracion del aniversario del lanzamiento de "Solo tu", se ha decidido hacer este Remix</p>
                            </article>
                        </div>

                        <div className="TabContent-Rules">
                            <article>
                                <h1>Reglas</h1>                                    

                                <ol>
                                    <li>El periodo de entrega es del 1.- de Mayo de 2024 y finaliza el 1.- de Junio de 2024.</li>
                                    <li>La duración total de la canción deberá superar los 2 minutos y no debe exceder los 4 minutos.</li>
                                    <li>Se deberá usar al menos el 50% de la acapella.</li>
                                    <li>Se deberá enviar el audio en formato wav.</li>
                                    <li>El remix puede ser de cualquier genero a su elección.</li>
                                    <li>Solo se puede enviar un remix por participante y de manera individual.</li>
                                    <li>Los participantes no pueden realizar ningún cambio en su remix después de enviarlo.</li>
                                    <li>Queda estrictamente prohibido distribuir el remix a plataformas digitales como Spotify, Amazon Music, Deezer, etc.</li>
                                </ol>

                            </article>                    
                            
                            <article className="Points-ToGrade">
                                <h2>Se calificaran los siguientes puntos</h2>

                                <div className="Flex-Wrap Graphics">
                                    <div>
                                        <div class="Image-Container"><img src={ImgMixMaster}/></div>
                                        <p>Mecla y masterización</p>
                                    </div>

                                    <div>
                                        <div class="Image-Container"><img src={ImgCreativity}/></div>
                                        <p>Nivel de creatividad</p>
                                    </div>

                                    <div>
                                        <div class="Image-Container"><img src={ImgComposition}/></div>
                                        <p>Composición musical</p>
                                    </div>

                                    <div>
                                        <div class="Image-Container"><img src={ImgSoundChoice}/></div>
                                        <p>Elección de sonidos</p>
                                    </div>
                                </div>
                            </article>
                        </div>

                        <div className="TabContent-Prizes">
                            <h1>Premios</h1>                            
                        </div>

                        <div className="TabContent-Resources">
                            <h1>Recursos</h1>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
