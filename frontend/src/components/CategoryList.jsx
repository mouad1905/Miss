import React, { useState, useEffect } from 'react';
import useLoading from '../hooks/useLoading';
import Loader from './Loader';
import CategoryForm from './CategoryForm';
import ConfirmDialog from './ConfirmDialog';
import { fetchCategories, deleteCategory } from '../services/categoryApi';

const CategoryList = () => {
  console.log('CategoryList component is rendering'); // Message de débogage
  
  const [categories, setCategories] = useState([
    { id: 1, name: 'Fax' },
    { id: 2, name: 'Informatique' },
    { id: 3, name: 'Ecran' },
    { id: 4, name: 'electronique' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayCount, setDisplayCount] = useState(10);
  const [isLoading, startLoading, stopLoading] = useLoading(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // États pour les modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        startLoading();
        // Simuler un chargement de données depuis l'API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dans une vraie application, vous feriez un appel API ici
        // const data = await fetchCategories();
        // setCategories(data);
        
        stopLoading();
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
        stopLoading();
      }
    };

    loadCategories();
  }, [startLoading, stopLoading]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDisplayCountChange = (e) => {
    setDisplayCount(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredCategories.length;
  const totalPages = Math.ceil(totalItems / displayCount);
  const startIndex = (currentPage - 1) * displayCount;
  const endIndex = Math.min(startIndex + displayCount, totalItems);
  const currentItems = filteredCategories.slice(startIndex, endIndex);

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;
    
    try {
      startLoading();
      // Dans une vraie application, vous appelleriez l'API
      // await deleteCategory(categoryToDelete.id);
      
      // Mise à jour locale de l'état
      setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
      setIsConfirmOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    } finally {
      stopLoading();
    }
  };

  const handleFormSuccess = async () => {
    // Recharger les catégories après ajout/modification
    try {
      startLoading();
      // Dans une vraie application, vous feriez un appel API ici
      // const data = await fetchCategories();
      // setCategories(data);
      
      // Simulation pour la démo
      if (selectedCategory) {
        // Mise à jour
        setCategories(categories.map(cat => 
          cat.id === selectedCategory.id 
            ? { ...cat, name: selectedCategory.name + ' (modifié)' } 
            : cat
        ));
      } else {
        // Ajout
        const newId = Math.max(...categories.map(cat => cat.id)) + 1;
        setCategories([...categories, { id: newId, name: 'Nouvelle catégorie' }]);
      }
      
      stopLoading();
    } catch (error) {
      console.error('Erreur lors du rechargement des catégories:', error);
      stopLoading();
    }
  };

  const handleExportPDF = () => {
    console.log('Exporter en PDF');
    // Implémentez la logique d'exportation PDF ici
  };

  const handleExportExcel = () => {
    console.log('Exporter en Excel');
    // Implémentez la logique d'exportation Excel ici
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Liste des catégories des articles</h1>
      
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <span className="mr-2">Afficher</span>
          <select 
            className="border rounded px-2 py-1"
            value={displayCount}
            onChange={handleDisplayCountChange}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-2">éléments</span>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2">Rechercher :</span>
          <input 
            type="text" 
            className="border rounded px-3 py-1 w-64"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="mb-4 text-right">
        <button 
          className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md flex items-center justify-center ml-auto"
          onClick={handleAddCategory}
        >
          <span className="mr-1">+</span> Ajouter une catégorie d'article
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b cursor-pointer">
                <div className="flex items-center">
                  Libellé
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                  </svg>
                </div>
              </th>
              <th className="py-3 px-4 border-b text-center">Modifier</th>
              <th className="py-3 px-4 border-b text-center">Effacer</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{category.name}</td>
                <td className="py-3 px-4 border-b text-center">
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    onClick={() => handleEditCategory(category)}
                  >
                    Modifier
                  </button>
                </td>
                <td className="py-3 px-4 border-b text-center">
                  <button 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteClick(category)}
                  >
                    Effacer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div>
          Affichage de l'élément {startIndex + 1} à {endIndex} sur {totalItems} éléments
        </div>
        
        <div className="flex items-center">
          <button 
            className="border px-3 py-1 rounded-l disabled:opacity-50"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          
          <div className="border-t border-b px-3 py-1">
            {currentPage}
          </div>
          
          <button 
            className="border px-3 py-1 rounded-r disabled:opacity-50"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end space-x-2">
        <button 
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          onClick={handleExportPDF}
        >
          Export PDF
        </button>
        <button 
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          onClick={handleExportExcel}
        >
          Export Excel
        </button>
      </div>

      {/* Modals */}
      <CategoryForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        category={selectedCategory}
        onSuccess={handleFormSuccess}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer la catégorie "${categoryToDelete?.name}" ?`}
        confirmText="Supprimer"
      />
    </div>
  );
};

export default CategoryList; 