
// controlli capi
function ControlloNomeCognome(event)
{
    const input = event.currentTarget;
    
    if (input.value.length > 0) 
    {   
        input.parentNode.parentNode.querySelector('h5').classList.add('hidden');
    } 
    else 
    {
        input.parentNode.parentNode.querySelector('h5').classList.remove('hidden');
    }
}

function ControlloEmail(event)
{
    const emailInput = event.currentTarget;
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(emailInput.value).toLowerCase())) {
        
        emailInput.parentNode.parentNode.querySelector('h5').classList.remove('hidden');
    } 
    else 
    {
        emailInput.parentNode.parentNode.querySelector('h5').classList.add('hidden');
        fetch("Controllo/Email/"+encodeURIComponent(String(emailInput.value).toLowerCase())).then(fetchResponse).then(jsonControlloEmail);
    }
}



function jsonControlloEmail(json)
{
    let emailInput=document.querySelector("#email h5");
    if((json.exists0 || json.exists1) ==true)
    {
        emailInput.textContent="Email gia' esistente";
        emailInput.classList.remove('hidden');
    }
    else
    {
        emailInput.textContent="Email inserita non valida!";
        emailInput.classList.add('hidden');
    }
}


function ControlloUsername(event)
{
    const UsernameInput = event.currentTarget;
    if(!/^[a-zA-Z0-9]{1,15}$/.test(UsernameInput.value)) {
        UsernameInput.parentNode.parentNode.querySelector('h5').classList.remove('hidden');
    } 
    else 
    {
        UsernameInput.parentNode.parentNode.querySelector('h5').classList.add('hidden');
        fetch("Controllo/Username/"+encodeURIComponent(String(UsernameInput.value).toLowerCase())).then(fetchResponse).then(jsonControlloUsername);
    }
}

function jsonControlloUsername(json)
{
    let Input=document.querySelector("#username h5");
    if((json.exists0 || json.exists1) ==true)
    {
        Input.textContent="Username gia' esistente";
        Input.classList.remove('hidden');
    }
    else
    {
        Input.textContent="Sono ammesse lettere, numeri. Max 15 caratteri";
        Input.classList.add('hidden');
    }
}

function ControlloPassword(event)
{
    const passwordInput = event.currentTarget;
    if (passwordInput.value.length >= 8) {

        passwordInput.parentNode.parentNode.querySelector('h5').classList.add('hidden');
        
    } else {
        passwordInput.parentNode.parentNode.querySelector('h5').classList.remove('hidden');
    }

}

function ControlloConfirm(event)
{
    const passwordInput = event.currentTarget;
    if (passwordInput.value === document.getElementsByName("password")[0].value) {
        passwordInput.parentNode.parentNode.querySelector('h5').classList.add('hidden');
    } else {
        passwordInput.parentNode.parentNode.querySelector('h5').classList.remove('hidden');
    }
}



function fetchResponse(response) {
    return response.json();
}


let nome=document.getElementsByName("nome")[0];
nome.addEventListener('blur',ControlloNomeCognome);
let cognome=document.getElementsByName("cognome")[0];
cognome.addEventListener('blur',ControlloNomeCognome);
let email=document.getElementsByName("email")[0];
email.addEventListener('blur',ControlloEmail);
let username=document.getElementsByName("username")[0];
username.addEventListener('blur',ControlloUsername);
let password=document.getElementsByName("password")[0];
password.addEventListener('blur',ControlloPassword);
let confirmpassword=document.getElementsByName("conferma-password")[0];
confirmpassword.addEventListener('blur',ControlloConfirm);