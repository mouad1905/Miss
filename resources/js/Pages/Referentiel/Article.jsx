import React, { useState, useEffect } from "react";
import ArticleList from "./ArticleList";
import ArticleForm from "./ArticleForm";
import Loader from "../../css/Loader";
import ArticleService from "../../services/ArticleService";

export default function Article() {
  // État
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Charger les articles au chargement du composant
  useEffect(() => {
    loadArticles();
  }, []);

  // Fonction pour charger les articles
  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ArticleService.getAll();
      setArticles(data);
    } catch (err) {
      setError("Erreur lors du chargement des articles. Veuillez réessayer.");
      console.error("Erreur de chargement:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour ouvrir le formulaire d'ajout
  const handleAddClick = () => {
    setSelectedArticle(null);
    setIsFormVisible(true);
  };

  // Fonction pour ouvrir le formulaire d'édition
  const handleEditClick = (article) => {
    if (!article || !article.id) {
      console.error("Article invalide pour l'édition");
      return;
    }
    setSelectedArticle({...article});
    setIsFormVisible(true);
  };

  // Fonction pour fermer le formulaire
  const handleCloseForm = () => {
    setIsFormVisible(false);
    // Attendre un peu pour éviter les conflits d'état
    setTimeout(() => setSelectedArticle(null), 100);
  };

  // Fonction appelée après la sauvegarde
  const handleFormSuccess = () => {
    loadArticles();
    handleCloseForm();
  };

  // Fonction pour supprimer un article
  const handleDeleteClick = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        setIsDeleting(true);
        await ArticleService.delete(id);
        // Recharger les articles après la suppression
        loadArticles();
      } catch (err) {
        setError("Erreur lors de la suppression. Veuillez réessayer.");
        console.error("Erreur de suppression:", err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Affichage du chargement
  if (loading && !isDeleting) {
    return <Loader />;
  }

  return (
    <div className="bg-orange-50 min-h-screen p-6 rounded-xl">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des articles</h1>
        <button
          onClick={handleAddClick}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded shadow"
          disabled={isDeleting}
        >
          + Ajouter un article
        </button>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded shadow">
          {error}
        </div>
      )}

      {/* Liste des articles */}
      <ArticleList 
        articles={articles} 
        onEdit={handleEditClick} 
        onDelete={handleDeleteClick} 
      />

      {/* Actions supplémentaires */}
      <div className="flex justify-end mt-6 space-x-4">
        <a 
          href="http://localhost:8000/articles/export/pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded shadow"
        >
          Export PDF
        </a>
        <a 
          href="http://localhost:8000/articles/export/excel" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded shadow"
        >
          Export Excel
        </a>
      </div>

      {/* Formulaire modal */}
      {isFormVisible && (
        <ArticleForm
          article={selectedArticle}
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
