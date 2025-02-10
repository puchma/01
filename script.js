const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const TOTAL = 150;
const petalArray = [];

const petalImg = new Image();
petalImg.src = './image/petal.png';

petalImg.addEventListener('load', () => {
    for (let i = 0; i < TOTAL; i++) {
        petalArray.push(new Petal());
    }
    render();
});

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petalArray.forEach(petal => petal.animate());
    window.requestAnimationFrame(render);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let mouseX = 0;

function touchHandler(e) {
    mouseX = (e.clientX || e.touches[0].clientX) / window.innerWidth;
}
window.addEventListener('mousemove', touchHandler);
window.addEventListener('touchmove', touchHandler);

document.addEventListener("DOMContentLoaded", function() {
    const greetings = document.querySelectorAll('.greeting');

    greetings.forEach((greeting, index) => {
        greeting.style.animationDelay = `${index * 2.5}s`;
    });

    const music = document.getElementById('music');
    const stopMusicButton = document.getElementById('stopMusic');

    // 添加用户交互事件监听器
    const userInteraction = () => {
        // 播放音乐
        music.play().catch((error) => {
            console.error("播放失败：", error);
        });

        // 移除监听事件，避免重复触发
        window.removeEventListener('click', userInteraction);
        window.removeEventListener('touchstart', userInteraction);
    };

    // 添加用户交互事件监听
    window.addEventListener('click', userInteraction);
    window.addEventListener('touchstart', userInteraction);

    // 关闭音乐
    stopMusicButton.addEventListener('click', () => {
        music.pause();
    });
});

class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = (Math.random() * canvas.height * 2) - canvas.height;
        this.w = 25 + Math.random() * 15;
        this.h = 20 + Math.random() * 10;
        this.opacity = this.w / 40;
        this.flip = Math.random();
        this.xSpeed = 1 + Math.random() * 1.7;
        this.ySpeed = 0.7 + Math.random() * 1;
        this.flipSpeed = Math.random() * 0.03;
    }

    draw() {
        if (this.y > canvas.height || this.x > canvas.width) {
            this.x = -petalImg.width;
            this.y = (Math.random() * canvas.height * 2) - canvas.height;
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            this.flip = Math.random();
        }

        ctx.globalAlpha = this.opacity;
        ctx.drawImage(
            petalImg,
            this.x,
            this.y,
            this.w * (0.6 + (Math.abs(Math.cos(this.flip)) / 3)),
            this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 5))
        );
    }

    animate() {
        this.x += this.xSpeed + mouseX * 5;
        this.y += this.ySpeed + mouseX * 2;
        this.flip += this.flipSpeed;
        this.draw();
    }
}