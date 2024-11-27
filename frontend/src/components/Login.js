import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../img/hup-logo.png";
import foodImage from "../img/login-img.png";
import { userAPI } from "../services/apiService";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      // First try to register if user doesn't exist
      try {
        await userAPI.register({
          name: "Test User",
          email: formData.email,
          password: formData.password,
          role: "CUSTOMER"
        });
      } catch (err) {
        // Ignore registration error as user might already exist
        console.log("Registration error (user might already exist):", err);
      }

      // Then try to login
      const response = await userAPI.login(formData);
      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirect based on user role
      if (user.role === 'ENTREPRENEUR') {
        navigate('/empreendedor');
      } else if (user.role === 'CUSTOMER') {
        navigate('/restaurantes');
      } else {
        navigate('/admin');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.error || 
        "Erro ao fazer login. Verifique suas credenciais."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="HÜPE Logo" className="login-logo" />
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>
          <a href="/forgot-password" className="forgot-password">
            Esqueceu a senha?
          </a>
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="signup-prompt">
          Novo Usuário? <a href="/cadastro">Cadastre-se</a>
        </p>
      </div>
      <div className="login-image">
        <img src={foodImage} alt="Delicious Food" />
      </div>
    </div>
  );
};

export default Login;
