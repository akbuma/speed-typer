import React from 'react';
import { Link } from 'react-router-dom';
import { StyledNavbar } from '../styled/Navbar';

export default function Navbar() {
    return (
        <StyledNavbar>
                <div>
                    <Link to="/">
                        Learn.Build.<span>Type.</span>
                    </Link>
                </div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/highScores">High Scores</Link></li>
                </ul>
        </StyledNavbar>
    )
}
