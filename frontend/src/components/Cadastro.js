import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';
import logo from '../img/hup-logo.png';
import cadastroImage from '../img/img-home.png';

const Cadastro = () => {
  const [userType, setUserType] = useState('cliente'); // Estado para o tipo de usuário
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === 'cliente') {
      navigate('/menu'); // Redireciona para o menu
    } else if (userType === 'empreendedor') {
      navigate('/empreendedor'); // Redireciona para CadastroProduto
    }
  };
  
  return (
    <div className="cadastro-container">
      <div className="cadastro-form">
        <img src={logo} alt="HÜPE Logo" className="cadastro-logo" />
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome</label>
            <input type="text" placeholder="Digite seu nome" required />
          </div>
          <div className="input-group">
            <label>E-mail</label>
            <input type="email" placeholder="Digite seu e-mail" required />
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input type="password" placeholder="Digite sua senha" required />
          </div>
          <div className="input-group user-type">
            <label>Tipo de usuário</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="cliente"
                  checked={userType === 'cliente'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Cliente
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="empreendedor"
                  checked={userType === 'empreendedor'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Empreendedor
              </label>
            </div>
          </div>
          <button type="submit" className="cadastro-button">
            Cadastrar
          </button>
        </form>
      </div>
      <div className="cadastro-image">
        <img src={cadastroImage} alt="Comida deliciosa" />
      </div>
    </div>
  );
};

export default Cadastro;
