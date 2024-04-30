import "./Styles/Styles.scss";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
        
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/inicio" element={<Home/>}/>
        </Routes>
        
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
