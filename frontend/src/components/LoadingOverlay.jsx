import React from 'react';
import Loader from './Loader';

/**
 * Composant de superposition de chargement pour l'ensemble de l'application
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.show - Indique si la superposition doit être affichée
 * @param {string} props.message - Message optionnel à afficher
 */
const LoadingOverlay = ({ show, message = 'Chargement en cours...' }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
        <Loader />
        {message && <p className="mt-4 text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingOverlay; 