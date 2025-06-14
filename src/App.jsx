import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home3D from "./Pages/Home3D";
import About from "./Pages/About";
import Skills3D from "./Pages/Skills3D";
import Projects3D from "./Pages/Projects3D";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";
import SupportPage from "./Pages/SupportPage";
import Terminal from "./Pages/Terminal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home3D />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills3D />} />
        <Route path="/projects" element={<Projects3D />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="terminal" element={<Terminal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;