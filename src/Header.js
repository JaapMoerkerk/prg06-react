import React from 'react';
import {Link} from 'react-router-dom'
import './index.css';

const Header = () => {
    return (
        <header className="row">
            <h1 className="title">React Tailwind PRG6 - Jaap Moerkerk</h1>
            <nav>
                {/*<a><Link to={"/"}</a>*/}
            </nav>
        </header>
    );
};

export default Header;