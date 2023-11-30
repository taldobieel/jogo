const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")

const audio = new Audio('eat.mp3');
let GameOverAudioPlaying = false;
const audio2 = new Audio('gameover.mp3');

const size = 30

const initialPosition = { x: 270, y: 270 }

let snake = [initialPosition]

const incrementScore = () => {
    score.innerText = +score.innerText + 10
}


const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: "red"
}

let direction, loopId

const drawFood = () => {
    const { x, y, color } = food

    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = food.color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    snake.forEach((position, index) => {
        ctx.shadowColor = "#000000"; // Shadow color
        ctx.shadowBlur = 6; // Shadow blur radius

        ctx.fillStyle = "#5981e9";
        ctx.fillRect(position.x, position.y, size, size);

        ctx.shadowBlur = 0; // Reset shadow blur after drawing each segment
    });
};

// sem a sombra const drawSnake = () => {
    //ctx.fillStyle = "#5981e9"

    //snake.forEach((position, index) => {

        //if (index == snake.length - 1) {
            //ctx.fillStyle = "#5981e9"
        //}

        //ctx.fillRect(position.x, position.y, size, size)
    //})
//}

const moveSnake = () => {
    if (!direction) return

    const head = snake[snake.length - 1]

    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })

    }

    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })

    }

    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })

    }

    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })

    }

    snake.shift()
}

const drawGrid = () => {
    const squareSize = 30;
    const numRows = canvas.height / squareSize;
    const numCols = canvas.width / squareSize;

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const x = j * squareSize;
            const y = i * squareSize;

            const fillColor = (i + j) % 2 === 0 ? "#98c64a" : "#228B22";

            ctx.fillStyle = fillColor;
            ctx.fillRect(x, y, squareSize, squareSize);
        }
    }
};


const chackEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        incrementScore()
        snake.push(head)
        audio.play()

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x
        food.y = y
    }
}

const checkCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size
    const neckIndex = snake.length - 2

    const wallCollision =
        head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if (wallCollision || selfCollision) {
        gameOver()
    }
}

const gameOver = () => {
    direction = undefined

    if (!GameOverAudioPlaying) {
        audio2.play();
        GameOverAudioPlaying = true;
    }

    menu.style.display = "flex"
    finalScore.innerText = score.innerText 
    canvas.style.filter = "blur(3px)"
}

const gameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    chackEat()
    checkCollision()

    loopId = setTimeout(() => {
        gameLoop()
    }, 130)
}

gameLoop()

document.addEventListener("keydown", ({ key }) => {

    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
})

buttonPlay.addEventListener("click", () => {
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"

    snake = [initialPosition]

    if (GameOverAudioPlaying) {
        audio2.currentTime = 0;
        audio2.pause();
        GameOverAudioPlaying = false;
    }
})
