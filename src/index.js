import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import About from './About';
import Detail from "./Detail";
import reportWebVitals from './reportWebVitals';
import Header from "./Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<>
                <Header />
                <App />
            </>} />

            <Route path="/about" element={<>
                <Header />
                <About />
            </>} />

            <Route path="/details/:itemId" element={<>
                <Header />
                <Detail />
            </>} />

        </Routes>
    </BrowserRouter>
);

reportWebVitals();
