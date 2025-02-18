import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionar após exclusão
import { userAPI } from "../services/apiService"; // Importando o userAPI
import "./perfil.css";

const Perfil = () => {
  const navigate = useNavigate(); // Hook para navegação
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Carrega os dados do usuário do localStorage ao montar o componente
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setFormData({
        id: storedUser.id,
        name: storedUser.name,
        email: storedUser.email,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Fazendo a chamada ao endpoint de atualização
      await userAPI.update(formData.id, {
        name: formData.name,
        email: formData.email,
      });

      setSuccessMessage("Perfil atualizado com sucesso!");

      // Atualiza o localStorage com os novos dados do usuário
      const updatedUser = { ...JSON.parse(localStorage.getItem("user")), ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      setErrorMessage("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  const handleDelete = () => {
    // Remover os dados do usuário do localStorage
    localStorage.removeItem("user");

    // Redirecionar o usuário para a página de login ou home após exclusão
    navigate("/login"); // ou "/home" dependendo de sua lógica de navegação
  };

  return (
    <div className="perfil-container">
      <h1>Meu Perfil</h1>
      <form onSubmit={handleSubmit} className="perfil-form">
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit">Salvar Alterações</button>
      </form>

      {/* Botão para excluir o perfil */}
      <button className="delete-button" onClick={handleDelete}>
        Excluir Perfil
      </button>
    </div>
  );
};

export default Perfil;
