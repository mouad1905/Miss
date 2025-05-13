import React from 'react';

const ArticleList = ({ articles, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full text-sm text-left text-gray-800">
        <thead className="bg-orange-500 text-white uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Libellé</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Unité</th>
            <th className="px-4 py-3">Coût</th>
            <th className="px-4 py-3">Équipement</th>
            <th className="px-4 py-3">Consommable</th>
            <th className="px-4 py-3">Expiration</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Stockage</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.length === 0 ? (
            <tr>
              <td colSpan="10" className="px-4 py-4 text-center text-gray-500">
                Aucun article trouvé
              </td>
            </tr>
          ) : (
            articles.map((article, index) => (
              <tr key={article.id || index} className="hover:bg-orange-100">
                <td className="px-4 py-2">{article.libelle || '-'}</td>
                <td className="px-4 py-2">{article.description || '-'}</td>
                <td className="px-4 py-2">{article.unite || '-'}</td>
                <td className="px-4 py-2">{article.cout || '-'}</td>
                <td className="px-4 py-2">{article.categorieArticle || '-'}</td>
                <td className="px-4 py-2">{article.categorieConsommable || '-'}</td>
                <td className="px-4 py-2">{article.expiration || '-'}</td>
                <td className="px-4 py-2">{article.rupture || '-'}</td>
                <td className="px-4 py-2">{article.categorieStockage || '-'}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => onEdit(article)}
                      className="bg-orange-500 text-white border border-white px-2 py-1 rounded hover:bg-orange-600"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => onDelete(article.id)}
                      className="bg-white text-orange-500 border border-orange-500 px-2 py-1 rounded hover:bg-orange-100"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleList; 