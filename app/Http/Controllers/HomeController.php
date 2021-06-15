<?php

use Illuminate\Routing\Controller;

class HomeController extends Controller
{
    public function index() {
                return view('Home')->with('csrf_token' , csrf_token());
            }
}