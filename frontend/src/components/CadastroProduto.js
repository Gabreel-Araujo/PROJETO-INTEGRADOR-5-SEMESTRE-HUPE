import React from 'react';
import './CadastroProduto.css';
import logo from '../img/hup-logo.png'; 

const CadastroProduto = () => {
  return (
    <div className="cadastro-produto-container">
      <div className="form-container">
        <img src={logo} alt="HÜPE Logo" className="cadastro-produto-logo" />
        <h1>Cadastro de Produto</h1>
        <form>
          <div className="form-row">
            <div className="form-group">
              <label>Nome</label>
              <input type="text" placeholder="Digite o nome do produto" />
            </div>
            <div className="form-group">
              <label>Descrição</label>
              <input type="text" placeholder="Digite a descrição do produto" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Tipo</label>
              <input type="text" placeholder="Digite o tipo do produto" />
            </div>
            <div className="form-group">
              <label>Preço</label>
              <input type="text" placeholder="Digite o preço" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Imagem</label>
              <div className="upload-container">
                <input type="file" />
              </div>
            </div>
          </div>
          <button type="submit" className="cadastro-produto-button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroProduto;
