import { BrowserRouter, Routes, Route } from "react-router-dom";
import Granadron from "./Granadron";      // tu landing principal
import Proyectos from "./Proyectos";      // la nueva página
import FuturosProyectos from "./Futurosproyectos";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Granadron />} />
                <Route path="/proyectos" element={<Proyectos />} />
                <Route path="/futuros" element={<FuturosProyectos />} />

            </Routes>
        </BrowserRouter>
    );
}