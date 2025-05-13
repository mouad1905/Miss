<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Liste des articles</title>
  <style>
    body {
      font-family: sans-serif;
    }

    .table-container {
      text-align: center;
      margin-top: 20px;
    }

    table {
      display: inline-table;
      border-collapse: separate;
      border-spacing: 0;
      border: 1px solid #000;
      border-radius: 10px;
      overflow: hidden;
    }

    th, td {
      border: 1px solid #000;
      padding: 8px;
      text-align: left;
    }

    thead th {
      background-color: #f97316; /* perfect orange (Tailwind's orange-500) */
      color: white;
    }

    thead th:first-child {
      border-top-left-radius: 10px;
    }

    thead th:last-child {
      border-top-right-radius: 10px;
    }

    tbody tr:last-child td:first-child {
      border-bottom-left-radius: 10px;
    }

    tbody tr:last-child td:last-child {
      border-bottom-right-radius: 10px;
    }
  </style>
</head>
<body>
  <h2 style="text-align: center;">Liste des articles</h2>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Libellé</th>
          <th>Description</th>
          <th>Unité</th>
          <th>Coût</th>
          <th>Équipement</th>
          <th>Consommable</th>
          <th>Expiration</th>
          <th>Stock</th>
          <th>Stockage</th>
        </tr>
      </thead>
      <tbody>
        @foreach($articles as $article)
          <tr>
            <td>{{ $article->libelle }}</td>
            <td>{{ $article->description }}</td>
            <td>{{ $article->unite }}</td>
            <td>{{ $article->cout }}</td>
            <td>{{ $article->categorieArticle }}</td>
            <td>{{ $article->categorieConsommable }}</td>
            <td>{{ $article->expiration ?? '-' }}</td>
            <td>{{ $article->rupture ?? '-' }}</td>
            <td>{{ $article->categorieStockage }}</td>
          </tr>
        @endforeach
      </tbody>
    </table>
  </div>
</body>
</html>
