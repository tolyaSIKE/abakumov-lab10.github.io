const images = [
    'apple.png',
    'banana.png',
    'watermelon.png',
    'cherries.png',
    'lemon.png'
];
let attempts = 0;
let maxAttempts = 3;
let gameInProgress = false;
const startGame = document.getElementById('start-game');
const newGame = document.getElementById('new-game');
startGame.addEventListener('click', gameStart);
newGame.addEventListener('click', gameReset);
function gameStart() {
    const userName = document.getElementById('user-name').value.trim();
    const message = document.getElementById('message');
    const errorText = document.getElementById('error-text');
    if (userName == '') {
        errorText.textContent = 'Будь ласка, введіть ваше ім’я перед початком гри.';
        return;
    }
    errorText.textContent = '';
    message.textContent = `Гравець: ${userName}. Спроба: 0 з ${maxAttempts}`;
    gameInProgress = true;
    document.getElementById('user-name').disabled = true;
    startGame.disabled = true;
    document.getElementById('generate').style.display = 'block';
}
function generateRandomImages() {
    const col1 = document.getElementById('column1');
    const col2 = document.getElementById('column2');
    const col3 = document.getElementById('column3');
    col1.innerHTML = '';
    col2.innerHTML = '';
    col3.innerHTML = '';
    const randomImages = [
        images[Math.floor(Math.random() * images.length)],
        images[Math.floor(Math.random() * images.length)],
        images[Math.floor(Math.random() * images.length)]
    ];
    col1.innerHTML = `<img src="${randomImages[0]}" alt="Fruit">`;
    col2.innerHTML = `<img src="${randomImages[1]}" alt="Fruit">`;
    col3.innerHTML = `<img src="${randomImages[2]}" alt="Fruit">`;
    return randomImages;
}
function checkWin(randomImages) {
    if (randomImages[0] === randomImages[1] && randomImages[1] === randomImages[2]) {
        document.getElementById('result').textContent = 'Ви виграли!';
        return true;
    } else {
        document.getElementById('result').textContent = 'Спробуйте ще!';
        return false;
    }
}
document.getElementById('generate').addEventListener('click', () => {
    if (!gameInProgress) return;
    if (attempts < maxAttempts) {
        attempts++;
        document.getElementById('message').textContent = `Спроба: ${attempts} з ${maxAttempts}`;
        const randomImages = generateRandomImages();
        if (checkWin(randomImages)) {
            endGame('Ви виграли! Почніть нову гру.');
        }
    }
    if (attempts === maxAttempts) {
        endGame('Гру завершено. Почніть нову гру.');
    }
});
function endGame(message) {
    gameInProgress = false;
    document.getElementById('result').textContent = message;
    newGame.style.display = 'block';
    document.getElementById('generate').style.display = 'none';
}
function gameReset() {
    attempts = 0;
    gameInProgress = false;
    document.getElementById('result').textContent = '';
    document.getElementById('message').textContent = 'Введіть ваше ім’я:';
    document.getElementById('user-name').value = '';
    document.getElementById('error-text').textContent = '';
    document.getElementById('user-name').disabled = false;
    startGame.disabled = false;
    newGame.style.display = 'none';
    document.getElementById('generate').style.display = 'none';
    document.getElementById('column1').innerHTML = '';
    document.getElementById('column2').innerHTML = '';
    document.getElementById('column3').innerHTML = '';
}
