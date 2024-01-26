import React from 'react';
import {Link} from 'react-router-dom'
import './index.css';

const Header = () => {
    return (
        <header className="row">
            <h1 className="title">React Tailwind PRG6 - Jaap Moerkerk</h1>
            <nav>
                <Link to={`/`}>
                    <button className="nav-btn">Home</button>
                </Link>

                <Link to={`/about`}>
                    <button className="nav-btn">About</button>
                </Link>
            </nav>
        </header>
    );
};

export default Header;