import React from "react";
import './dashboard.css';
import PassportCard from "../PassportCard";

function Card() {
    let src = 'https://avatars.githubusercontent.com/u/69483974?s=200&v=4'
    return (
        <div className="smallContentBox">
            <div className="smallContentImg">
                <img alt="sometext" className="" src={src}></img>
            </div>
            <p>Title</p>
            <p>Descirption</p>
        </div>
    )
}

function ContentVideoCards() {
    return (
        <div className="contentScrollContainer">
            <h1>Videos:</h1>
            <div className="hs">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div >
    )
}

function ContentSandboxCards() {
    return (
        <div className="contentScrollContainer">
            <h1>Sandbox Content</h1>
            <div className="hs">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div >
    )
}

export function Dashboard(props) {

    return (
        <div className="dashboard">
            <PassportCard isArweaveWalletConnected={props.isArweaveWalletConnected} />
            <ContentVideoCards />
            <ContentSandboxCards />
            <ContentSandboxCards />
        </div>
    );
}
export default Dashboard;
