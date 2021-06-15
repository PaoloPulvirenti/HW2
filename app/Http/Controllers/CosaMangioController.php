
<?php
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Http;

class CosaMangioController extends Controller
{
    public function index() {
        return view('CosaMangio')->with('csrf_token' , csrf_token());
    }
}