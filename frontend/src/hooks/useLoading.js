import { useState } from 'react';

/**
 * Hook personnalisé pour gérer l'état de chargement
 * @param {boolean} initialState - État initial (chargement ou non)
 * @returns {Array} - [isLoading, startLoading, stopLoading]
 */
export default function useLoading(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return [isLoading, startLoading, stopLoading];
} 