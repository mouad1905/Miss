import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export default {
  /**
   * Récupère tous les articles
   * @returns {Promise} Promesse contenant les articles
   */
  getAll: async () => {
    try {
      const response = await axios.get(`${API_URL}/articles`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
      throw error;
    }
  },

  /**
   * Récupère un article par son ID
   * @param {number} id - ID de l'article
   * @returns {Promise} Promesse contenant l'article
   */
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'article #${id}:`, error);
      throw error;
    }
  },

  /**
   * Crée un nouvel article
   * @param {Object} articleData - Données de l'article
   * @returns {Promise} Promesse contenant l'article créé
   */
  create: async (articleData) => {
    try {
      const response = await axios.post(`${API_URL}/articles`, articleData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
      throw error;
    }
  },

  /**
   * Met à jour un article existant
   * @param {number} id - ID de l'article
   * @param {Object} articleData - Nouvelles données de l'article
   * @returns {Promise} Promesse contenant l'article mis à jour
   */
  update: async (id, articleData) => {
    try {
      const response = await axios.put(`${API_URL}/articles/${id}`, articleData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'article #${id}:`, error);
      throw error;
    }
  },

  /**
   * Supprime un article
   * @param {number} id - ID de l'article à supprimer
   * @returns {Promise} Promesse de suppression
   */
  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'article #${id}:`, error);
      throw error;
    }
  }
}; 