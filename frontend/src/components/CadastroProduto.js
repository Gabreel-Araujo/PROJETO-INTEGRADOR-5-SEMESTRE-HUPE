import React, { useState } from 'react';
import './CadastroProduto.css';
import logo from '../img/hup-logo.png';
import { productAPI } from '../services/apiService';

const CadastroProduto = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    available: true,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'price' ? parseFloat(value) || value : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Get entrepreneur ID from localStorage or context
      const entrepreneurId = localStorage.getItem('entrepreneurId');
      if (!entrepreneurId) {
        throw new Error('Entrepreneur ID not found');
      }

      const productData = {
        ...formData,
        entrepreneurId,
      };

      await productAPI.create(productData);
      // Clear form after successful submission
      setFormData({
        name: '',
        description: '',
        price: '',
        available: true,
      });
      alert('Produto cadastrado com sucesso!');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-produto-container">
      <div className="form-container">
        <img src={logo} alt="HÜPE Logo" className="cadastro-produto-logo" />
        <h1>Cadastro de Produto</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Digite o nome do produto"
                required
              />
            </div>
            <div className="form-group">
              <label>Descrição</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Digite a descrição do produto"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Preço</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Digite o preço"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label>Disponível</label>
              <select
                name="available"
                value={formData.available}
                onChange={handleChange}
              >
                <option value={true}>Sim</option>
                <option value={false}>Não</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="cadastro-produto-button"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroProduto;
