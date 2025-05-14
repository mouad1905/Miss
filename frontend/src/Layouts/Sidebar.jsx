import React from 'react';

const Sidebar = ({ setCurrentSection }) => {
  console.log("Sidebar component is rendering");
  
  const handleSectionChange = (section) => {
    console.log("Changing section to:", section);
    setCurrentSection(section);
  };
  
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="text-xl font-bold mb-6">Gestion d'articles</div>
      
      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleSectionChange('dashboard')}
              className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Tableau de bord
            </button>
          </li>
          <li>
            <div className="px-4 py-2 text-gray-400 text-sm">Référentiel</div>
            <ul className="pl-2 space-y-1">
              <li>
                <button
                  onClick={() => handleSectionChange('categories')}
                  className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  Catégories d'articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionChange('article')}
                  className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  Articles
                </button>
              </li>
            </ul>
          </li>
          <li>
            <div className="px-4 py-2 text-gray-400 text-sm">Utilisateurs</div>
            <ul className="pl-2 space-y-1">
              <li>
                <button
                  onClick={() => handleSectionChange('users')}
                  className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  Gestion des utilisateurs
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 