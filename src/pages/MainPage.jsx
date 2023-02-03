import "../styles/MainPage.scss"
import React from "react"
import Nav from "../component/Navigation/Nav.jsx"
import MainView from "../component/MainView/MainView.jsx"

const MainPage = () => {
    return (
        <div className="page-container">
            <Nav></Nav>
            <MainView></MainView>
        </div>
    )
}

export default MainPage