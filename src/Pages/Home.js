import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import { Timer } from "../Components/Timer";
import { WaveForm } from "../Components/WaveForm";
import { Modal } from '../Components/Modal';
import { ScrollToComponent } from "../Functions";

import SndMusic from "../Sounds/Solo tu.mp3";
import SndBassline from "../Sounds/Bassline.wav";
import SndChords from "../Sounds/Chords.wav";
import SndGuitar from "../Sounds/Guitar.wav";
import SndOrchHit from "../Sounds/Orch Hit.wav";
import SndVocal from "../Sounds/Vocal.wav";

import ImgTitle from "../Images/Logos/Isologo.png";
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

export const Home = () => {
    const Contest = {
        SongName: "Blue Larimar Music & GRGE - Solo Tú",
        Date: "June 3, 2024 21:00:00"
    }

    const [EndOfContest, SetEndOfContest] = useState(false);
    const [CurrentTab, SetCurrentTab] = useState("Details");
    const [ToggleModal, SetToggleModal] = useState(false);
    const TabControlRef = useRef(null);
    const TabContentRef = useRef(null);
    const LastPlayedRef = useRef(null);

    //Show the corresponding tab content
    useEffect(() => {
        //Get all first childs of tabcontrol and save it a list
        const TabsContent = Array.from(TabContentRef.current.querySelectorAll("& > div"));

        //Iterate over each container and remove the show content class and it in case the class name is the same as current tab
        TabsContent.forEach(Element => {
            Element.classList.remove("Show-Tab");

            if (Element.classList.contains(`TabContent-${CurrentTab}`)) {
                Element.classList.add("Show-Tab");
            }
        });
    }, [CurrentTab])

    //Show the send remix button if the contest is still open or show the results button when the contest has ended
    const SendRemixButton = () => {
        if (!EndOfContest) {
            return( <a href="https://docs.google.com/forms/d/e/1FAIpQLSdrPLEYrMz8zjsCI6fFEz8DlLWa7FzE57ZjYxI3yveV6-VFSw/viewform?usp=sf_link" target="Blank" className="Convencional-Button"><strong>ENVIAR REMIX</strong></a> );
        } else {
            return( <Link to="resultados" className="Convencional-Button"><strong>VER RESULTADOS</strong></Link> );
        }
    }

    //Check if a sound is playing and stop it to play the new sound
    function handlePlay(ObjectRef) {
        if (LastPlayedRef.current && LastPlayedRef.current !== ObjectRef) {
            LastPlayedRef.current.pause();
        } 

        LastPlayedRef.current = ObjectRef;
    };

    //Show the modal and block the body scroll
    function handleToggleModal() {            
        SetToggleModal(!ToggleModal);

        if (!ToggleModal) {
            document.body.classList.add("Block-Scroll");
        } else {
            document.body.classList.remove("Block-Scroll");
        }

    }

    function handleSelectTab(Section) { SetCurrentTab(Section); }
    function handleEndOfContest(Value) { SetEndOfContest(Value); }
    
    //HTML section
    return (
        <div className="Home-Page">
            <Modal Image={ImgArtwork} className={!ToggleModal ? "Hide-Control" : ""} Alt="Solo Tú - Artwork" onClose={() => handleToggleModal()}/>
            <div className="Background-Page"/>

            <div className="Banner-Container Centered-Container">  
                <div className="Title-Image"><img src={ImgTitle} alt="Titulo"/></div>

                <div className="Song-Container">
                    {/* Artwork of song section */}
                    <div className="Image-Container" onClick={() => handleToggleModal()}><img src={ImgArtwork} alt="Portada de la canción"/></div>
                    
                    {/* Waveform of and information of song section */}
                    <div className="WaveForm-Container">
                        <WaveForm AudioFile={SndMusic} AudioName={Contest.SongName} onPlay={handlePlay}/>
                    </div>
                    
                    {/* Send remix button section */}
                    <div className="SendRemix-Container Centered-Container">   
                        <SendRemixButton/>
                    </div>
                </div>

                {/* Coundown date section */}
                <div className="CountDown-Container">
                    <Timer DueDate={Contest.Date} onEndOfContest={handleEndOfContest}/>
                </div>        

                <div className="EndOfBanner-Button">                
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdrPLEYrMz8zjsCI6fFEz8DlLWa7FzE57ZjYxI3yveV6-VFSw/viewform?usp=sf_link" target="Blank" className="Convencional-Button"><strong>ENVIAR REMIX</strong></a>
                    <button className="Outline-Button" onClick={() => ScrollToComponent(TabControlRef)}>Ver detalles</button>
                </div>
            </div>

            <main>
                <div className="Main-Background">
                    {/* Tabcontrol navigate buttons */}
                    <div className="TabControl-Buttons Centered-Container Flex-Row" ref={TabControlRef}>
                        <button className={CurrentTab === "Details" ? "Selected" : ""}
                                onClick={() => handleSelectTab("Details")}>
                            Detalles
                        </button>

                        <button className={CurrentTab === "Rules" ? "Selected" : ""}
                                onClick={() => handleSelectTab("Rules")}>
                            Reglas
                        </button>                    

                        <button className={CurrentTab === "Resources" ? "Selected" : ""}
                                onClick={() => handleSelectTab("Resources")}>
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
                                        <p>En 2016 inició actividad en su canal de YouTube donde comenzó subiendo tutoriales de producción musical, principalmente enfocados en la música electrónica.</p>
                                        <p>En 2017 se convirtió en el segundo artista mexicano en pertenecer a la lista oficial de Power Users (Usuarios Destacados) de FL Studio.</p>
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
                                    <li><strong>4 de Mayo:</strong> Se otorgan stems (pistas) específicos del tema original para que puedan llevar a cabo el remix.</li>
                                    <li><strong>4 de Mayo - 3 de Junio:</strong> Periodo de entrega.</li>
                                    <li><strong>4 de Junio - 7 de Junio:</strong> Periodo de evaluación.</li>
                                    <li><strong>8 de Junio:</strong> Se anuncian los ganadores.</li>
                                </ol>
                            </article>

                            <article>
                                <h2>Reglas</h2>                                    

                                <ol className="Rules-List">
                                    <li>Solamente una participación por artista/dúo/grupo.</li>
                                    <li>El Remix deberá tener como mínimo una duración de 2 minutos con 30 segundos, y máximo una duración de 5 minutos con 0 segundos.</li>
                                    <li>Ningún Remix se podrá subir a ninguna plataforma durante el periodo de entrega.</li>
                                    <li>Ningún Remix deberá contener material de otros artistas (sampling) más que el de los stems proporcionados.</li>
                                    <li>Prohibido utilizar los stems proporcionados para material distribuido en plataformas digitales.</li>
                                    <li>El periodo de entrega inicia el 3 de Mayo a las 7:00 PM PT, y termina el 3 de Junio a las 11:59 PM PT.</li>
                                    <li>Los participantes no pueden realizar ningún cambio en su remix después de enviarlo.</li>
                                    <li>Todos los Remixes deberán ser entregados en formato WAV 16Bit.</li>
                                    <li>Se deberá usar almenos el 50% de la acapella. Los demas stems son opcionales.</li>
                                    <li>El remix puede ser de Cualquier genero a su elección.</li>
                                </ol>
                            </article> 
                            
                            {/* Contest points to grade section */}
                            <article className="Points-ToGrade">
                                <h3>Evaluación</h3>
                                <p className="Title">Durante el periodo de evaluación se estará calificando lo siguiente:</p>

                                <div className="Flex-Wrap Graphics">
                                    <div>
                                        <div className="Image-Container"><img src={ImgAcapella} alt="Mezcla y Master"/></div>
                                        <p>Uso de la acapella</p>
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
                                <div><WaveForm AudioFile={SndBassline} AudioName="Bassline" Simple="true" onPlay={handlePlay}/></div>
                                <div><WaveForm AudioFile={SndChords} AudioName="Chords" Simple="true" onPlay={handlePlay}/></div>
                                <div><WaveForm AudioFile={SndGuitar} AudioName="Guitar" Simple="true" onPlay={handlePlay}/></div>
                                <div><WaveForm AudioFile={SndOrchHit} AudioName="Orchestral hit" Simple="true" onPlay={handlePlay}/></div>
                                <div><WaveForm AudioFile={SndVocal} AudioName="Vocal" Simple="true" onPlay={handlePlay}/></div>
                            </div>

                            <div className="DownloadButton-Container">
                                <a href="https://drive.usercontent.google.com/download?id=1XztfHZ91hQQLUOfLYIct_UDDxw8qQwRX&export=download&authuser=0&confirm=t&uuid=d2cab3a8-21fa-4267-a3d6-9df2de0cb08a&at=APZUnTWjWtgtC_8tzQiwL2wE1rgs:1714805330566" target="Blank" className="Convencional-Button">Descargar Stems</a>
                            </div>

                            <article>
                                <hr/>
                                <p className="Centered-Container">Cualquier duda, enviar un correo electrónico a la siguiente dirección:</p>
                                <p className="Title">info@bluelarimarmusic.com</p>
                            </article>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
