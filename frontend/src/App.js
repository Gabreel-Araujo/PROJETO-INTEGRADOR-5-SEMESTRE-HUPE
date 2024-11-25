import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import WelcomeSection from './components/WelcomeSection.js';
import Login from "./components/Login.js";
import Cadastro from "./components/Cadastro.js"
import CadastroProduto from './components/CadastroProduto.js';
import Menu from './components/Menu.js';
import Carrinho from './components/Carrinho.js';
import Perfil from './components/perfil.js';

const Home = () => (
  <div>
    <WelcomeSection />
  </div>
);
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/empreendedor" element={<CadastroProduto />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/perfil" element={<Perfil />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
