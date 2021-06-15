function Spotify(event)
{
    {
        fetch("Spotify/Playlist/"+encodeURIComponent(String(event.currentTarget.value))).then(onResponse).then(onJson);
            creaStruttura(event.currentTarget.textContent);
    }
}


function onJson(json)
{   
    const id=json.playlists.items[0].id;
    fetch("Spotify/Musica/"+encodeURIComponent(String(id))).then(onResponse).then(onJsonPlaylist);
}

function onJsonPlaylist(json)
{   
    
    let div=document.querySelector("#immagini");    
    let div2=document.querySelector('#testo2');
    div2.innerHTML='';
    let intes2=document.createElement('p');
    intes2.textContent="Le canzoni riprodotte in questa sala!!";
    div2.appendChild(intes2);
    div.innerHTML='';
    
    for(let i=0;i<nTracce;i++)
    {
        divConteiner=document.createElement('div');
        divConteiner.classList.add('conteiner');
        let imgDoc=document.createElement('img');
        imgDoc.src=json.items[i].track.album.images[1].url;
        let intes=document.createElement('h2');
        intes.textContent='Titolo';
        intes.classList.add('intes');
        let intes1=document.createElement('h2');
        intes1.textContent='Autore';
        intes1.classList.add('intes');
        let titoloImg=document.createElement('h1');
        titoloImg.textContent=json.items[i].track.name
        let Autore=document.createElement('h1');
        Autore.textContent=json.items[i].track.album.artists[0].name;
        divConteiner.appendChild(imgDoc);
        divConteiner.appendChild(intes);
        divConteiner.appendChild(titoloImg);
        divConteiner.appendChild(intes1);
        divConteiner.appendChild(Autore);
       
        div.appendChild(divConteiner);
    }

    
}

function creaStruttura(nome)
{  
    let div=document.querySelector('#fotoSale');
    div.innerHTML='';
    let imgSale;
    let i=1;
    if(nome=='Sala Preziosa')i=2;
    do
    {
            imgSale=document.createElement('img');
            imgSale.src="img/"+nome+i+".jpg";
            div.appendChild(imgSale);
            i++;
    }while(i<5)

}


function onResponse(response)
{
	return response.json();
}

function onTokenSave(json)
{
    tokenRisposta=json.access_token;
}

let tokenRisposta;
let nTracce=10; 


const button=document.querySelectorAll("button");
for (let i = 0; i < button.length; i++) 
{
    button[i].addEventListener('click',Spotify);    
}


