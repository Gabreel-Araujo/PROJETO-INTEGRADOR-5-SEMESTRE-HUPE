import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css'; // Arquivo CSS para estilização
import logo from '../img/hup-logo.png'; // Caminho para o logo
import carbonara from '../img/carbonara.webp'; // Caminho para a imagem do prato
import almondegas from '../img/almondegas.webp'; // Caminho para a imagem do prato
import ceaserSalad from '../img/salada.webp'; // Caminho para a imagem do prato
import lasanha from '../img/lasanha.webp';

const Menu = () => {
  const navigate = useNavigate();
  const items = [
    {
      id: 1,
      name: 'Massa a Carbonara',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a venenatis augue.',
      price: 35.99,
      image: carbonara,
    },
    {
      id: 2,
      name: 'Massa com Almôndegas',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a venenatis augue.',
      price: 45.99,
      image: almondegas,
    },
    {
      id: 3,
      name: 'Ceaser Salad',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a venenatis augue.',
      price: 18.99,
      image: ceaserSalad,
    },
    {
      id: 4,
      name: 'Lasanha de Berinjela',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a venenatis augue.',
      price: 25.99,
      image: lasanha,
    },
  ];

  return (
    <div className="menu-container">
      <header className="menu-header">
        <img src={logo} alt="HÜPE Logo" className="menu-logo" />
        <h1>Restaurante da Ana</h1>
      </header>
      <div className="menu-items">
        {items.map((item) => (
          <div className="menu-item" key={item.id}>
            <img src={item.image} alt={item.name} className="menu-item-image" />
            <div className="menu-item-details">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>
                <strong>Preço: R$ {item.price.toFixed(2)}</strong>
              </p>
              <button className="add-to-cart-button">Adicionar ao carrinho</button>
            </div>
          </div>
        ))}
      </div>
      <div className="menu-actions">
      <button className="finalize-button" onClick={() => navigate('/carrinho')}>
        Finalizar
      </button>
      <button className="view-cart-button" onClick={() => navigate('/carrinho')}>
        Ver Carrinho
      </button>
    </div>
    </div>
  );
};

export default Menu;
