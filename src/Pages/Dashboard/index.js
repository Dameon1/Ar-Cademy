import React from "react";
import './dashboard.css';
import PassportCard from "../../components/PassportCard";
import Card from "../../components/Cards";

function ContentVideoCards() {
    return (
        <div className="contentScrollContainer">
            <h1>Videos:</h1>
            <div className="hs">
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
