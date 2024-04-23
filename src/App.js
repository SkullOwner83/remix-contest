import "./Styles/Styles.scss";
import ImgArtwork from "./Images/Artwork.jpg";
import { Timer } from "./Components/Timer";

function App() {
  const Song = {
    Name: "Blue Larimar Music (feat. GRGE) - Solo Tú"
  }

  return (
    <div className="App">
      <div class="Banner-Container">
        <div class="Image-Container"><img src={ImgArtwork}/></div>

        <div className="WaveForm-Container">
          <p className="Title">{Song.Name}</p>
        </div>

        <div className="Counter-Container">
          <p><Timer Date="April 24, 2024 00:00:00"/></p>
          <button className="Convencional-Button">Entrar al contest</button>
        </div>
      </div>
    </div>
  );
}

export default App;
