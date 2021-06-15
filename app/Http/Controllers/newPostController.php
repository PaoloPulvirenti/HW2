<?php

use Illuminate\Routing\Controller;
use App\Models\direttore;
use App\Models\Utenti;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Hash;

class newPostController extends Controller
{
    public function index() {
        return view('newPost')->with('csrf_token' , csrf_token());
    }
}