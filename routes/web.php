<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('Registrazione', "RegistrazioneController@index");
Route::post('Registrazione', "RegistrazioneController@Registrazione");

Route::get('Login','LoginController@index');
Route::post('Login','LoginController@Login');

Route::get('Home',"HomeController@index");

Route::get('Controllo/Email/{email}',"ControlloController@Email");
Route::get('Controllo/Username/{Username}',"ControlloController@Username");
Route::get('Controllo/Dati',"ControlloController@Dati");
Route::get('Controllo/Like/{piatto}',"ControlloController@Like");
Route::get('Controllo/UnLike/{piatto}',"ControlloController@UnLike");
Route::get('Controllo/Mostra/{piatto}',"ControlloController@Mostra");
Route::get('Controllo/Recensioni/{cancella}/{idRec}/{piatto}',"ControlloController@Recensioni");
Route::get('Controllo/ADDRecensioni/{testo}/{utente}/{piatto}',"ControlloController@ADDRecensioni");
Route::get('Controllo/Profilo',"ControlloController@Profilo");
Route::get('Controllo/Elimina/{piatto}',"ControlloController@Elimina");
Route::get('Controllo/caricaPiatto/{img}/{titolo}/{desc}',"ControlloController@caricaPiatto");

Route::post('Profilo', 'ProfiloController@Password');
Route::get('Profilo',"ProfiloController@index");

Route::get('newPost','newPostController@index');

Route::get('Sale','SalaController@index');

Route::get('Spotify/Playlist/{content}','SpotifyController@SpotifyPlaylist');
Route::get('Spotify/Musica/{id}','SpotifyController@SpotifyMusica');

Route::get('CosaMangio','CosaMangioController@index');

Route::get('RandomIMG/Prodotti/{contenuto}','RandomIMGController@Prodotti');
Route::get('RandomIMG/Random/{contenuto}','RandomIMGController@Random');

Route::get('Logout','LogoutController@Logout');




