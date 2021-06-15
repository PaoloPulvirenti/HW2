<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="{{url('css/css home.css')}}">
    <link rel="stylesheet" href="{{url('css/login.css')}}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="{{url('js/RegistrazioneLogin.js')}}" defer></script>
<title>Ristorante "Pulvirenti"</title>
</head>
    <body>
    <header>
        <nav>
            <span class="titolo">
            Il ristorante "Pulvirenti"
            </span>
            <div class="menu">
                <a href="Home">Home</a>
                <a href="Login">Login</a>
            </div>

            <div class="menuApp">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>
            <div class="centrale">
               <strong> Il ristorante più buono d'italia</strong>
               <h1>Vuoi conoscere la nostra storia?</h1>
            </div>
    </header>
    <section id="Sezione">
    </div>
        <div id="Contorno">
            <div id="Login">
                <p>Registrati</p>
                <h1>Inserisci i tuoi dati</h1>
            </div>
            <form name='singup' method="post" action='Registrazione' >
            <input type="hidden" name='_token' value='".csrf_toke()"'>
                <div id=flex_column>
                    <div id='nome'>
                    <div id=flex_row>
                        <p>Nome</p>
                        <input name="nome" type="text" value="{{ old('nome') }}">
                        
                    </div>
                    <h5 class='hidden' id='errore'>Campo nome non inserito!</h5>
                    </div>
                    <div id='cognome'>
                    <div id=flex_row>
                        <p>Cognome</p>
                        <input name="cognome" type="text" value="{{ old('cognome') }}">
                    </div>
                    <h5 class='hidden' id='errore'>Campo cognome non inserito!</h5>
                    </div>
                    <div id='email'>
                    <div id=flex_row>
                        <p>Email</p>
                        <input name="email" type="text" value="{{ old('email') }}">
                    </div>
                    <h5 class='hidden' id='errore'>Email inserita non valida!</h5>
                    </div>
                    <div id=flex_row>
                        <p>Data di nascita</p>
                        <input name="data" type="date" value="{{ old('data') }}">
                    </div>
                    <div id='username'>
                    <div id=flex_row>                    
                        <p>Username</p>
                        <input name="username"type="text">
                    </div>
                    <h5 class='hidden' id='errore'>Sono ammesse lettere, numeri. Max 15 caratteri</h5>
                    </div>
                    <div id='password'>
                    <div id=flex_row>
                        <p>Password</p>
                        <input name="password" type="password">
                    </div>
                    <h5 class='hidden' id='errore'>Il campo deve avere almeno 8 caratteri!</h5>
                    </div>
                    <div id='confirm_password'>
                    <div id=flex_row>
                        <p>Conferma Password</p>
                        <input name="conferma-password" type="password">
                    </div>
                    <h5 class='hidden' id='errore'>Le password devono essere uguali!</h5>
                    </div>                    
                </div>
            <div id="buttonDiv">
                <button type="submit">Registrati</button>
            </div>
            <div id='colore'>
            @if(session('errors'))
             {{session('errors')}}             
             @endif
            </div>
            </form>
            <div class="signup"><a href="Login">Clicca qui se sei registrato!</a>
            </div>
        </div>
    </section>
    </body>
</html>