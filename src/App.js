import "./Styles/Styles.scss";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Home } from "./Pages/Home";

function App() {
  const [CurrentPage, SetCurrentPage] = useState();

  //HTML section
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        
        <Home/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
