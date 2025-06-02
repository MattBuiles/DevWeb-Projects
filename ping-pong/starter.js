//1. Acciones a los botones
//2. Botón verde asociado a jugador 1
//3. Botón rojo asociado a jugador 2
//4. Botón de reset
//5. Select de cantidad de puntos a jugar
//6. Lógica de juego

// Aquí comienza tu código

const btnGreen = document.getElementById('p1Button');
const btnBlue = document.getElementById('p2Button');
const btnReset = document.getElementById('reset');
const player1Score = document.getElementById('p1Display');
const player2Score = document.getElementById('p2Display');
const selectPoints = document.getElementById('playto');

let score1 = 0;
let score2 = 0;
let maxPoints = parseInt(selectPoints.value);

btnGreen.addEventListener('click', () => {
    score1++;
    player1Score.textContent = score1;
    checkWinner();
}
);
btnBlue.addEventListener('click', () => {
    score2++;
    player2Score.textContent = score2;
    checkWinner();
}
);
btnReset.addEventListener('click', () => {
    score1 = 0;
    score2 = 0;
    player1Score.textContent = score1;
    player2Score.textContent = score2;
    player1Score.style.color = 'black';
    player2Score.style.color = 'black';
    btnGreen.disabled = false;
    btnBlue.disabled = false;
});
selectPoints.addEventListener('change', () => {
    maxPoints = parseInt(selectPoints.value);
    btnReset.click();
});
function checkWinner() {
    if (score1 >= maxPoints) {
        player1Score.style.color = 'green';
        player2Score.style.color = 'red';
        btnGreen.disabled = true;
        btnBlue.disabled = true;
        alert('¡Jugador 1 gana!');


    } else if (score2 >= maxPoints) {
        player1Score.style.color = 'red';
        player2Score.style.color = 'green';
        btnGreen.disabled = true;
        btnBlue.disabled = true;
        alert('¡Jugador 2 gana!');
    }
}
