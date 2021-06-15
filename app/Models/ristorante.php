<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ristorante extends Model{
    protected $table="ristorante";
    protected $primaryKey="ID";
    protected $keyType="integer";
    public $timestamps=false;

    protected $fillable=[
        "nome", "N_Dipendenti"
    ];

        
    public function piatto(){
        return $this->belongsTo("App\Models\piatto");
    }

    public function direttore(){
        return $this->belongsTo("App\Models\direttore.php");
    }
}
?>