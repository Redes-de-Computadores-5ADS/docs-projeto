import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from './pages/Home';
import { Reserva } from './pages/Reserva';
import { PageLayout } from "./layout";

export function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                
                    <Route path="/reserva" element={<Reserva/>} />
                    <Route path="/" element= {<Reserva/>}/>
                    <Route path="/home" element={<Home/>} />
                
            </Routes>
        </BrowserRouter>
    );
}
