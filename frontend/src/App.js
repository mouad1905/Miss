import { useState, useEffect } from 'react';
import './App.css';
import Loader from './components/Loader';
import Dashboard from './components/Dashboard';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement initial de l'application
    const timer = setTimeout(() => {
      setLoading(false);
      console.log('App loading complete');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <Loader />
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export default App;
