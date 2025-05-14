import api from './api';

/**
 * Récupérer toutes les catégories d'articles
 * @returns {Promise<Array>} Liste des catégories
 */
export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    throw error;
  }
};

/**
 * Récupérer une catégorie par son ID
 * @param {number} id - ID de la catégorie
 * @returns {Promise<Object>} Données de la catégorie
 */
export const fetchCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la catégorie ${id}:`, error);
    throw error;
  }
};

/**
 * Créer une nouvelle catégorie
 * @param {Object} categoryData - Données de la catégorie
 * @returns {Promise<Object>} Catégorie créée
 */
export const createCategory = async (categoryData) => {
  try {
    const response = await api.post('/categories', categoryData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    throw error;
  }
};

/**
 * Mettre à jour une catégorie existante
 * @param {number} id - ID de la catégorie
 * @param {Object} categoryData - Nouvelles données de la catégorie
 * @returns {Promise<Object>} Catégorie mise à jour
 */
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la catégorie ${id}:`, error);
    throw error;
  }
};

/**
 * Supprimer une catégorie
 * @param {number} id - ID de la catégorie à supprimer
 * @returns {Promise<Object>} Résultat de la suppression
 */
export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression de la catégorie ${id}:`, error);
    throw error;
  }
}; 