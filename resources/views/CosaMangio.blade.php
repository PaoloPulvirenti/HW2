<html>
    <head>
    <link rel="stylesheet" href="{{url('css/Spotify&RandomIMG.css')}}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="{{url('js/RandomImage.js')}}" defer></script>
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
                <a href="Sale">Sale</a>
                <a href="Profilo">Il tuo profilo</a>
                <a href="Logout">logout</a>
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
    <p>Non sai che piatto mangiare oggi?</p>
        <section>            
            <form name ='ricerca' id='ricerca'>
			<input type="hidden" name='_token' value='".csrf_toke()"'>
                <h1>Seleziona un tipo di piatto e vediamo se potrebbe piacerti!!</h1>
                <select name = 'tipo' id='tipo'>
                    <option value='pasta'>Pasta</option>
                    <option value='rice'>Riso</option>
                    <option value='pizza'>Pizza</option>
                    <option value='burger'>Panini</option>
                    <option value='dessert'>Dessert</option>
                </select>                
                <input class="submit" type='submit' id='botton5' value='Cerca cibo'>                        
            </form>
                
            <div id='foto'>
                    
            </div>
            <p id='testoCibo' class="hidden"></p>

            <div id='prodotto'>
            </div>
            </div>
            

        </section>

    <footer>
            <h1 id="powered"> Il Ristorante "Pulvirenti"</h1>
            <h1 id="nome">Powered by Paolo Pulvirenti O46002175</h1>
    </footer>
</body>
</html>