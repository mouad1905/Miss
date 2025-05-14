import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Rediriger vers la page de connexion en cas d'erreur d'authentification
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const fetchArticles = async () => {
  try {
    const response = await api.get('/articles');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    throw error;
  }
};

export const fetchArticle = async (id) => {
  try {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'article ${id}:`, error);
    throw error;
  }
};

export const createArticle = async (articleData) => {
  try {
    const response = await api.post('/articles', articleData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    throw error;
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    const response = await api.put(`/articles/${id}`, articleData);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'article ${id}:`, error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'article ${id}:`, error);
    throw error;
  }
};

export default api; 