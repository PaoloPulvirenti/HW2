function caricaIMG(imgsrc)
{   
    let cont=document.querySelector('.conteiner2');
    let img=document.createElement('img');
    let t;
    if(t=document.querySelector('.conteiner2 img'))
    t.remove();
    img.src="../public/img/"+imgsrc;
    cont.appendChild(img);


}

function caricaTestoAnt(event)
{
    
    t=document.querySelector('.conteiner div input[type="file"]')
    t.disabled='disabled'; 
    if(event.currentTarget.value=='')
    t.disabled='';
    let cont=document.querySelector('.conteiner2');
    let text=document.createElement('p');
    if(t=document.querySelector('.conteiner2 p'))
    t.remove();
    text.textContent=event.currentTarget.value;
    cont.appendChild(text);
    if(t=document.querySelector('.conteiner textarea'))
     t.disabled='';
    else
       t.disabled='disabled';
}

function caricaDescAnt(event)
{

    let cont=document.querySelector('.conteiner2');
    let text2=document.createElement('h2');
    let c=event.currentTarget.parentNode.parentNode.querySelector('.conteiner button');
    if(t=document.querySelector('.conteiner2 h2'))
    t.remove();
    text2.textContent=event.currentTarget.value;
    cont.appendChild(text2);
    if(t=document.querySelector('.conteiner .inputTitolo'))
    t.disabled='disabled';
    if(event.currentTarget.value=='')
    {
        t.disabled='';
        
        c.disabled='disabled';
    }else
    {
    c.disabled="";
    }
}

function caricaPiatto(event)
{
    let img=event.currentTarget.parentNode.querySelector('.conteiner .immagine input').files[0].name;
    let titolo=event.currentTarget.parentNode.querySelector('.conteiner .titolo input').value;
    let descrizione=event.currentTarget.parentNode.querySelector('.conteiner .descrizione textarea').value;
    fetch("Controllo/caricaPiatto/"+encodeURIComponent(String(img))+"/"+encodeURIComponent(String(titolo))+"/"+encodeURIComponent(String(descrizione))).then(fetchResponse).then(jsonCaricato);
    document.location.href = "Home"; 

}

function jsonCaricato(json)
{
    console.log(json);
}
function fetchResponse(response) {
    return response.json();
}

let section= document.querySelector('section');
section.classList.add('sectionPost');

let divIntestazione= document.createElement('div');
let intestazione=document.createElement('h1');
intestazione.textContent="Inserisci di dati del nuovo piatto!";
divIntestazione.appendChild(intestazione);
divIntestazione.classList.add('IntestazionePost');

let divContenitore=document.createElement('div');

let divCaricaIMG=document.createElement('div');
let caricaTesto=document.createElement('h1');
caricaTesto.textContent="cerca IMG";
let buttonIMG=document.createElement('input');
buttonIMG.type="file";
divCaricaIMG.appendChild(caricaTesto);
divCaricaIMG.appendChild(buttonIMG);
divCaricaIMG.classList.add('immagine');

let divCaricaTitolo=document.createElement('div');
let TitoloTesto=document.createElement('h1');
TitoloTesto.textContent="Titolo";
let inputTitolo=document.createElement('input');
inputTitolo.addEventListener('blur',caricaTestoAnt);
inputTitolo.classList.add('inputTitolo');
inputTitolo.disabled="disabled";
divCaricaTitolo.appendChild(TitoloTesto);
divCaricaTitolo.appendChild(inputTitolo);
divCaricaTitolo.classList.add('titolo');

let divCaricaDesc=document.createElement('div');
let DescTesto=document.createElement('h1');
DescTesto.textContent="Descizione";
let inputDesc=document.createElement('textArea');
inputDesc.addEventListener('blur',caricaDescAnt);
inputDesc.disabled="disabled";
divCaricaDesc.appendChild(DescTesto);
divCaricaDesc.appendChild(inputDesc);
divCaricaDesc.classList.add('descrizione');

let inviaDati=document.createElement('button');
inviaDati.textContent='Aggiungi il piatto!';
inviaDati.disabled="disabled";
inviaDati.addEventListener('click',caricaPiatto);


let conteinerALL=document.createElement('div');
conteinerALL.classList.add('conteinerALL');

divContenitore.appendChild(divCaricaIMG);
divContenitore.appendChild(divCaricaTitolo);
divContenitore.appendChild(divCaricaDesc);
divContenitore.classList.add('conteiner');
divContenitore.appendChild(inviaDati);

conteinerALL.appendChild(divContenitore);

let divContenitore2=document.createElement('div');
let testo=document.createElement('h1');
testo.textContent='Anteprima piatto';
divContenitore2.appendChild(testo);
divContenitore2.classList.add('conteiner2');

conteinerALL.appendChild(divContenitore2);


section.appendChild(divIntestazione);
section.appendChild(conteinerALL);






window.addEventListener('load', function() {
    buttonIMG.addEventListener('change', function() {
        if (buttonIMG.files && buttonIMG.files[0]) {
               caricaIMG(buttonIMG.files[0].name);
               inputTitolo.disabled="";
        }
    });
  });
