<?php
namespace App\Exports;

use App\Models\Article;
use Maatwebsite\Excel\Concerns\FromCollection;

class ArticlesExport implements FromCollection
{
    public function collection()
    {
        return Article::select('libelle',
  "description" ,
  "unite" ,
  "cout" ,
  "expiration" ,
  "rupture" ,
  "categorieArticle" ,
  "categorieConsommable" ,
  "categorieStockage",)->get();
    }
}
