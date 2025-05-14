import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ModalAjouterArticle({ article, onClose, onSuccess }) {
  console.log("ModalAjouterArticle rendu avec article:", article);
  
  const [form, setForm] = useState({
    libelle: '',
    description: '',
    unite: '',
    cout: '',
    categorieArticle: '',
    categorieConsommable: '',
    expiration: '',
    rupture: '',
    categorieStockage: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Log pour déboguer
    console.log("ModalAjouterArticle - useEffect déclenché avec article:", article);
    
    if (article && article.id) {
      console.log("Initialisation du formulaire avec l'article ID:", article.id);
      setIsEditMode(true);
      setForm({
        libelle: article.libelle || '',
        description: article.description || '',
        unite: article.unite || '',
        cout: article.cout || '',
        categorieArticle: article.categorieArticle || '',
        categorieConsommable: article.categorieConsommable || '',
        expiration: article.expiration || '',
        rupture: article.rupture || '',
        categorieStockage: article.categorieStockage || '',
      });
    } else {
      console.log("Pas d'article valide reçu, formulaire vide");
      setIsEditMode(false);
      // Réinitialiser le formulaire en mode création
      setForm({
        libelle: '',
        description: '',
        unite: '',
        cout: '',
        categorieArticle: '',
        categorieConsommable: '',
        expiration: '',
        rupture: '',
        categorieStockage: '',
      });
    }
  }, [article]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Nettoyer les données du formulaire
    const cleanedForm = {
      ...form,
      // S'assurer que les champs numériques sont envoyés comme nombres ou null
      cout: form.cout === '' ? null : Number(form.cout),
      rupture: form.rupture === '' ? null : Number(form.rupture),
      // S'assurer que les dates sont bien formatées
      expiration: form.expiration || null
    };
    
    console.log("Données nettoyées:", cleanedForm);
    
    try {
      if (isEditMode && article && article.id) {
        console.log(`Mise à jour de l'article ID: ${article.id} avec les données:`, cleanedForm);
        // Mise à jour d'un article existant
        await axios.put(`http://localhost:8000/api/articles/${article.id}`, cleanedForm);
      } else {
        console.log("Création d'un nouvel article");
        // Création d'un nouvel article
        await axios.post('http://localhost:8000/api/articles', cleanedForm);
      }
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un code de statut
        console.error("Données de réponse:", error.response.data);
        console.error("Statut:", error.response.status);
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        console.error("Requête sans réponse:", error.request);
      } else {
        // Une erreur s'est produite lors de la configuration de la requête
        console.error("Erreur de configuration:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4 text-orange-600">
          {isEditMode ? 'Modifier l\'article' : 'Ajouter un article'}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="libelle"
            placeholder="Libellé"
            value={form.libelle}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          />

          <input
            name="unite"
            placeholder="Unite"
            value={form.unite}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          />

          <input
            type="number"
            name="cout"
            placeholder="Coût"
            value={form.cout}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          />

          <select
            name="categorieArticle"
            value={form.categorieArticle}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="" disabled>-- Catégorie d'article --</option>
            <option value="équipement">électronique</option>
            <option value="informatique">informatique</option>
            <option value="fax">fax</option>
            <option value="écran">écran</option>
          </select>

          <select
            name="categorieConsommable"
            value={form.categorieConsommable}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="" disabled>-- Catégorie de consommable --</option>
            <option value="consommable">consommable</option>
            <option value="nonConsommable">non consommable</option>
          </select>

          <input
            type="date"
            name="expiration"
            placeholder="Date d'expiration"
            value={form.expiration}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          />

          <input
            type="number"
            name="rupture"
            placeholder="Rupture de stock"
            value={form.rupture}
            onChange={(e) => {
              // Vérifier si la valeur est numérique valide
              const value = e.target.value;
              if (value === '' || !isNaN(Number(value))) {
                handleChange(e);
              }
            }}
            className="border border-gray-300 rounded px-3 py-2"
          />

          <select
            name="categorieStockage"
            value={form.categorieStockage}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="" disabled>-- Catégorie de Stockage --</option>
            <option value="unite">unite</option>
            <option value="lot">lot</option>
          </select>

          <div className="col-span-2 flex flex-col items-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded w-full disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-transparent text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white font-semibold px-4 py-2 rounded w-full disabled:opacity-50"
            >
              {loading ? 'Traitement en cours...' : (isEditMode ? 'Modifier' : 'Ajouter')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
