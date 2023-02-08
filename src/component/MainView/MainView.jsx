import "./MainView.scss"
import React, { useContext } from "react"
import { MainPageContext } from "../../context/MainPageContext"
import { NAVIGATION } from "../../utils"
import Personal from "../Personal/Personal.jsx"
import Project from "../Project/Project.jsx"
import Home from "../Home/Home.jsx"
import Contact from "../Contact/Contact.jsx"
import Game from "../Game/Game.jsx"

const MainView = () => {
    const { currentView } = useContext(MainPageContext)

    const content = () => {
        switch (currentView) {
            case NAVIGATION.HOME:
                return <Home></Home>
            case NAVIGATION.PERSONAL:
                return <Personal></Personal>
            case NAVIGATION.PROJECT:
                return <Project></Project>
            case NAVIGATION.CONTACT:
                return <Contact></Contact>
            case NAVIGATION.GAME:
                return <Game></Game>
            default:
                return <Home></Home>
        }
    }

    return (
        <div className="view-container">
            { content() }
        </div>
    )
}

export default MainView