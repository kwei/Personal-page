import './loader.scss';
import React from 'react';

const Loader = () => {

    return (
        <div className={"loader-bar"}>
            <div className={"bar-block"}><div className={"bar bar1"}></div></div>
            <div className={"bar-block"}><div className={"bar bar2"}></div></div>
            <div className={"bar-block"}><div className={"bar bar3"}></div></div>
            <div className={"bar-block"}><div className={"bar bar4"}></div></div>
            <div className={"bar-block"}><div className={"bar bar5"}></div></div>
        </div>
    );
};

export default Loader;