import React, { Suspense } from "react";

import Loader from "./component/Loader/Loader.jsx";
import ErrorBoundary from "./component/ErrorBoundary/ErrorBoundary.jsx";
import MainPage from "./pages/MainPage.jsx"


const Main = () => {
    return (
        <ErrorBoundary fallback={<p>load failed</p>}>
            <Suspense fallback={<Loader/>}>
                <MainPage/>
            </Suspense>
        </ErrorBoundary>
    );
};

export default Main;