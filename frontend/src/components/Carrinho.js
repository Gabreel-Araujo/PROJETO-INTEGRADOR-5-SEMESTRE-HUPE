import React, { useState } from 'react';
import './Carrinho.css'; // Arquivo CSS para estilização
import logo from '../img/hup-logo.png'; // Caminho para o logo
import carbonaraImage from '../img/carbonara.webp'; // Imagem do prato

const Carrinho = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Massa a Carbonara', price: 35.99, quantity: 1, image: carbonaraImage },
    { id: 2, name: 'Massa a Carbonara', price: 35.99, quantity: 1, image: carbonaraImage },
    { id: 3, name: 'Massa a Carbonara', price: 35.99, quantity: 1, image: carbonaraImage },
    { id: 4, name: 'Massa a Carbonara', price: 35.99, quantity: 1, image: carbonaraImage },
  ]);

  const handleQuantityChange = (id, delta) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="carrinho-container">
      <header className="carrinho-header">
        <img src={logo} alt="HÜPE Logo" className="carrinho-logo" />
        <h1>Meu Carrinho</h1>
      </header>
      <div className="carrinho-content">
        <div className="carrinho-items">
          {items.map((item) => (
            <div className="carrinho-item" key={item.id}>
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h2>{item.name}</h2>
                <p>Preço: R$ {item.price.toFixed(2)}</p>
                <div className="item-quantity">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="carrinho-summary">
          <h2>Minha compra</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} ......... R$ {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <div className="total">
            <strong>Total: R$ {total.toFixed(2)}</strong>
          </div>
          <button className="send-order-button">📞 Enviar para Ana</button>
        </div>
      </div>
    </div>
  );
};

export default Carrinho;
