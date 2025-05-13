<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Exports\ArticlesExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;


class ArticleController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Formater correctement la date d'expiration si elle existe
            // $expiration = !empty($request->expiration) ? date('Y-m-d', strtotime($request->expiration)) : null;
            $expiration = !empty($request->expiration)
            ? Carbon::createFromFormat('d-m-Y', $request->expiration)->format('Y-m-d')
            : null;            
            // Formater rupture comme nombre ou null
            $rupture = is_numeric($request->rupture) ? $request->rupture : null;
            
            $article = Article::create([
                'libelle' => $request->libelle,
                'description' => $request->description,
                'unite' => $request->unite,
                'cout' => $request->cout,
                'expiration' => $expiration,
                'rupture' => $rupture,
                'categorieArticle' => $request->categorieArticle,
                'categorieConsommable' => $request->categorieConsommable,
                'categorieStockage' => $request->categorieStockage,
            ]);

            return response()->json([$article], 201); // <-- retour sous forme d'array
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la création: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function index()
    {
        $articles = Article::all();
        \Log::info('Articles récupérés: ' . json_encode($articles));
        return response()->json($articles);
    }
    public function exportExcel()
{
    return Excel::download(new ArticlesExport, 'articles.xlsx');
}

public function exportPdf()
{
    $articles = Article::all();
    $pdf = Pdf::loadView('articles.pdf', compact('articles'));
    return $pdf->download('articles.pdf');
}
public function update(Request $request, $id)
{
    try {
        // Log pour déboguer
        \Log::info('Update article avec ID: ' . $id);
        \Log::info('Données reçues: ' . json_encode($request->all()));
        
        // Formater correctement la date d'expiration si elle existe
        $expiration = !empty($request->expiration) ? date('Y-m-d', strtotime($request->expiration)) : null;
        
        // Formater rupture comme nombre ou null
        $rupture = is_numeric($request->rupture) ? $request->rupture : null;
        
        $article = Article::findOrFail($id);
        $article->update([
            'libelle' => $request->libelle,
            'description' => $request->description,
            'unite' => $request->unite,
            'cout' => $request->cout,
            'expiration' => $expiration,
            'rupture' => $rupture,
            'categorieArticle' => $request->categorieArticle,
            'categorieConsommable' => $request->categorieConsommable,
            'categorieStockage' => $request->categorieStockage,
        ]);

        return response()->json($article, 200);
    } catch (\Exception $e) {
        \Log::error('Erreur lors de la mise à jour: ' . $e->getMessage());
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

public function destroy($id)
{
    $article = Article::findOrFail($id);
    $article->delete();
    
    return response()->json(null, 204);
}
}
