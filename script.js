let btn = document.querySelector('.fa-eye')

const audio = new Audio('audiologin.mp3');

const audio2 = new Audio('error.mp3');

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha')

    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

function entrar() {

    let usuario = document.querySelector('#usuario')
    let userLabel = document.querySelector('#userLabel')

    let senha = document.querySelector('#senha')
    let senhaLabel = document.querySelector('#senhaLabel')

    let msgError = document.querySelector('#msgError');
    let listaUser = []

    let userValid = {
        nome: '',
        user: '',
        senha: '',
        score: '',
        pokemonNumber: ''
    }

    listaUser = JSON.parse(localStorage.getItem('listaUser'))

    listaUser.forEach((item) => {
        if (usuario.value == item.userCad && senha.value == item.senhaCad) {
            userValid = {
                nome: item.nomeCad,
                user: item.userCad,
                senha: item.senhaCad,
                score: item.scoreCad,
                pokemonNumber: item.pokemonNumber,
            };
        }
    });

    if (usuario.value == userValid.user && senha.value == userValid.senha) {
        audio.play()
        let token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2)
        localStorage.setItem('token', token)

        localStorage.setItem('userLogado', JSON.stringify(userValid))

        setTimeout(() => {
            window.location.href = 'telainicio.html';
        }, 2000)
    } else {
        audio2.play()
        userLabel.setAttribute('style', 'color: red')
        usuario.setAttribute('style', 'border-color: red')
        senhaLabel.setAttribute('style', 'color: red')
        senha.setAttribute('style', 'border-color: red')
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Usuario ou senha invalidos'
        usuario.focus()
    }
}