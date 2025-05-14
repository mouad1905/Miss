import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../services/api';
import useLoading from '../hooks/useLoading';
import LoadingOverlay from './LoadingOverlay';
import Loader from './Loader';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, startLoading, stopLoading] = useLoading(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        startLoading();
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1500));
        const data = await fetchArticles();
        setArticles(data);
      } catch (err) {
        console.error('Erreur lors du chargement des articles:', err);
        setError('Impossible de charger les articles. Veuillez réessayer plus tard.');
      } finally {
        stopLoading();
      }
    };

    loadArticles();
  }, [startLoading, stopLoading]);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Articles</h2>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader />
        </div>
      ) : articles.length > 0 ? (
        <ul className="space-y-2">
          {articles.map(article => (
            <li key={article.id} className="border p-4 rounded-md">
              <h3 className="font-medium">{article.title}</h3>
              <p className="text-gray-600 mt-1">{article.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Aucun article disponible.</p>
      )}
      
      {/* Exemple d'utilisation du LoadingOverlay pour une opération globale */}
      {/* <LoadingOverlay show={isGlobalLoading} message="Opération en cours..." /> */}
    </div>
  );
};

export default ArticleList; 