import React, { useEffect, useRef, useState } from 'react'
import { Timer } from "../Components/Timer";
import { WaveForm } from "../Components/WaveForm";
import SndMusic from "../Sounds/Solo tu.mp3";
import SndBassline from "../Sounds/Bassline.wav";
import SndChords from "../Sounds/Chords.wav";
import SndGuitar from "../Sounds/Guitar.wav";
import SndOrchHit from "../Sounds/Orch Hit.wav";
import SndVocal from "../Sounds/Vocal.wav";

import ImgTitle from "../Images/Logos/Isologo.png";
import ImgOpenSign from "../Images/Gallery/Sign.png";
import ImgArtwork from "../Images/Gallery/Artwork.jpg";
import ImgGrge from "../Images/Gallery/GRGE.jpg"
import ImgBlueLarimar from "../Images/Gallery/Blue Larimar Music.jpg";
import ImgAcapella from "../Images/Illustrations/Acapella.svg";
import ImgMixMaster from "../Images/Illustrations/Mix and Master.svg";
import ImgCreativity from "../Images/Illustrations/Creativity.svg";
import ImgComposition from "../Images/Illustrations/Composition.svg";
import ImgEstructure from "../Images/Illustrations/Estructure.svg";
import ImgGrgeLogo from "../Images/Logos/GRGE.png";
import ImgBlueLarimarLogo from "../Images/Logos/Blue Larimar Music.png";
import { useLocalStorage } from '../Functions';


export const Home = () => {
    const Contest = {
        SongName: "Blue Larimar Music & GRGE - Solo Tú",
        Date: "June 3, 2024 21:00:00"
    }

    const [CurrentInfoTab, SetCurrentInfoTab] = useState("Details");
    const TabControlRef = useRef(null);
    const TabContentRef = useRef(null);

    useEffect(() => {
        //Get all first childs of tabcontrol and save it a list
        const TabsContent = Array.from(TabContentRef.current.querySelectorAll("& > div"));

        //Iterate over each container and remove the show content class and it in case the class name is the same as current tab
        TabsContent.forEach(Element => {
            Element.classList.remove("Show-Tab");

            if (Element.classList.contains(`TabContent-${CurrentInfoTab}`)) {
                Element.classList.add("Show-Tab");
            }
        });
    }, [CurrentInfoTab])

    function handleSelectSection(Section) {
        SetCurrentInfoTab(Section);
    }
    
    function handleScrollToComponent() {
        TabControlRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    //HTML section
    return (
        <div className="Home-Page">
            <div className="Background-Page"/>

            <div className="Banner-Container Centered-Container">  
                <div className="Title-Image"><img src={ImgTitle} alt="Titulo"/></div>

                <div className="Song-Container">
                    {/* Artwork of song section */}
                    <div className="Image-Container"><img src={ImgArtwork} alt="Portada de la canción"/></div>
                    {/* Waveform of and information of song section */}
                    <div className="WaveForm-Container">
                        <WaveForm AudioFile={SndMusic} AudioName={Contest.SongName}/>
                    </div>
                    {/* Send remix button section */}
                    <div className="SendRemix-Container Centered-Container">   
                        <div className="Image-Container">
                            <p className="Title">OPEN</p>
                            <img src={ImgOpenSign}/>
                        </div>        
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdrPLEYrMz8zjsCI6fFEz8DlLWa7FzE57ZjYxI3yveV6-VFSw/viewform?usp=sf_link" target="Blank" className="Convencional-Button">Enviar Remix</a>
                    </div>
                </div>

                {/* Coundown date section */}
                <div className="CountDown-Container">
                    <Timer DueDate={Contest.Date}/>
                </div>        

                <div className="EndOfBanner-Button">                  
                    <button className="Convencional-Button" onClick={() => handleScrollToComponent()}>Ver detalles</button>
                </div>
            </div>

            <main>
                <div className="Main-Background">
                    {/* Tabcontrol navigate buttons */}
                    <div className="TabControl-Buttons Centered-Container Flex-Row" ref={TabControlRef}>
                        <button className={CurrentInfoTab === "Details" ? "Selected" : ""}
                                onClick={() => handleSelectSection("Details")}>
                            Detalles
                        </button>

                        <button className={CurrentInfoTab === "Rules" ? "Selected" : ""}
                                onClick={() => handleSelectSection("Rules")}>
                            Reglas
                        </button>                    

                        <button className={CurrentInfoTab === "Resources" ? "Selected" : ""}
                                onClick={() => handleSelectSection("Resources")}>
                            Recursos
                        </button>
                    </div>

                    {/* Section that contain the infor of each tab */}
                    <section className="TabControl-Content" ref={TabContentRef}>
                        {/* General contest details section */}
                        <div className="TabContent-Details">

                            <article>
                                <h1>Detalles</h1>
                                <p><strong>“Sólo Tú”</strong> es un tema musical de género Synthpop que te lleva de vuelta a los nostálgicos sonidos de la década de los 80’s. Se trata de la primera colaboración entre <strong>GRGE</strong> y <strong>Blue Larimar Music</strong>, donde Blue Larimar Music ha dado la voz principal para este romántico y pegajoso tema.</p>
                                <hr/>
                                <p className="Title">Los 5 mejores remixes formarán parte del <strong>EP oficial de “Sólo Tú”</strong>, mismo que se estará subiendo a los canales de GRGE y Blue Larimar Music.</p>
                            </article>

                            <div className="TabContent-AboutUs Grid-Wrap">
                                {/* GRGE Music section */}
                                <div>
                                    <article>
                                        <div>
                                            <a href="https://www.youtube.com/@GRGE" target="Blank" className="Image-Container"><img src={ImgGrge} className="Photo" alt="GRGE foto"/></a>
                                            <div className="Logo-Container"><img src={ImgGrgeLogo} className="Logo" alt="GRGE logo"/></div>
                                        </div>

                                        <p>GRGE (Yoryi): Productor musical, DJ, y creador de contenido, originario de Tijuana, México.</p>
                                        <p>Su discografía se caracteriza por tener una esencia nostálgica, pues entre sus lanzamientos se pueden apreciar desde sintetizadores analógicos, sonidos chiptune, leads espaciales, hasta pads etéreos que evocan la música dance de los 90s.</p>
                                        <p>En 2016 inició actividad en su canal de YouTube donde comenzó subiendo tutoriales de producción musical, principalmente enfocados en la música electrónica, mismos donde hasta el día de hoy ha enseñado cómo hacer 57 géneros musicales.</p>
                                        <p>En 2017 se convirtió en el segundo artista mexicano en pertenecer a la lista oficial de Power Users (Usuarios Destacados) de FL Studio, uno de los DAW más populares del mundo.</p>
                                        <p>En la actualidad es embajador de grandes compañías desarrolladoras de software/hardware como Image-Line (FL Studio), Native Instruments, y Arturia.</p>
                                    </article>
                                </div>

                                {/* Blue Larimar Music section */}
                                <div>
                                    <article>
                                        <div>
                                            <a href="https://www.youtube.com/@BlueLarimarMusic" target="Blank" className="Image-Container"><img src={ImgBlueLarimar} className="Photo" alt="Blue Larimar foto"/></a>
                                            <div className="Logo-Container"><img src={ImgBlueLarimarLogo} alt="Blue Larimar logo"/></div>
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
                                <h1>Bases</h1>

                                <ol className="Bases-List">
                                    <li><strong>3 de Mayo:</strong> Se otorgan stems (pistas) específicos del tema original para que puedan llevar a cabo el remix.</li>
                                    <li><strong>3 de Mayo - 3 de Junio:</strong> Periodo de entrega.</li>
                                    <li><strong>4 de Junio - 7 de Junio:</strong> Periodo de evaluación.</li>
                                    <li><strong>8 de Junio:</strong> Se anuncian los ganadores.</li>
                                </ol>
                            </article>

                            <article>
                                <h2>Reglas</h2>                                    

                                <ol ClassName="Rules-List">
                                    <li>Solamente una participación por artista/dúo/grupo.</li>
                                    <li>El Remix deberá tener como mínimo una duración de 2 minutos con 30 segundos, y máximo una duración de 5 minutos con 0 segundos.</li>
                                    <li>Ningún Remix se podrá subir a ninguna plataforma durante el periodo de entrega.</li>
                                    <li>Ningún Remix deberá contener material de otros artistas (sampling) más que el de los stems proporcionados.</li>
                                    <li>Prohibido utilizar los stems proporcionados para material distribuido en plataformas digitales.</li>
                                    <li>El periodo de entrega inicia el 3 de Mayo a las 7:00 PM PT, y termina el 3 de Junio a las 11:59 PM PT.</li>
                                    <li>Los participantes no pueden realizar ningún cambio en su remix después de enviarlo.</li>
                                    <li>Todos los Remixes deberán ser entregados en formato WAV 16Bit.</li>
                                </ol>
                            </article> 
                            
                            {/* Contest points to grade section */}
                            <article className="Points-ToGrade">
                                <h3>Evaluación</h3>
                                <p className="Title">Durante el periodo de evaluación se estará calificando lo siguiente:</p>

                                <div className="Flex-Wrap Graphics">
                                    <div>
                                        <div className="Image-Container"><img src={ImgAcapella} alt="Mezcla y Master"/></div>
                                        <p>Uso del 50% de la acapella</p>
                                    </div>

                                    <div>
                                        <div className="Image-Container"><img src={ImgCreativity} alt="Creatividad"/></div>
                                        <p>Nivel de creatividad</p>
                                    </div>

                                    <div>
                                        <div className="Image-Container"><img src={ImgComposition} alt="Composición musical"/></div>
                                        <p>Composición musical</p>
                                    </div>

                                    <div>
                                        <div className="Image-Container"><img src={ImgMixMaster} alt="Mezcla y Master"/></div>
                                        <p>Mezcla y masterización</p>
                                    </div>

                                    <div>
                                        <div className="Image-Container"><img src={ImgEstructure} alt="Estructura musical"/></div>
                                        <p>Estructura</p>
                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* Contest resources section */}
                        <div className="TabContent-Resources">
                            <article>
                                <h1>Recursos</h1>
                                <div className="Centered-Container">
                                    <p className="Title">Tonalidad: Re menor / Dm, Velocidad: 150 BPM</p>
                                </div>
                            </article>

                            {/* Song stems containers */}
                            <div className="Stems-Waveform Flex-Wrap">
                                <div><WaveForm AudioFile={SndBassline} AudioName="Bassline" Simple="true"/></div>
                                <div><WaveForm AudioFile={SndChords} AudioName="Chords" Simple="true"/></div>
                                <div><WaveForm AudioFile={SndGuitar} AudioName="Guitar" Simple="true"/></div>
                                <div><WaveForm AudioFile={SndOrchHit} AudioName="Orchestral hit" Simple="true"/></div>
                                <div><WaveForm AudioFile={SndVocal} AudioName="Vocal" Simple="true"/></div>
                            </div>

                            <div className="Centered-Container">
                                <a href="https://drive.usercontent.google.com/download?id=1XztfHZ91hQQLUOfLYIct_UDDxw8qQwRX&export=download&authuser=0&confirm=t&uuid=d2cab3a8-21fa-4267-a3d6-9df2de0cb08a&at=APZUnTWjWtgtC_8tzQiwL2wE1rgs:1714805330566" target="Blank" className="Convencional-Button">Descargar Stems</a>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
