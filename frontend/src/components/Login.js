import React from "react";
import "./Login.css";
import logo from "../img/hup-logo.png"; 
import foodImage from "../img/login-img.png"; 

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="HÜPE Logo" className="login-logo" />
        <h1>Login</h1>
        <form>
          <div className="input-group">
            <input type="text" placeholder="Username" />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" />
          </div>
          <a href="/" className="forgot-password">
            Forgot Password?
          </a>
          <button type="submit" className="login-button">
            Login
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
