document.addEventListener("DOMContentLoaded", () => {
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    listaUser.sort((a, b) => b.scoreCad - a.scoreCad);

    const top5Users = listaUser.slice(0, 8);

    const top5Body = document.getElementById('top5Body');
    top5Users.forEach((user, index) => {
        const row = document.createElement('tr');
        const medalha = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${medalha}</td>
            <td><img src="${getPokemonImage(user.pokemonNumber)}" alt="Pokémon" class="pokemon-avatar"></td>
            <td>${user.userCad}</td>
            <td>${user.scoreCad}</td>
        `;

        top5Body.appendChild(row);
    });
});

function getPokemonImage(pokemonNumber) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`;
}
