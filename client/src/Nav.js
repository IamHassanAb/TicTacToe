import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <>
        <div style={{backgroundColor: 'lightblue'}}>
            <Link to="/">Home</Link><br/>
            <Link to="/Game">Game</Link>
        </div>
        </>
    )
}