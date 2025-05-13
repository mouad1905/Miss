import React, { useState, useEffect } from "react";
import axios from "axios";

const initialFormState = {
  libelle: '',
  description: '',
  unite: '',
  cout: '',
  categorieArticle: '',
  categorieConsommable: '',
  expiration: '',
  rupture: '',
  categorieStockage: '',
};

export default function ArticleForm({ article, onClose, onSuccess }) {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const isEditMode = article && article.id;

  // Reset form when article changes
  useEffect(() => {
    if (isEditMode) {
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
      setForm(initialFormState);
    }
  }, [article]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.libelle) newErrors.libelle = "Le libellé est requis";
    if (form.cout && isNaN(Number(form.cout))) newErrors.cout = "Le coût doit être un nombre";
    if (form.rupture && isNaN(Number(form.rupture))) newErrors.rupture = "La rupture doit être un nombre";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Clean form data
    const cleanedForm = {
      ...form,
      cout: form.cout === '' ? null : Number(form.cout),
      rupture: form.rupture === '' ? null : Number(form.rupture),
      expiration: form.expiration || null
    };
    
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:8000/api/articles/${article.id}`, cleanedForm);
      } else {
        await axios.post('http://localhost:8000/api/articles', cleanedForm);
      }
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      if (error.response?.data?.error) {
        setErrors({ ...errors, server: error.response.data.error });
      } else {
        setErrors({ ...errors, server: "Une erreur s'est produite. Veuillez réessayer." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-orange-600">
            {isEditMode ? 'Modifier l\'article' : 'Ajouter un article'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {errors.server && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              name="libelle"
              placeholder="Libellé*"
              value={form.libelle}
              onChange={handleChange}
              className={`border ${errors.libelle ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
              required
            />
            {errors.libelle && <div className="text-red-500 text-xs mt-1">{errors.libelle}</div>}
          </div>

          <div>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>

          <div>
            <input
              type="text"
              name="unite"
              placeholder="Unité"
              value={form.unite}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>

          <div className="relative">
            <input
              type="number"
              name="cout"
              placeholder="Coût"
              value={form.cout}
              onChange={handleChange}
              className={`border ${errors.cout ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
            />
            {errors.cout && <div className="text-red-500 text-xs mt-1">{errors.cout}</div>}
          </div>

          <div>
            <select
              name="categorieArticle"
              value={form.categorieArticle}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="" disabled>-- Catégorie d'article --</option>
              <option value="équipement">électronique</option>
              <option value="informatique">informatique</option>
              <option value="fax">fax</option>
              <option value="écran">écran</option>
            </select>
          </div>

          <div>
            <select
              name="categorieConsommable"
              value={form.categorieConsommable}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="" disabled>-- Catégorie de consommable --</option>
              <option value="consommable">consommable</option>
              <option value="nonConsommable">non consommable</option>
            </select>
          </div>

          <div>
            <input
              type="date"
              name="expiration"
              placeholder="Date d'expiration"
              value={form.expiration}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>

          <div className="relative">
            <input
              type="number"
              name="rupture"
              placeholder="Rupture de stock"
              value={form.rupture}
              onChange={handleChange}
              className={`border ${errors.rupture ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
            />
            {errors.rupture && <div className="text-red-500 text-xs mt-1">{errors.rupture}</div>}
          </div>

          <div>
            <select
              name="categorieStockage"
              value={form.categorieStockage}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="" disabled>-- Catégorie de Stockage --</option>
              <option value="unite">unite</option>
              <option value="lot">lot</option>
            </select>
          </div>

          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Traitement en cours...' : (isEditMode ? 'Mettre à jour' : 'Ajouter')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 