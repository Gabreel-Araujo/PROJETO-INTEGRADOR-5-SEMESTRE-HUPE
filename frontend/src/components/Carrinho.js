import React, { useState, useEffect } from 'react';
import './Carrinho.css'; // Certifique-se de que o arquivo CSS está correto
import logo from '../img/hup-logo.png'; // Caminho para o logo
import carbonaraImage from '../img/carbonara.webp'; // Caminho para a imagem

const Carrinho = () => {
  const [items, setItems] = useState([]);
  const [addedMessage, setAddedMessage] = useState(''); // Estado para a mensagem de adição ao carrinho
  const [isOrderSent, setIsOrderSent] = useState(false); // Estado para controlar o envio do pedido
  const [deliveryTime, setDeliveryTime] = useState(null); // Estado para o tempo de entrega

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('carrinho')) || [];
    setItems(savedCart);
  }, []);

  // Função para adicionar ao carrinho
  const handleAddToCart = (item) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    setAddedMessage('Item adicionado ao carrinho!');
    setTimeout(() => setAddedMessage(''), 2000);
  };

  // Função para atualizar a quantidade (incremento/decremento)
  const handleQuantityChange = (id, amount) => {
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + amount, 0) }
          : item
      ).filter(item => item.quantity > 0); // Remove item caso a quantidade seja zero
    });
  };

  // Função para enviar o pedido
  const handleSendOrder = () => {
    setIsOrderSent(true);
    setDeliveryTime(Math.floor(Math.random() * 30) + 30); // Simula o tempo de entrega entre 30 e 60 minutos
    setTimeout(() => {
      setIsOrderSent(false);
      setDeliveryTime(null);
    }, 5000); // Exibe a animação por 5 segundos
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="carrinho-container">
      <header className="carrinho-header">
        <img src={logo} alt="HÜPE Logo" className="carrinho-logo" />
        <h1>Meu Carrinho</h1>
      </header>
      <div className="carrinho-content">
        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Carrinho vazio! Vamos adicionar algo ao carrinho?</p>
          </div>
        ) : (
          <div className="carrinho-items">
            {items.map((item) => (
              <div className="carrinho-item" key={item.id}>
                <img src={item.image || carbonaraImage} alt={item.name} className="item-image" />
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
        )}
        <div className="carrinho-summary">
          <h2>Minha compra</h2>
          {items.length > 0 && (
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  {item.name} ......... R$ {item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          )}
          <div className="total">
            <strong>Total: R$ {total.toFixed(2)}</strong>
          </div>
          {items.length > 0 && (
            <button className="send-order-button" onClick={handleSendOrder}>
              📞 Enviar para Ana
            </button>
          )}
        </div>
      </div>

      {/* Mensagem de sucesso ao adicionar item */}
      {addedMessage && <div className="added-message">{addedMessage}</div>}

      {/* Animação de envio do pedido */}
      {isOrderSent && (
        <div className="order-sent-animation">
          <p>Pedido enviado! Uhuu! 🎉</p>
          {deliveryTime && <p>Tempo estimado para entrega: {deliveryTime} minutos</p>}
        </div>
      )}
    </div>
  );
};

export default Carrinho;
