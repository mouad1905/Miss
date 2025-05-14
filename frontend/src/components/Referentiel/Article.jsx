import React, { useState, useEffect } from "react";
import ArticleList from "./ArticleList";
import ArticleForm from "./ArticleForm";
import Loader from "../../components/Loader";

export default function Article() {
  // État
  const [articles, setArticles] = useState([
    { id: 1, name: 'Ordinateur HP', category: 'Informatique', price: 1200 },
    { id: 2, name: 'Écran Dell', category: 'Écran', price: 350 },
    { id: 3, name: 'Imprimante Canon', category: 'Electronique', price: 280 },
    { id: 4, name: 'Téléphone Samsung', category: 'Electronique', price: 900 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Simuler le chargement
  useEffect(() => {
    console.log("Article component mounted");
  }, []);

  // Fonction pour charger les articles (modifiée pour utiliser des données statiques)
  const loadArticles = () => {
    try {
      setLoading(true);
      setError(null);
      // Donnée statiques déjà définies dans useState
      // Pas besoin de faire une requête API
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
    // Simule le rechargement
    console.log("Form submitted successfully");
    handleCloseForm();
  };

  // Fonction pour supprimer un article
  const handleDeleteClick = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        setIsDeleting(true);
        // Simuler une suppression
        setArticles(articles.filter(article => article.id !== id));
        console.log(`Article ${id} deleted`);
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
    <div className="bg-white p-6 rounded-lg shadow">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des articles</h1>
        <button
          onClick={handleAddClick}
          className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-4 py-2 rounded shadow"
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
        <button 
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded shadow"
        >
          Export PDF
        </button>
        <button 
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded shadow"
        >
          Export Excel
        </button>
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
