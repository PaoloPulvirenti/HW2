<?php

use App\Models\dati_like;
use App\Models\dati_recensioni;
use Illuminate\Routing\Controller;
use App\Models\direttore;
use App\Models\piatto;
use Illuminate\Support\Facades\Hash;
use App\Models\Utenti;

class ProfiloController extends Controller
{
    
    public function Password() 
    {
        $error=array();
        $request = request();
        if(session('tipo')=="Utente")
        {
        $query=Utenti::where('utenti.id',session('accesso'))->value('password');
        }
        if(session('tipo')=="Direttore")
        {
        $query=direttore::where('direttore.cf',session('accesso'))->value('password');
        }
        if (!(Hash::check($request['vecchia'] , $query))){

            $errors[] ="La passowrd inserita non è corretta";

        }
        if($request['vecchia']==$query)
        {
            $error[] = "Password vecchia errata!!";
            $errore="Password vecchia errata!!";
        }
        if(strlen($request['nuova'])<8)
        {
            $error[] = "Caratteri password insufficienti";
            $errore="Password con carratteri insufficienti";
        }
        if(strcmp($request['nuova'], $request['conferma'])!=0)
        {
            $error[] = "Le password non coincidono";
            $errore="Le password non coincidono";
        }
        if (count($error) == 0)
            {
                
                $password = Hash::make($request['nuova'], ['rounds' => 12]);
                if(session('tipo')=="Utente")
                {
                $query = Utenti::where('ID', session('accesso'))->update(['password'=> $password]);
                $errore="Password Modificata con successo";
                }
                if(session('tipo')=="Direttore")
                {
                $query = direttore::where('CF', session('accesso'))->update(['password'=> $password]);
                $errore="Password Modificata con successo";
                }
                echo "<script type='text/javascript'>alert('$errore');</script>";
                return view('Profilo')->with('csrf_token' , csrf_token());
            }
            else
            {               
                echo "<script type='text/javascript'>alert('$errore');</script>";
                return view('Profilo')->with('csrf_token' , csrf_token());
            }
    }

    public function index() {
        return view('Profilo')->with('csrf_token' , csrf_token());
    }

}
