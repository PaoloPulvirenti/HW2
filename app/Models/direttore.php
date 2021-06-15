<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class direttore extends Model{
    protected $table="direttore";
    protected $primaryKey="CF";
    protected $keyType="string";
    public $timestamps=false;

    protected $fillable=[
        "FK_Ristorante","Nome", "Cognome", "DataNascita", "DataAssunzione" , "username", "password","email"
    ];
    // 1-N hasMany 1-N inversa belongsTo

    // 1-1 hasOne 1-1 inversa belongsTo

    // N-N belongsToMany 
    public function ristorante(){
        return $this->hasMany("App\Models\ristorante");
    }
}
?>