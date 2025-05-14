import React, { useState, useEffect } from "react";

const initialFormState = {
  name: '',
  category: '',
  price: '',
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
        name: article.name || '',
        category: article.category || '',
        price: article.price || '',
      });
    } else {
      setForm(initialFormState);
    }
  }, [article]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Le nom est requis";
    if (form.price && isNaN(Number(form.price))) newErrors.price = "Le prix doit être un nombre";
    
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
    
    try {
      // Simuler un appel API
      console.log("Saving article:", form);
      // Attendre un peu pour simuler un appel réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      setErrors({ ...errors, server: "Une erreur s'est produite. Veuillez réessayer." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-800">
            {isEditMode ? 'Modifier l\'article' : 'Ajouter un article'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {errors.server && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom*
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
              required
            />
            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="" disabled>Sélectionner une catégorie</option>
              <option value="Informatique">Informatique</option>
              <option value="Écran">Écran</option>
              <option value="Electronique">Electronique</option>
              <option value="Fax">Fax</option>
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prix
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className={`border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
            />
            {errors.price && <div className="text-red-500 text-xs mt-1">{errors.price}</div>}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : isEditMode ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 