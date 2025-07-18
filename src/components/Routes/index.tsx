import React, {FunctionComponent} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import {ROUTE_HOME, ROUTE_PROFIL, ROUTE_TRENDING} from "../../vars/routes";
import Navbar from "../Navbar";

const Index: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={ROUTE_HOME} element={<Home />} />
                <Route path={ROUTE_PROFIL} element={<Profil />} />
                <Route path={ROUTE_TRENDING} element={<Trending />} />
                <Route path='*' element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Index;