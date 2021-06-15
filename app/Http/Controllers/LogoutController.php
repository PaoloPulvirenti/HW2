<?php
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Session;

class LogoutController extends Controller
{
    public function Logout() {

        Session::flush();

        return view('Login')->with('csrf_token' , csrf_token());
    }
}