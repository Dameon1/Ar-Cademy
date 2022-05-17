import React from "react";
import './dashboard.css';
import PassportCard from "../PassportCard";


function ContentCards() {
    return (
        <div className="contentHolder">
            <p>dynamic and static content by author</p>
            <ul>
                <li>content boxes</li>
                <li>image</li>
                <li>title</li>
                <li>author</li>
                <li>content boxes</li>
                <li>image</li>
                <li>title</li>
                <li>author</li>
                <li>content boxes</li>
                <li>image</li>
                <li>title</li>
                <li>author</li>
                <li>content boxes</li>
                <li>image</li>
                <li>title</li>
                <li>author</li>
                <li>content boxes</li>
                <li>image</li>
                <li>title</li>
                <li>author</li>
                <li>content boxes</li>
                <li>image</li>
                <li>title</li>
                <li>author</li>
                <li>content boxes</li>
                <li>image</li>
                <li>title</li>
                <li>author</li>
                <li>content boxes</li>
                <li>image</li>
                <li>title</li>
                <li>author</li>
                <li>content boxes</li>
                <li>image</li>
                <li>title</li>
                <li>author</li>
                <li>content boxes</li>
                <li>image</li>
                <li>title</li>
                <li>author</li>
            </ul>
        </div>
    )
}

export function Dashboard() {
    let heroImage = 'https://img.youtube.com/vi/Ynfwggyl5rY/maxresdefault.jpg'
    return (
        <div className="dashboard">
            <PassportCard />

            <div >
                <ContentCards />
            </div>
            <div className="contentHolder">
                <p>dynamic and static content by author</p>
                <ul>
                    <li>content boxes</li>
                    <li>image</li>
                    <li>title</li>
                    <li>author</li>
                </ul>
            </div>


        </div>
    );
}
export default Dashboard;
