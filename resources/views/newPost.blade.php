<html>
    <head>
    <link rel="stylesheet" href="{{url('css/newPost.css')}}">

<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="{{url('js/newPost.js')}}" defer></script>
<title>Ristorante "Pulvirenti"</title>
</head>
<body>
    <header>
        <nav>
            <span class="titolo">
            Il ristorante "Pulvirenti"
            </span>
            <div class="menu">
            @if(session('accesso')>0||session('tipo')=='Direttore')
            <a href='Home'>Home</a>
            <a href='Profilo'>Il tuo profilo</a> 
            <a href='CosaMangio'>Cosa mangio?</a>
            <a href='Sale'>Sale</a>
            <a href='Logout'>Logout</a>
            @else
            <a href='Login'>Login</a>
            @endif                 
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
        <section > 
        </section>
    <footer>
            <h1 id="powered"> Il Ristorante "Pulvirenti"</h1>
            <h1 id="nome">Powered by Paolo Pulvirenti O46002175</h1>
    </footer>
</body>
</html>