import React, { Suspense } from "react";

import Loader from "./component/Loader/Loader.jsx";
import ErrorBoundary from "./component/ErrorBoundary/ErrorBoundary.jsx";
import HomePage from "./pages/HomePage.jsx"


const Home = () => {
    return (
        <ErrorBoundary fallback={<p>load failed</p>}>
            <Suspense fallback={<Loader/>}>
                <HomePage/>
            </Suspense>
        </ErrorBoundary>
    );
};

export default Home;