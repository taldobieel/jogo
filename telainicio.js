document.addEventListener("DOMContentLoaded", () => {
  let userLogado = JSON.parse(localStorage.getItem('userLogado'));
  
  if (userLogado && userLogado.pokemonNumber) {
    // Se o usuário logado tem um número de Pokémon associado, use esse número
    generateCard(userLogado.pokemonNumber);
  } else {
    // Caso contrário, escolha um novo Pokémon aleatório
    const random = getRandomInt(1, 152);
    generateCard(random);
  }
});

const generateCard = (id) => {
  const pokemon = {
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
  };

  paintCard(pokemon);
};

const paintCard = (pokemon) => {
  const flex = document.querySelector(".flex");
  const clone = document.getElementById("card").content.cloneNode(true);

  clone.querySelector(".card-body-img").setAttribute("src", pokemon.img);

  flex.appendChild(clone);
};


document.addEventListener('DOMContentLoaded', function () {
  let userLogado = JSON.parse(localStorage.getItem('userLogado'));
  let logado = document.querySelector('#logado');
  let score = document.querySelector('#score');
  if (userLogado) {
    logado.innerHTML = `${userLogado.user}`;
    score.innerHTML = `Best ranked score: ${userLogado.score}`;
  } else {
    alert('Você precisa estar logado para acessar esta página');
    window.location.href = 'login.html';
  }

  if (localStorage.getItem('token') == null) {
    alert('Você precisa estar logado para acessar esta página');
    window.location.href = 'login.html';
  }

  function sair() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  }
});

