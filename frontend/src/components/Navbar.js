import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation(); // Usando o hook para pegar a URL atual

  // Condicionalmente ocultar o "Perfil" em Login e Cadastro
  const showPerfil = !['/login', '/cadastro'].includes(location.pathname);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/cadastro">Cadastro</Link>
        </li>
        
       
        {showPerfil && (
          <li className="perfil-item">
            <Link to="/perfil">Perfil</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
