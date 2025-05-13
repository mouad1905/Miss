<?php
// app/Models/Article.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'libelle',
        'description',
        'unite',
        'cout',
        'expiration',
        'rupture',
        'categorieArticle',
        'categorieConsommable',
        'categorieStockage'
    ];    
}
