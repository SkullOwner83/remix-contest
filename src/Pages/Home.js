import React, { useEffect, useRef, useState } from 'react'
import { Timer } from "../Components/Timer";
import { WaveForm } from "../Components/WaveForm";
import ImgTitle from "../Images/Logos/Isologo.png";
import Audio from "../Solo tu.mp3";

import ImgArtwork from "../Images/Gallery/Artwork.jpg";
import ImgGrge from "../Images/Gallery/GRGE.jpg"
import ImgBlueLarimar from "../Images/Gallery/Blue Larimar Music.jpg";
import ImgMixMaster from "../Images/Illustrations/Mix and Master.svg";
import ImgCreativity from "../Images/Illustrations/Creativity.svg";
import ImgComposition from "../Images/Illustrations/Musical Composition.svg";
import ImgSoundChoice from "../Images/Illustrations/Sound Choice.svg";

import ImgGrgeLogo from "../Images/Logos/GRGE.png";
import ImgBlueLarimarLogo from "../Images/Logos/Blue Larimar Music.png";

export const Home = () => {
    const Contest = {
        SongName: "Blue Larimar Music & GRGE - Solo Tú",
        Date: "April 30, 2024 21:00:00"
    }

    const [CurrentInfoTab, SetCurrentInfoTab] = useState("Details");
    const [EndOfContest, SetEndOfContest] = useState(false);
    const TabControl = useRef(null);

    function handleSelectSection(Section) {
        SetCurrentInfoTab(Section);
    }
    function handleScrollToComponent() {
        TabControl.current.scrollIntoView({ behaviors: "smooth", block: "start" });
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
                <div class="Title-Image"><img src={ImgTitle} alt="Titulo"/></div>

                <div class="Song-Container">
                    {/* Artwork of song section */}
                    <div class="Image-Container"><img src={ImgArtwork} alt="Portada de la canción"/></div>
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
                    <button className="Convencional-Button" onClick={() => handleScrollToComponent()}>Ver detalles</button>
                </div>
            </div>

            <main>
                <div class="Main-Background">
                    {/* Tabcontrol navigate buttons */}
                    <div className="TabControl-Buttons Centered-Container Flex-Row">
                        <button className={CurrentInfoTab === "Details" ? "Selected" : ""}
                                onClick={() => handleSelectSection("Details")}>
                            Dellates
                        </button>

                        <button className={CurrentInfoTab === "Rules" ? "Selected" : ""}
                                onClick={() => handleSelectSection("Rules")}>
                            Reglas
                        </button>
                        
                        <button className={CurrentInfoTab === "Prizes" ? "Selected" : ""}
                                onClick={() => handleSelectSection("Prizes")}>
                            Premios
                        </button>

                        <button className={CurrentInfoTab === "Resources" ? "Selected" : ""}
                                onClick={() => handleSelectSection("Resources")}>
                            Recursos
                        </button>
                    </div>

                    {/* Section that contain the infor of each tab */}
                    <section className="TabControl-Content" ref={TabControl}>
                        <div className="TabContent-Details">
                            <h1>Detalles</h1>

                            <article>
                                <p>Como celebración del aniversario del lanzamiento de "Solo tú", se ha decidido organizar este Remix contest. Este es uno de los temas del album "Vinilia" de Blue Larimar Music, canción en colaboración con el dj productor GRGE.</p>
                                <p>Solo tú, es un tema del genero synthwave influenciado por los intros de anime.</p>
                            </article>

                            <div className="About-Us Grid-Wrap">
                                {/* GRGE Music section */}
                                <div>
                                    <article>
                                        <div>
                                            <a href="https://www.youtube.com/@GRGE" target="Blank" class="Image-Container"><img src={ImgGrge} className="Photo" alt="GRGE foto"/></a>
                                            <div class="Logo-Container"><img src={ImgGrgeLogo} className="Logo" alt="GRGE logo"/></div>
                                        </div>

                                        <p>Mi nombre es GRGE, Soy DJ y Productor mexicano que tambien ama hacer videos para YouTube.</p>
                                        <p>Me metí en la música cuando tenía 6 años, mi padre me regaló un teclado por mi cumpleaños, desde ese entonces me enamoré de él, solía tocar todos los días, practicar cada canción que venía en él. Pocos años después comencé a interesarme en la Dance Music, recuerdo escuchar los casetes de mi padre, Kraftwerk, Afrika Bambaataa, Salt-N-Peppa, 2 Unlimited, y todas esas cosas antiguas.</p>
                                        <p>Cuando me convertí en adolescente mi mejor amiga me prestó su reproductor de MP3, tenía musica Trance y Psytrance, disfruté mucho escuchar ese tipo de música y le pedí que me la pasara en un disco en blanco, desde ese día super que la Música Electrónica era lo mío.</p>
                                    </article>
                                </div>

                                {/* Blue Larimar Music section */}
                                <div>
                                    <article>
                                        <div>
                                            <a href="https://www.youtube.com/@BlueLarimarMusic" target="Blank" class="Image-Container"><img src={ImgBlueLarimar} className="Photo" alt="Blue Larimar foto"/></a>
                                            <div class="Logo-Container"><img src={ImgBlueLarimarLogo} alt="Blue Larimar logo"/></div>
                                        </div>

                                        <p>Blue Larimar Music (Arlén): productora, compositora, artista y youtuber de República Dominicana.</p>
                                        <p>Graduada de Estudios Profesionales de Música y Arte en el Instituto de Cultura y Arte de Santiago (ICA) en el 2018 R.D</p>
                                        <p>Formó parte de la banda musical llamada LO’PRIMO que estuvo en vigencia hasta el 2021 como cantante, guitarrista y compositora.</p>
                                        <p>En 2018 fundó Blue Larimar Music, un proyecto musical dedicado a la enseñanza de producción musical. Cuenta con una audiencia de más de 18k en Youtube. Trabaja con marcas como Native Instruments, Arturia y Baby Audio.</p>
                                        <p>Profesora de música en Estudio Diná (Santiago R.D), en el ICA, e imparte clases particulares.</p>
                                    </article>
                                </div>
                            </div>
                        </div>

                        {/* Contest rules and points to grade tab */}
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
                                        <div class="Image-Container"><img src={ImgMixMaster} alt="Mezcla y Master"/></div>
                                        <p>Mecla y masterización</p>
                                    </div>

                                    <div>
                                        <div class="Image-Container"><img src={ImgCreativity} alt="Creatividad"/></div>
                                        <p>Nivel de creatividad</p>
                                    </div>

                                    <div>
                                        <div class="Image-Container"><img src={ImgComposition} alt="Composición"/></div>
                                        <p>Composición musical</p>
                                    </div>

                                    <div>
                                        <div class="Image-Container"><img src={ImgSoundChoice} alt="Elección de sonidos"/></div>
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
