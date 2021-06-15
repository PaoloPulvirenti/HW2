<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class piatto extends Model{
    protected $table="piatto";
    protected $primaryKey="ID";
    protected $keyType="integer";
    public $timestamps=false;

    protected $fillable=[
        "img", "nome", "descrizione"
    ];
    
    public function dati_like(){
        return $this->hasMany("App\Models\dati_like");
    }

    public function dati_recensioni(){
        return $this->hasMany("App\Models\dati_recensioni");
    }

    public function ristorante(){
        return $this->hasMany("App\Models\ristorante");
    }
    
}
?>