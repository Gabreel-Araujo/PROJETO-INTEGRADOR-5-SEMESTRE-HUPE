import React from 'react';
import './WelcomeSection.css';
import sampleImage from '../img/hup-logo.png'
import welcomeImage from '../img/img-home.png'

const WelcomeSection = () => {
  return (
    <section className="welcome-section">
      <div className="text-content">
        <img src={sampleImage} alt="Logo Hüpe" className="logo" /> 
        <h1>Bem-vindo ao HÜPE</h1>
        <p>Sua solução simples e eficiente para gerenciar pedidos e criar cardápios online personalizados.</p>
        <button className="cta-button">EXPERIMENTE AGORA</button>
      </div>
      <div className="image-content">
        <img src={welcomeImage} alt="imagem incial" /> 
      </div>
    </section>
  );
};

export default WelcomeSection;
