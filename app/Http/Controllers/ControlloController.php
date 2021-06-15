<?php

use App\Models\dati_like;
use App\Models\dati_recensioni;
use Illuminate\Routing\Controller;
use App\Models\direttore;
use App\Models\piatto;
use App\Models\Utenti;

class ControlloController extends Controller
{

    public function Email($email) 
    {
        $query=Utenti::where('email',$email)->first();
        $query2 =direttore::where('email',$email)->first();
        return (array('exists0' => $query  ? true : false,
                      'exists1' => $query2  ? true : false));
    }

    public function Username($username)
    {
        $query = Utenti::where('username',$username)->first();
        $query2 = direttore::where('username',$username)->first();
        return (array('exists0' => $query ? true : false,
                      'exists1' => $query2 ? true : false));
    }

    public function Dati()
    {
        $query=piatto::all();
        if ($query) {
            $array=['item'=>$query];
            $query2=dati_like::groupBy('piatto.id')->rightJoin('piatto','dati_like.fk_piatto','=','piatto.id')->selectRaw('piatto.ID')->selectRaw('count(fk_piatto) as n_like')->get();
                if($query2)
                {
                    $array=$array+['piatti' =>$query2];
                    $query3=Utenti::join('dati_like','utenti.id','=','dati_like.fk_utente')->where('fk_utente',session('accesso'))->selectRaw('fk_piatto')->selectRaw('utenti.id')->get();
                        if($query3)
                        {
                            $array=$array+['utente' =>$query3];
                            if(session('tipo')=="Direttore")
                            {
                                $array=$array+['TIPO' =>"Direttore"];
                            }
                            if(session('tipo')=="Utente")
                            {
                                $array=$array+['TIPO' =>"Utente"];
                            }
                            return $array;
                        }
                        else
                        {   
                            $results2 = "NULL";

                            $array=$array+['utente' =>$results2];
                            if(session('tipo')=="Direttore")
                            {
                                $array=$array+['TIPO' =>"Direttore"];
                            }
                            
                            return $array;
                        }
            }
        }
    }


    public function Like($piatto)
    {
        $query=dati_like::create(
            [
             'ID'=>'',
             'fk_piatto'=>$piatto,
             'fk_utente'=>session('accesso')
            ]);
            if($query)
                return (array('utente' =>$piatto));
    }

    public function UnLike($piatto)
    {
        $query= dati_like::where('fk_piatto',$piatto)->where('fk_utente',session('accesso'))->delete();     
        if($query)
        {
        return (array('utente' =>$piatto));
        }    

    }

    public function Mostra($piatto)
    {
        $query=piatto::where('id', $piatto)->get();
            if($query)
            {
                $array1=['item'=>$query];
                    return ($array1);
            }
    }

    public function Recensioni($cancella,$idRec,$piatto)
    {
        if($cancella=="cancella")
            {
                    $query=dati_recensioni::where('dati_recensioni.ID',$idRec)->delete();
            }
        $data = date('Y-m-d H:i:s');
        $query=dati_recensioni::where('fk_piatto',$piatto)->get();
        $query2=dati_recensioni::join('utenti','dati_recensioni.fk_utente','=','utenti.ID')->where('fk_piatto',$piatto)->orderBy('dati_recensioni.ID')->select('Utenti.*')->get();
        $query3=Utenti::where('ID',session('accesso'))->get();
                $array2=['recensione'=>$query,'utente'=>$query2,'piatto'=> $piatto,'data'=>$data];
                if($query3)
                {
                $array2=$array2+['utenteAccesso'=>$query3];
                }

                if(session('tipo')=="Direttore")
                {
                    $array=$array2+['TIPO'=>'Direttore'];
                        return ($array);
                }

                if((session('tipo')=="Utente"))
                {
                    $array=$array2+['TIPO'=>'Utente'];
                    return ($array);
                }

                return ($array2);
    }

    public function ADDRecensioni($testo,$utente,$piatto)
    {
        $data = date('Y-m-d H:i:s');
        $query=dati_recensioni::create(
            ['ID'=>'',
             'fk_piatto'=>$piatto,
             'fk_utente'=>session('accesso'),
             'commento'=>$testo,
             'data'=>$data
            ]);
        $query2=Utenti::where('utenti.id',$utente)->select('utenti.nome')->select('utenti.cognome')->get();
        if($query2)
            return (array('recensione' =>['piatto' =>$piatto,'utente' =>$utente,'testo' =>$testo,'data' =>$data],'utenteAccesso'=>$query2));

    }

    public function Profilo()
    {
        if(session('tipo')=="Utente")
        {
       $query= Utenti::where('ID',session('accesso'))->get();
       $query2=dati_like::join('utenti','dati_like.FK_utente','=','utenti.ID')->join('piatto','piatto.ID','=','dati_like.FK_piatto')->where('utenti.id',session('accesso'))->select('piatto.img')->get();
       $query3=dati_recensioni::join('utenti','utenti.ID','=','dati_recensioni.FK_utente')->join('piatto','piatto.ID','=','dati_recensioni.FK_piatto')->where('utenti.id',session('accesso'))->get();
            $array=['TIPO'=>'Utente','DatiProfilo'=>$query];
            $array=$array+['Piatto'=>$query2];
            $array=$array+['Recensione'=>$query3];
            
        return ($array);
        }

        if(session('tipo')=="Direttore")
            {
                $query=direttore::where('CF',session('accesso'))->get();
                    $array=['TIPO'=>'Direttore','DatiProfilo'=>$query];
                    return $array;
            }

    }

    public function Elimina($piatto)
    {
        
        dati_like::where('dati_like.FK_piatto',$piatto)->delete();
        dati_recensioni::where('dati_recensioni.FK_piatto',$piatto)->delete();
        piatto::where('ID',$piatto)->delete();    
        return (array('piatto' => $piatto));

    }

    public function caricaPiatto($img,$titolo,$desc)
    {
        $img='./img/'.$img;
        $query=piatto::create(
            [
                'ID'=>'',
                'img'=>$img,
                'nome'=>$titolo,
                'descrizione'=>$desc
            ]
        );
        if($query)
            return 'ok';
    }



}