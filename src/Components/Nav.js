import React from 'react';

import '../CSS/nav.css';

function Nav(props) {
    return (
        <div className = "nav">
            <ul>
                <li>
                    <a><i class="fas fa-database"></i> MovieDB</a>
                </li>
                <li>
                    <a>Home</a>
                    <a>Genres</a>
                    <a>About</a>
                </li>
            </ul>
        </div>
    );
}

export default Nav;