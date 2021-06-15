<?php
use Illuminate\Routing\Controller;
use App\Models\direttore;
use App\Models\Utenti;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class RegistrazioneController extends Controller
{

    protected function Registrazione() 
    {
        $request = request();
        $err= $this->CampiVuoti($request);
        $errors= $this->countErrors($request);
        $password = Hash::make($request['password'], [

            'rounds' => 12

        ]);

        if($err)
        {
            return redirect('Registrazione')->with(['errors'=>$err]);
        }
        if(count($errors) === 0) {

            $newUser =  Utenti::create([
            'ID' => '',
            'Nome' => $request['nome'],
            'Cognome' => $request['cognome'],
            'DataNascita' => $request['data'],
            'username' => $request['username'],
            'Password' => $password,
            'email' => $request['email']
            ]);
            if ($newUser) {
                return redirect('Login');
            } 
            else {
                return redirect('Registrazione')->with(['errors'=>"Errore nell'inserimento dei campi" ])->withInput();
            }
        }
        else 
        {
            return redirect('Registrazione')->with(['errors'=>"Errore nell'inserimento dei campi"])->withInput();
        }
    }

    private function CampiVuoti($data)
    {
        if(!$data['username']||!$data['password']||!$data['email']||!$data['conferma-password']||!$data['nome']||!$data['cognome']||!$data['password']||!$data['data'])
        {
            $err=" Compilare tutti i campi";
            return $err;
        }
    }



    private function countErrors($data)
    {
        $error=array();
        $username=$data["username"];
        $query=Utenti::where('username',$data['username'])->first();
        $query2=direttore::where('username',$data['username'])->first();
        if ($query!=NULL||$query2!=NULL) 
        {
            $error[] = "Username già utilizzato";
        }
        if(strlen($username)>15)
            {
                $error[] = "username troppo lungo";
            }
            //controllo PASSWORD
            if (strlen($data["password"]) < 8) {
            $error[] = "Caratteri password insufficienti";
            }
            
            if (strcmp($data["password"], $data["conferma-password"]) != 0) {
                $error[] = "Le password non coincidono";
            }

            // controlo email
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                $error[] = "Email non valida";
            } else {
                $query=Utenti::where('email',$data['email'])->first();
                $query2=direttore::where('email',$data['email'])->first();
                if($query!=NULL||$query2!=NULL)
                {
                    $error[]="Email già utilizzata";
                }

            }
            return $error;
    }

    
public function checkEmail($email) {
    $exist = Utenti::where('email', $email)->exists();
    return ['exists' => $exist];
}

public function checkUsername($username) {
    $exist = Utenti::where('username', $username)->exists();
    return ['exists' => $exist];
}

public function index() {

    

        return view('Registrazione')->with('csrf_token' , csrf_token());



}




}

?>