const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const fps = 50;

const player = {
    x: 20,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: '#fff',
    skore: 0,
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 13,
    color: '#a51890',
    speed: 5,
    velocityX: 3,
    velocityY: 4,
    stop: true,
};

canvas.addEventListener('click', () => {
    ball.stop = !ball.stop;
});

const computer = {
    x: canvas.width - 30,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: '#fff',
    score: 0,
};

const refreshPlayer = (e) => {
    const rect = canvas.getBoundingClientRect();
    if (!ball.stop)
        player.y = e.clientY - rect.top - player.height / 2;
};
canvas.addEventListener('mousemove', refreshPlayer);

const drawRect = (x, y, width, height, color) => {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
};

const drawCircleFill = (x, y, r, color) => {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.closePath();
    context.fill();
};

const drawCircleStroke = (x, y, r, width, color) => {
    context.strokeStyle = color;
    context.lineWidth = width;
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();
};

const drawText = (x, y, text, color) => {
    context.fillStyle = color;
    context.font = '50px sans-serif';
    context.fillText(text, x, y);
};

const refreshArea = () => {
    drawRect(0, 0, canvas.width, canvas.height, '#008374');
    drawRect(canvas.width / 2 - 2, 0, 4, canvas.height, '#fff');
    drawCircleFill(canvas.width / 2, canvas.height / 2, 8, '#fff');
    drawCircleStroke(canvas.width / 2, canvas.height / 2, 50, 4, '#fff');
    drawText(player.score, canvas.width / 4, 100, '#fff');
    drawText(computer.score, 3 * canvas.width / 4, 100, '#fff');

    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawCircleFill(ball.x, ball.y, ball.r, ball.color);
};

const refreshBall = () => {
    if (!ball.stop) {
        if (ball.x + ball.r < 0) {
            ball.stop = true;
        }
        else if (ball.x - ball.r > canvas.width) {
            ball.stop = true;
        }

        ball.x = ball.x + ball.velocityX;
        ball.y = ball.y + ball.velocityY;
        // console.log('canvas.height', canvas.height);
        // console.log('ball.y', ball.y);
        // console.log('canvas.height > ball.y', canvas.height > ball.y);
        // console.log('ball.y < 0', ball.y < 0);
        if (canvas.height < ball.y + ball.r || ball.y - ball.r < 0) {
            ball.velocityY = ball.velocityY * -1;
        }
        if (ball.velocityX > 0) {//eğer topun x eksenindeki hızı 0dan büyükse(bu koşula göre topun sağa doğru hareket ettiği anlamına gelir)(eğer top sağa doğru hareket ediyorsa computera göre gidiyordur ve o durumda copmutera işlem yapılır.)
            if (ball.y > computer.y && ball.y < computer.y + computer.height) {//eğer topun y ekseni computerin y ekseninden büyükse veya computerın y ekseniyle yüksekliğinin toplamı topun y ekseninden büyükse(o zaman top computerın çarpma alnına denk gelmiş demektir.)
                if (ball.x + ball.r > computer.x) {//topun x ekseniyle topun yarıçapının toplamı computerın x ekseninden büyükse
                    ball.velocityX = ball.velocityX * -1;
                }

            }

        }
        else {
            if (ball.y > player.y && ball.y < player.y + player.height) {
                if (ball.x - ball.r < player.x + player.width) {
                    ball.velocityX = ball.velocityX * -1;
                }
            }
        }
    }
}

const refreshComputer = () => {
    const computerLevel = 0.1;
    computer.y += (ball.y - computer.y - (computer.height / 2)) * computerLevel;
};

const refreshFrame = () => {
    refreshArea();
    refreshBall();
    refreshComputer();
};

setInterval(refreshFrame, 1000 / 50);
