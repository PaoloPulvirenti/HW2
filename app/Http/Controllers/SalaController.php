
<?php
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Http;

class SalaController extends Controller
{
    public function index() {
        return view('Sala')->with('csrf_token' , csrf_token());
    }
}