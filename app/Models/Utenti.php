<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Utenti extends Model{
    protected $table="utenti";
    protected $primaryKey="ID";
    protected $keyType="integer";
    public $timestamps=false;

    protected $fillable=[
        "Nome", "Cognome", "DataNascita", "username", "Password", "email"
    ];
    // 1-N hasMany 1-N inversa belongsTo

    // 1-1 hasOne 1-1 inversa belongsTo

    // N-N belongsToMany 
    public function dati_like(){
        return $this->hasMany("App\Models\dati_like");
    }
    public function dati_recensoni(){
        return $this->hasMany("App\Models\dati_recensioni");
    }
}
?>