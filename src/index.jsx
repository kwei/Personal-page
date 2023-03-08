import "./styles/root.scss"
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import Main from "./Main.jsx"

import { MainPageContext } from "./context/MainPageContext.js"
import { NAVIGATION } from "./utils"

const rootElement = document.getElementById('root');
const render = createRoot(rootElement);

const App = () => {
    const [ currentView, setCurrentView ] = useState(NAVIGATION.TRACK)
    return (
        <MainPageContext.Provider 
            value={{
                currentView: currentView,
                switchView: setCurrentView
            }}
        >
            <Main/>
        </MainPageContext.Provider>
    );
}

render.render(<App />);