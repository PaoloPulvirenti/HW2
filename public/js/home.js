function SearchPress()
{
    const input=document.getElementById('cerca');
    const filter =input.value.toUpperCase();
    const table=document.querySelector('section');
    const items = table.getElementsByClassName('item');
    
      
        for (let i = 0; i < items.length; i++) 
        {
          let titolo  = items[i].getElementsByTagName('h1')[0];
          if (titolo) {
          let  txtValue = titolo.textContent;
          //txtValue=txtValue.substring(0,filter.length); -------Se volessi cercare solo gli elementi che iniziano per il testo cercato
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              items[i].style.display = "";
            } 
            else {
              items[i].style.display = "none";
            }    
          }    
        }
}

function onMostraClick(event)
{   
    const mostra=event.currentTarget;
    const pa=mostra.parentElement.parentElement.dataset.name; 
    mostra.textContent="▼ Mostra meno contenuti";
    fetch("Controllo/Mostra/"+encodeURIComponent(String(pa))).then(fetchResponse).then(jsonMostra);
    mostra.removeEventListener('click',onMostraClick);
    mostra.addEventListener('click',onNotMostraClick);
}

function jsonMostra(json)
{
    let div=document.querySelectorAll('.item');
    for(let divs of div)
    {
        if(divs.dataset.name==json.item[0].ID)
        {
            const newDesc=document.createElement('p');
            newDesc.textContent=json.item[0].descrizione;
            let add=divs.querySelector(".div");
            add.appendChild(newDesc);
        }
    }
}



/* Funzione mostra meno dettagli nella descrizone del piatto*/
function onNotMostraClick(event)
{
    const mostra=event.currentTarget;  
    const pa=mostra.parentElement.parentElement; 
    mostra.textContent="▶ Mostra di piu";
    const t=pa.querySelector('section p');
    t.remove();
    mostra.removeEventListener('click',onNotMostraClick);
    mostra.addEventListener('click',onMostraClick);
}

function onRecensioniClick(event)
{
    const mostra=event.currentTarget;
    const pa=mostra.parentElement.parentElement.dataset.name; 
    mostra.textContent="▼ Recensioni";
    fetch("Controllo/Recensioni/NULL/NULL/"+encodeURIComponent(String(pa))).then(fetchResponse).then(jsonRecensioni);
    mostra.removeEventListener('click', onRecensioniClick);
    mostra.addEventListener('click',onNotRecensioniClick);

}
function  onNotRecensioniClick(event)
{
    const mostra=event.currentTarget;  
    const pa=mostra.parentElement.parentElement; 
    mostra.textContent="▶ Recensioni";
    const t=pa.querySelector('section .Recensione');
    let t2;
    if(t2=pa.querySelector('section .RecensioneUtenteArea'))
    t2.remove();

    t.remove();
    mostra.removeEventListener('click',onNotRecensioniClick);
    mostra.addEventListener('click',onRecensioniClick);
}
function InviaRecensione(event)
{
    let tag=event.currentTarget.parentNode.parentNode;
    let utente=event.currentTarget.value;
    let piatto=event.currentTarget.name;
    let area=tag.querySelector('.RecTestoArea textarea');
    if(area.value.length>0)
    fetch("Controllo/ADDRecensioni/"+encodeURIComponent(String(area.value))+"/"+encodeURIComponent(String(utente))+"/"+encodeURIComponent(String(piatto))).then(fetchResponse).then(jsonADDRecensione);

}
function jsonADDRecensione(json)
{
    fetch("Controllo/Recensioni/NULL/NULL/"+encodeURIComponent(String(json.recensione.piatto))).then(fetchResponse).then(jsonReloadRec);
    
}
function jsonReloadRec(json)
{
    let div=document.querySelectorAll('.item');
    for(let divs of div)
    {
        let diviso=divs.querySelector(".Recensione");
        let diviso2=divs.querySelector(".RecensioneUtenteArea");
        if(diviso&&diviso2&&divs.dataset.name==json.piatto)
        {
        diviso.remove();
        diviso2.remove();
        
        }
    }

    jsonRecensioni(json);
}

function OnClickcancella(event)
{
    let piatto=event.currentTarget.title;
    let idRec=event.currentTarget.value;
    fetch("Controllo/Recensioni/cancella/"+encodeURIComponent(String(idRec))+"/"+encodeURIComponent(String(piatto))).then(fetchResponse).then(jsonReloadRec);
}

function jsonRecensioni(json)
{
    let div=document.querySelectorAll('.item');
    let dataTot;
    for(let divs of div)
    {
        
        const conteiner=document.createElement('div');
        conteiner.classList.add("Recensione");
        let boolean=false;
        if(json.recensione.length==0 && divs.dataset.name==json.piatto)
        {
            const NoRec=document.createElement('p');
            NoRec.textContent="Non ci sono recensioni.";
            conteiner.appendChild(NoRec);
            boolean=true;
        }
            for(let i=0;i<json.recensione.length;i++)
            {
                if(json.recensione[i].FK_piatto==divs.dataset.name)
                {
                    
                    const conteinerUtente=document.createElement('div');
                    conteinerUtente.classList.add("RecensioneUtente");
                    const divNome=document.createElement('div');
                    const divDati=document.createElement('div');
                    const divTesto=document.createElement('div');
                    const divPersona=document.createElement('div');
                    const divOra=document.createElement('div');
                    const Nome=document.createElement('p');
                    Nome.textContent=json.utente[i].Nome.capitalize()+" "+json.utente[i].Cognome.capitalize();
                    let codice;
                    if(json.utenteAccesso.length>0)
                    {
                    codice=json.utenteAccesso[0].ID;
                    }
                    if(codice==json.utente[i].ID)
                    {
                        Nome.style.color="rgb(4, 112, 161)";
                    }
                    const IMG=document.createElement('img');
                    IMG.src="../public/img/omino.png";
                    IMG.classList.add("Omino");
                    divNome.classList.add("RecNome");
                    const Testo=document.createElement('p');
                    Testo.textContent=json.recensione[i].commento;
                    divDati.classList.add("RecDati");
                    const Orario=document.createElement('p');
                    let Adesso=new Date();
                    dataTot=timeDiffCalc(Date.parse(json.recensione[i].data),Date.parse(Adesso));
                    Orario.textContent=dataTot;
                    divPersona.classList.add("RecPersona");
                    divTesto.classList.add("RecTesto");
                    divOra.classList.add("RecOra");            
                    divTesto.appendChild(Testo);
                    divOra.appendChild(Orario);
                    divPersona.appendChild(Nome);
                    if(json.utenteAccesso.length>0)
                    {
                    codice=json.utenteAccesso[0].ID;
                    }
                    
                    if(codice==json.utente[i].ID)
                    {
                    const cancella=document.createElement('img');
                    cancella.src="../public/img/cancella.png";
                    cancella.classList.add("cestino");
                    cancella.title=json.piatto;
                    cancella.value=json.recensione[i].ID;
                    cancella.addEventListener('click',OnClickcancella);
                    divPersona.appendChild(cancella);
                    
                    }
                    divNome.appendChild(IMG);
                    conteinerUtente.appendChild(divNome);
                    conteinerUtente.appendChild(divDati);
                    divDati.appendChild(divPersona);
                    divDati.appendChild(divTesto);
                    divDati.appendChild(divOra);
                    conteiner.appendChild(conteinerUtente);


                    boolean=true;
                }
            }
             if(boolean)
             {
                divs.appendChild(conteiner);

                if(json.utenteAccesso.length!=0)
                {
                    const conteinerUtente=document.createElement('div');
                    conteinerUtente.classList.add("RecensioneUtenteArea");
                    const divNome=document.createElement('div');
                    const divDati=document.createElement('div');
                    const divTesto=document.createElement('div');
                    const divPersona=document.createElement('div');
                    const divOra=document.createElement('div');
                    const Nome=document.createElement('p');
                    Nome.textContent=json.utenteAccesso[0].Nome.capitalize()+" "+json.utenteAccesso[0].Cognome.capitalize();
                    const IMG=document.createElement('img');
                    IMG.src="../public/img/omino.png";
                    IMG.classList.add("Omino");
                    divNome.classList.add("RecNomeArea");
                    const Testo=document.createElement('textarea');
                    Testo.setAttribute('placeholder','Inserisci recensione..');
                    const button=document.createElement('button');
                    button.textContent="Recensisci";
                    button.value=json.utenteAccesso[0].ID;
                    button.name=json.piatto;
                    button.addEventListener('click',InviaRecensione);
                    divDati.classList.add("RecDati");
                    divPersona.classList.add("RecPersonaArea");
                    divTesto.classList.add("RecTestoArea");
                    divOra.classList.add("RecOraArea");            
                    divTesto.appendChild(Testo);
                    divPersona.appendChild(Nome);
                    divNome.appendChild(IMG);
                    divOra.appendChild(button);
                    conteinerUtente.appendChild(divNome);
                    conteinerUtente.appendChild(divDati);
                    divDati.appendChild(divPersona);
                    divDati.appendChild(divTesto);
                    divDati.appendChild(divOra);

                    divs.appendChild(conteinerUtente);
                    }
                }


    }
    

}

function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    // calculate seconds
    const seconds = Math.floor(diffInMilliSeconds);
    diffInMilliSeconds -= seconds * 60;



    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days} giorno fa ` : `${days} giorni fa `;
      return difference;
    }
    else{
        if(hours>0)
        {
        difference += (hours === 0 || hours === 1) ? `${hours} ora fa ` : `${hours} ore fa `;
        return difference;
        }
        else if(minutes>0)
        {
            difference += (minutes === 0 || minutes === 1) ? `${minutes} minuto fa` : `${minutes} minuti fa`; 
            return difference;
        }
        else
        {
            difference += (seconds === 0 || minutes === 1) ? `${seconds} secondo fa` : `${seconds} secondi fa`; 
            return difference;
        }

    }
    
  }

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function redHeart(event)
{
    let input=event.currentTarget;
    let red=input.parentNode.querySelector('.imgheart');
    red.src="../public/img/cuore red.png";
    fetch("Controllo/Like/"+encodeURIComponent(String(input.value))).then(fetchResponse).then(jsonLike);
    red.removeEventListener('click',redHeart);
    red.addEventListener('click',blackHeart);
}

function blackHeart(event)
{
    let input=event.currentTarget;
    let red=input.parentNode.querySelector('.imgheart');
    red.src="../public/img/cuore black.png";
    fetch("Controllo/UnLike/"+encodeURIComponent(String(input.value))).then(fetchResponse).then(jsonUnLike);
    red.removeEventListener('click',blackHeart);
    red.addEventListener('click',redHeart);
}

function jsonLike(json)
{
    fetch("Controllo/Dati").then(fetchResponse).then(jsonReload);    
}
function jsonUnLike(json)
{
    fetch("Controllo/Dati").then(fetchResponse).then(jsonReload);
}

function jsonReload(json)
{
    let p=0;
    const c=document.querySelectorAll(".item .divlike img");
    const f=document.querySelectorAll(".item .divlike h5");
    for(let divs of c)
    {       
        let boolean=false;
            for(let i=0;i<json.utente.length;i++)
            {
                if(json.utente[i].fk_piatto==json.piatti[p].ID)
                {
                    boolean=true;
                    break;
                }
            }       
                if(boolean==true)
                {
                    divs.src="../public/img/cuore red.png";
                    divs.value=json.item[p].ID;
                    if(json.TIPO=="Utente")
                    divs.addEventListener('click',blackHeart); 
                }
                else{
                    divs.src="../public/img/cuore black.png";
                    divs.value=json.item[p].ID;
                    if(json.TIPO=="Utente")
                    divs.addEventListener('click',redHeart); 
                }
                p++;
    }
    p=0;
    for(let divs of f)
    {
        divs.textContent=json.piatti[p].n_like; 
        p++; 
    }

}

function EliminaPost(event)
{
    let piatto=event.currentTarget.parentNode.parentNode;
    let id=piatto.dataset.name;
    fetch("Controllo/Elimina/"+encodeURIComponent(String(id))).then(fetchResponse).then(jsonCancella);

}

function jsonCancella(json)
{
    let div=document.querySelectorAll('.item');
    for(let divs of div)
    {
        if(divs.dataset.name==json.piatto)
        {
            divs.remove();
        }
    }
}


function fetchResponse(response) {
    return response.json();
}

function NewPost() 
{
    document.location.href = "newPost";        
}

function jsonDati(json)
{
    let p=0;
    const s=document.querySelector("section");
    for (let divs of json.item) 
    {
            const c=document.createElement("div");
            c.classList.add("item");
            c.dataset.name=json.piatti[p].ID;
            s.appendChild(c);
            const newIMG= document.createElement('img');
            newIMG.src=divs.img;
            let div1=document.createElement('div');
            div1.classList.add('divlike');
            const newTitle= document.createElement('h1');
            newTitle.textContent=divs.nome;
            const IMG1= document.createElement('img');
            IMG1.classList.add('imgheart');
            const newTitleNum= document.createElement('h5');
            newTitleNum.textContent=json.piatti[p].n_like;        
            let div2=document.createElement('div');
            div2.classList.add('div');
            const newMostra= document.createElement('h4');
            newMostra.textContent="▶ Mostra di piu";
            newMostra.classList.add('mostra');
            newMostra.addEventListener('click',onMostraClick);
            let div3=document.createElement('div');
            div3.classList.add('divRec');
            const newRecensioni= document.createElement('h4');
            newRecensioni.textContent="▶ Recensioni";
            newRecensioni.classList.add('mostra');
            newRecensioni.addEventListener('click',onRecensioniClick);
            if(json.TIPO=="Direttore")
            {
            let divCanc=document.createElement('div');
            divCanc.classList.add('cancellazione');
            let Canc=document.createElement('img');
            Canc.src="../public/img/menored.png";
            Canc.classList.add("imgplus");
            Canc.addEventListener('click',EliminaPost);
            divCanc.appendChild(Canc);
            c.appendChild(divCanc);
            let img2=document.querySelector(".addPost .imgplus");
            img2.addEventListener('click',NewPost);


            }
            c.appendChild(newIMG);
            div1.appendChild(newTitle);
            div1.appendChild(IMG1);
            div1.appendChild(newTitleNum);
            c.appendChild(div1);
            div2.appendChild(newMostra);
            c.appendChild(div2);
            div3.appendChild(newRecensioni);
            c.appendChild(div3);
            p++;
    }
    jsonReload(json);


}

fetch("Controllo/Dati").then(fetchResponse).then(jsonDati);
const cerca=document.querySelector('#cerca');
cerca.addEventListener('keyup',SearchPress);
