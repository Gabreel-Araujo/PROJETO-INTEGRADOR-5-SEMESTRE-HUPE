import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';
import logo from '../img/hup-logo.png';
import cadastroImage from '../img/img-home.png';
import api from '../services/apiService';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'CUSTOMER'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'radio' ? e.target.value : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Cadastrar usuário
      const response = await api.post('/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.userType
      });

      // Armazenar o token
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      // Se o usuário for empreendedor, crie um perfil de empreendedor
      if (formData.userType === 'ENTREPRENEUR') {
        await api.post('/entrepreneurs', {
          userId: response.data.user.id
        });
        navigate('/empreendedor');
      } else {
        // Se o usuário for cliente, crie um perfil de cliente
        await api.post('/customers', {
          userId: response.data.user.id
        });
        navigate('/menu');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.error || 'Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="cadastro-container">
      <div className="cadastro-form">
        <img src={logo} alt="HÜPE Logo" className="cadastro-logo" />
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="input-group">
            <label>Nome</label>
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group user-type">
            <label>Tipo de usuário</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="CUSTOMER"
                  checked={formData.userType === 'CUSTOMER'}
                  onChange={handleChange}
                />
                Cliente
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="ENTREPRENEUR"
                  checked={formData.userType === 'ENTREPRENEUR'}
                  onChange={handleChange}
                />
                Empreendedor
              </label>
            </div>
          </div>
          <button 
            type="submit" 
            className="cadastro-button"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        <p className="login-link">
          Já tem uma conta? <a href="/login">Faça login</a>
        </p>
      </div>
      <div className="cadastro-image">
        <img src={cadastroImage} alt="Comida deliciosa" />
      </div>
    </div>
  );
};

export default Cadastro;
