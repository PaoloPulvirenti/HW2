<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class dati_recensioni extends Model{
    protected $table="dati_recensioni";
    protected $primaryKey="ID";
    protected $keyType="integer";
    public $timestamps=false;
    
    protected $fillable=[
        "fk_piatto", "fk_utente", "commento", "data"
    ];

    public function utenti(){
        return $this->belongsTo("App\Models\Utenti");
    }
    
    public function piatto(){
        return $this->belongsTo("App\Models\piatto");
    }
}
?>