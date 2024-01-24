import React from "react";
import NavBar from "./Navbar";
import './App.css';
import './mediaQuery.css';
import { Route, Routes } from "react-router-dom";
import Home from './page/home';
import Anime from './page/anime';
import Genre from './page/genre';
import Collection from './page/collection';

const App = () => {
    return(
        <>
            <NavBar/>
            <div className="page-container">
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/anime" element={<Anime/>}></Route>
                    <Route path="/genre" element={<Genre/>}></Route>
                    <Route path="/collection" element={<Collection/>}></Route>
                </Routes>
            </div>
        </>
    );
};
export default App;