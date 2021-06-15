
<?php
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Http;

class RandomIMGController extends Controller
{
    public function index() {
        return view('RandomIMG')->with('csrf_token' , csrf_token());
    }
    
    public function Prodotti($contenuto)
    {
        $json = Http::get('https://api.spoonacular.com/recipes/complexSearch?', [
            'query' => $contenuto,
            'number' => '2',
            'apiKey' => env('APIKEY'),            
        ]);
        if ($json->failed()) abort(500);

        return $json;
    }

    public function Random($contenuto)
    {
        $json = Http::get('https://foodish-api.herokuapp.com/api/images/'.$contenuto);
        if ($json->failed()) abort(500);

        return $json;
    }
}