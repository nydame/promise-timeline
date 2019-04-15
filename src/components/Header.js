import React from 'react';
import logo from '../logo.svg';

function Header(props) {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>
                Promise Timeline Challenge
          </h1>
            <a
                className="App-link"
                href="https://github.com/nydame/promise-timeline"
                target="_blank"
                rel="noopener noreferrer"
            >
                Here's a handy link to the repo
          </a> :)
        </header>);
}

export default Header;