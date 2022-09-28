import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import {About} from "./pages/about/About";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";

function App() {
  return (
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="about" element={<About/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
