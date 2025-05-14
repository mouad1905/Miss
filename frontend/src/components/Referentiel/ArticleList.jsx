import React from 'react';

const ArticleList = ({ articles, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full text-sm text-left text-gray-800">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Nom</th>
            <th className="px-4 py-3">Catégorie</th>
            <th className="px-4 py-3">Prix</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                Aucun article trouvé
              </td>
            </tr>
          ) : (
            articles.map((article, index) => (
              <tr key={article.id || index} className="hover:bg-gray-50 border-b">
                <td className="px-4 py-2">{article.name || '-'}</td>
                <td className="px-4 py-2">{article.category || '-'}</td>
                <td className="px-4 py-2">{article.price ? `${article.price} €` : '-'}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(article)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => onDelete(article.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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