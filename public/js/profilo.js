function PostLike(json)
{
    let section=document.querySelector("section");
    let div=document.createElement("div");
    div.classList.add('conteinerLike');
    let divALL=document.createElement('div');
    divALL.classList.add('conteinerDIVALL');
    let intestazione= document.createElement('h1');
    intestazione.textContent='I like di '+json.DatiProfilo[0].Nome+' '+json.DatiProfilo[0].Cognome;
    for(let i=0; i<json.Piatto.length;i++)
    {
    let divIMGHeart=document.createElement('div');
    let img=document.createElement('img');
    img.src=json.Piatto[i].img;
    let img2=document.createElement('img');
    img2.classList.add('imgheart2');
    img2.src="./img/cuore red.png";

    divIMGHeart.appendChild(img);
    divIMGHeart.appendChild(img2);
    divALL.appendChild(divIMGHeart);
    }

    div.appendChild(intestazione);
    div.appendChild(divALL);
    section.appendChild(div);

}

function PostRecensioni(json)
{
    let section=document.querySelector("section");
    let div=document.createElement("div");
    div.classList.add('conteinerRec');
    let intestazione= document.createElement('h1');
    intestazione.textContent='Le recensioni di '+json.DatiProfilo[0].Nome+' '+json.DatiProfilo[0].Cognome;
    let divConteinerALL=document.createElement('div');
    divConteinerALL.classList.add('conteinerDIVALLRec');
    for(let i=0; i<json.Recensione.length;i++)
    {
        let divConteinerRec=document.createElement('div');
        let img=document.createElement('img');
        img.src=json.Recensione[i].img;
        let p=document.createElement('p');
        p.textContent=json.Recensione[i].commento;

        divConteinerRec.appendChild(img);
        divConteinerRec.appendChild(p);
        divConteinerALL.appendChild(divConteinerRec);

    }

    div.appendChild(intestazione);
    div.appendChild(divConteinerALL);
    section.appendChild(div);
}

function jsonProfilo(json)
{
    console.log(json);
    let section=document.querySelector("section");
    let div=document.createElement("div");
    div.classList.add('conteinerDati');
    let divNome=document.createElement("div");
    let divCognome=document.createElement("div");
    let divDataNascita=document.createElement("div");
    let divUsername=document.createElement("div");
    let divEmail=document.createElement("div");
    let intestazione= document.createElement('h1');
    intestazione.textContent='Dati anagrafici di '+json.DatiProfilo[0].Nome+' '+json.DatiProfilo[0].Cognome;
    let nome=document.createElement('p');
    nome.textContent="Nome";
    let inputNome=document.createElement('input');
    inputNome.value=json.DatiProfilo[0].Nome;
    let cognome=document.createElement('p');
    cognome.textContent="Cognome";
    let inputCognome=document.createElement('input');
    inputCognome.value=json.DatiProfilo[0].Cognome;
    let DataNascita=document.createElement('p');
    DataNascita.textContent="Data di nascita";
    let inputData=document.createElement('input');
    inputData.value=json.DatiProfilo[0].DataNascita;
    let username=document.createElement('p');
    username.textContent="Username";
    let inputUsername=document.createElement('input');
    inputUsername.value=json.DatiProfilo[0].username;
    let email=document.createElement('p');
    email.textContent="Email";
    let inputEmail=document.createElement('input');
    inputEmail.value=json.DatiProfilo[0].email;

    divNome.appendChild(nome);
    divNome.appendChild(inputNome);
    divCognome.appendChild(cognome);
    divCognome.appendChild(inputCognome);
    divDataNascita.appendChild(DataNascita);
    divDataNascita.appendChild(inputData);
    divUsername.appendChild(username);
    divUsername.appendChild(inputUsername);
    divEmail.appendChild(email);
    divEmail.appendChild(inputEmail);
    div.appendChild(intestazione);
    div.appendChild(divNome);
    div.appendChild(divCognome);
    div.appendChild(divDataNascita);
    div.appendChild(divUsername);
    div.appendChild(divEmail);
    section.appendChild(div);
    modificaPassword(json);
    if(json.TIPO=="Utente")
    {
    PostLike(json);
    PostRecensioni(json);
    }
}


function modificaPassword(json)
{
    let section=document.querySelector("section");
    let div=document.createElement("div");
    div.classList.add('conteinerPassword');
    let divVecchiapassword=document.createElement("div");
    let divNuovaPassowrd=document.createElement("div");
    let divConfirmPassword=document.createElement("div");
    let intestazione= document.createElement('h1');
    intestazione.textContent='Modifica password di '+json.DatiProfilo[0].Nome+' '+json.DatiProfilo[0].Cognome;
    let vecchiapassword=document.createElement('p');
    vecchiapassword.textContent="Vecchia password";
    let inputVecchiapassword=document.createElement('input');
    inputVecchiapassword.id='vecchia';
    inputVecchiapassword.name='vecchia';
    inputVecchiapassword.type='password';
    let nuovaspassword=document.createElement('p');
    nuovaspassword.textContent="Nuova password";
    let inputnuovapassword=document.createElement('input');
    inputnuovapassword.id='nuova';
    inputnuovapassword.name='nuova';
    inputnuovapassword.type='password';
    let confermapassword=document.createElement('p');
    confermapassword.textContent="Conferma password";
    let inputconfermapassword=document.createElement('input');
    inputconfermapassword.id='conferma';
    inputconfermapassword.name='conferma';
    inputconfermapassword.type='password';
    let testoErrore=document.createElement('p');
    testoErrore.textContent="Inserimento delle password errate!";
    testoErrore.classList.add('hidden');
    testoErrore.id="errorPass";
    let button=document.createElement('button');
    button.textContent="Modifica password";
    let form=document.createElement('form');

    

    divVecchiapassword.appendChild(vecchiapassword);
    divVecchiapassword.appendChild(inputVecchiapassword);
    divNuovaPassowrd.appendChild(nuovaspassword);
    divNuovaPassowrd.appendChild(inputnuovapassword);
    divConfirmPassword.appendChild(confermapassword);
    divConfirmPassword.appendChild(inputconfermapassword);

    form.appendChild(divVecchiapassword);
    form.appendChild(divNuovaPassowrd);
    form.appendChild(divConfirmPassword);
    form.appendChild(button);
    form.method='POST';
    form.action='Profilo';
    form.submit(button);

    div.appendChild(intestazione);
    div.appendChild(form);
    div.appendChild(testoErrore);

    section.appendChild(div);

}

function fetchResponse(response) {
    return response.json();
}

fetch("Controllo/Profilo").then(fetchResponse).then(jsonProfilo);