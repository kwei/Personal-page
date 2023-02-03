import "./styles/root.scss"
import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from "./Home.jsx";

import { HomePageContext } from "./context/HomePageContext.js"

const rootElement = document.getElementById('root');
const render = createRoot(rootElement);
rootElement.ondrop = (event) => event.preventDefault();
rootElement.ondrag = (event) => event.preventDefault();

const App = () => {
    return (
        <HomePageContext.Provider value={null}>
            <Home/>
        </HomePageContext.Provider>
    );
}

render.render(<App />);