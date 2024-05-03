import "./Styles/Styles.scss";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./Components/Footer";
import { Home } from "./Pages/Home";
import { NoPage } from "./Pages/NoPage";

function App() {
  const [CurrentPage, SetCurrentPage] = useState();

  //HTML section
  return (
    <div className="App">
      <BrowserRouter> 
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/inicio" element={<Home/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>
        
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
