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


function ContentCards() {
    return (
        <div className="contentScrollContainer">
            <h1>dynamic and static content by author</h1>
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
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div >
    )
}

export function Dashboard() {
    let heroImage = 'https://img.youtube.com/vi/Ynfwggyl5rY/maxresdefault.jpg'
    return (
        <div className="dashboard">
            <PassportCard />
            <ContentCards />
            <ContentCards />
        </div>
    );
}
export default Dashboard;
