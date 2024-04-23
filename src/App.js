import "./Styles/Styles.scss";
import ImgArtwork from "./Images/Artwork.jpg";
import { Timer } from "./Components/Timer";

function App() {
  const Song = {
    Name: "Blue Larimar Music & GRGE - Solo Tú"
  }

  return (
    <div className="App">
      <div class="Banner-Container Centered-Container Flex-Row">
        <img src={ImgArtwork}/>

        <div className="WaveForm-Container">
          <p>{Song.Name}</p>
        </div>

        <div>
          <p><Timer/></p>
          <button className="Convencional-Button">Entrar al contest</button>
        </div>
      </div>
    </div>
  );
}

export default App;
