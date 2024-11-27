import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Restaurantes.css'; // Arquivo CSS para estilização (opcional)

const Restaurantes = () => {
  const navigate = useNavigate();

  const restaurantes = [
    { id: 'ana', name: 'Restaurante da Ana' },
    { id: 'marcela', name: 'Restaurante da Marcela' },
    { id: 'fernanda', name: 'Restaurante da Fernanda' },
  ];

  const handleSelect = (id) => {
    navigate(`/menu?restaurante=${id}`); // Redireciona para o menu com o restaurante selecionado
  };

  return (
    <div className="restaurantes-container">
      <h1>Escolha um Restaurante</h1>
      <div className="restaurantes-list">
        {restaurantes.map((restaurante) => (
          <div
            key={restaurante.id}
            className="restaurante-card"
            onClick={() => handleSelect(restaurante.id)}
          >
            <h2>{restaurante.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurantes;
