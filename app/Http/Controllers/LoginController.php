<?php

use Illuminate\Routing\Controller;
use App\Models\direttore;
use App\Models\Utenti;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    protected function Login() 
    {
        $request = request();
        $errore1=NULL;  
        $queryUtente = Utenti::where('username',$request['username'])->value('ID');
        if($queryUtente)
        { 
            $query2Utente = Utenti::where('username',$request['username'])->value('password');
            if ((Hash::check($request['password'] , $query2Utente))){

                    Session::put('accesso',$queryUtente);
                    Session::put('tipo','Utente');
                    return redirect('Home');
            }
            else
            {
                
                $errore1 = "username e password errati.";
                
                return redirect('Login')->with(['errore'=>$errore1]);
            }
        }
        else
        {
            $errore1 = "username e password errati.";
            
        }

        $queryDir = direttore::where('username',$request['username'])->value('CF');
        
        if($queryDir)
        {
            $query2Dir = direttore::where('username',$request['username'])->value('password');
            if ((Hash::check($request['password'] , $query2Dir))){
            Session::put('accesso',$queryDir);
            Session::put('tipo','Direttore');
            return redirect('Home');
            }
            else
            {
                $errore1 = "username e password errati.";
                return redirect('Login')->with(['errore'=>$errore1]);
            }
        }
        else
        {
            $errore1 = "username e password errati.";
            return redirect('Login')->with(['errore'=>$errore1]);
        }
    }

    public function index() {
        return view('Login')->with('csrf_token' , csrf_token());



}
}

   