<html>
<head>
    <link rel="stylesheet" href="{{url('css/css home.css')}}">
    <link rel="stylesheet" href="{{url('css/login.css')}}">
<meta name="viewport" content="width=device-width, initial-scale=1">
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
                <a href="Registrazione">Registrati</a>
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
               <a id="Button2">Clicca qui!</a>
            </div>
    </header>
    <section>
        <div id="Contorno">
            <div id="Login">
                <p>Login</p>
                <h1>Inserisci i tuoi dati</h1>
            </div>
            <form name='login' method="post" action="Login">
            <input type="hidden" name='_token' value='".csrf_toke()"'>
                <div id=flex_column>
                    <div id=flex_row>
                        <p>Username</p>
                        <input name='username' type="text">
                    </div>
                    <div id=flex_row>
                        <p>Password</p>
                        <input name='password' type="password">
                    </div>
                </div>
                <div id='colore'>
            <div id="buttonDiv">
                <button type="submit">Accedi</button>
            </div>
             @if(session('errore'))
             {{session('errore')}}             
             @endif
            </div>
            </form>
            <div class="signup"><a href="Registrazione">Non sei registrato? Registrati</a>
            </div>
        </div>
    </section>
    </body>
</html>