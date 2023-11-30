let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')

let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelconfirmSenha = document.querySelector('#labelconfirmSenha')
let validConfirmSenha = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

const audio = new Audio('audioregister.mp3');

const audio2 = new Audio('error.mp3');

nome.addEventListener('keyup', () => {
    if (nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color: red')
        labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
        nome.setAttribute('style', 'border-color: red')
        validNome = false
    } else {
        labelNome.setAttribute('style', 'color: #41b10e')
        labelNome.innerHTML = 'Nome'
        nome.setAttribute('style', 'border-color: #41b10e')
        validNome = true

    }
})

usuario.addEventListener('keyup', () => {
    if (usuario.value.length <= 1) {
        labelUsuario.setAttribute('style', 'color: red')
        labelUsuario.innerHTML = 'Usuario *Insira no minimo 2 caracteres'
        usuario.setAttribute('style', 'border-color: red')
        validUsuario = false
    } else {
        labelUsuario.setAttribute('style', 'color: #41b10e')
        labelUsuario.innerHTML = 'Usuario'
        usuario.setAttribute('style', 'border-color: #41b10e')
        validUsuario = true

    }
})

senha.addEventListener('keyup', () => {
    if (senha.value.length <= 5) {
        labelSenha.setAttribute('style', 'color: red')
        labelSenha.innerHTML = 'Senha *Insira no minimo 6 caracteres'
        senha.setAttribute('style', 'border-color: red')
        validSenha = false
    } else {
        labelSenha.setAttribute('style', 'color: #41b10e')
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: #41b10e')
        validSenha = true

    }
})

confirmSenha.addEventListener('keyup', () => {
    if (senha.value != confirmSenha.value) {
        labelconfirmSenha.setAttribute('style', 'color: red')
        labelconfirmSenha.innerHTML = 'Confirmar Senha *As senhas nao conferem'
        confirmSenha.setAttribute('style', 'border-color: red')
        validConfirmSenha = false
    } else {
        labelconfirmSenha.setAttribute('style', 'color: #41b10e')
        labelconfirmSenha.innerHTML = 'Confirmar Senha'
        confirmSenha.setAttribute('style', 'border-color: #41b10e')
        validConfirmSenha = true

    }
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


function cadastrar() {
    if (validNome && validUsuario && validSenha && validConfirmSenha) {
        audio.play()
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

        if (!usuarioJaCadastrado(usuario.value, listaUser)) {
            listaUser.push({
                nomeCad: nome.value,
                userCad: usuario.value,
                senhaCad: senha.value,
                scoreCad: 0,
                pokemonNumber: getRandomInt(1, 152),
            });

            localStorage.setItem('listaUser', JSON.stringify(listaUser));

            msgSuccess.setAttribute('style', 'display: block');
            msgSuccess.innerHTML = '<strong>Cadastrando usuario...</strong>';
            msgError.setAttribute('style', 'display: none');
            msgError.innerHTML = '';

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            msgError.setAttribute('style', 'display: block');
            msgError.innerHTML = '<strong>Usuario ja cadastrado. Por favor, escolha outro nome de usuario.</strong>';
            msgSuccess.innerHTML = '';
            msgSuccess.setAttribute('style', 'display: none');
            audio2.play()
        }
    } else {
        msgError.setAttribute('style', 'display: block');msgError.innerHTML = '<strong>Preencha todos os campos corretamente</strong>';
        
        msgSuccess.innerHTML = '';
        msgSuccess.setAttribute('style', 'display: none');
        audio2.play()
    }
}

function usuarioJaCadastrado(usuario, listaUser) {
    return listaUser.some(user => user.usercad === usuario);
}


btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha')

    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

btnConfirm.addEventListener('click', () => {
    let inputConfirmSenha = document.querySelector('#confirmSenha')

    if (inputConfirmSenha.getAttribute('type') == 'password') {
        inputConfirmSenha.setAttribute('type', 'text')
    } else {
        inputConfirmSenha.setAttribute('type', 'password')
    }
})
