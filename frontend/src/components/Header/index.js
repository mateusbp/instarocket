import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import Logo from '../../assets/logo.svg';
import Camera from '../../assets/camera.svg';

export default function Header() {
    return (
        <header id="main-header">
            <div className="header-content">
                <Link to="/">
                    <img src={Logo} alt="Ig" />
                </Link>
                <Link to="/new">
                    <img src={Camera} alt="Enviar publicaçao" />
                </Link>
            </div>
        </header>
    );
}