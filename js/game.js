// Получить элементы DOM
var canvas = document.getElementById('game-canvas');
var startButton = document.getElementById('start-button');

// Получить контекст рисования
var context = canvas.getContext('2d');

// Объект игрока
var player = {
  x: 0,
  y: 0,
  width: 100,
  height: 166,
  speed: 5,
  image: new Image(),
  bullets: [], // массив пуль игрока
  // Загрузить изображение игрока
  load: function() {
    this.image.onload = function() {
      gameLoop();
    };
    this.image.src = '../images/player.png';
  },
  // Обработчик события движения мыши
  move: function(event) {
    var canvasRect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - canvasRect.left;
    var mouseY = event.clientY - canvasRect.top;
  
    if (mouseX - this.width / 2 < 0) {
      this.x = 0;
    } else if (mouseX + this.width / 2 > canvas.width) {
      this.x = canvas.width - this.width;
    } else {
      this.x = mouseX - this.width / 2;
    }
  
    this.y = mouseY - this.height / 2;
  },
  // Создать пулю
  createBullet: function() {
    var bullet = {
      x: this.x + this.width, // стартовая позиция пули
      y: (this.y + this.height / 2) - 50,
      width: 64,
      height: 32,
      speed: 15, // скорость пули
      image: new Image(),
      load: function() {
        this.image.src = '../images/bullet.png';
      },
      draw: function() {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
      },
      update: function() {
        this.x += this.speed;
      }
    };
    bullet.load();
    this.bullets.push(bullet); // добавляем пулю в массив
  },
  // Обновление позиции пуль
  updateBullets: function() {
    for (var i = 0; i < this.bullets.length; i++) {
      var bullet = this.bullets[i];
      bullet.update();
      if (bullet.x > canvas.width) { // если пуля вышла за границы экрана, то удаляем ее
        this.bullets.splice(i, 1);
        i--;
      }
    }
  },
  // Отрисовать игровой объект на экране
  draw: function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    for (var i = 0; i < this.bullets.length; i++) { // отрисовываем все пули
      this.bullets[i].draw();
    }
  },
};

// Обновить состояние игры
function update() {
    player.updateBullets();
    player.draw();
    requestAnimationFrame(update);
}

// Запустить игровой цикл
function gameLoop() {
  requestAnimationFrame(update);
}

// Запустить игру
function startGame() {
  startButton.style.display = 'none';
  player.load();
}

// Обработчик события клика на кнопке "Начать игру"
startButton.addEventListener('click', startGame);

// Обработчик события движения мыши
document.addEventListener('mousemove', function(event) {
  player.move(event);
});

canvas.addEventListener('click', function(event) {
  player.createBullet();
});

// function update() {
//   changeBgColor();
//   requestAnimationFrame(update);
// }

// // Запустить игровой цикл
// function gameLoop() {
// requestAnimationFrame(update);
// }

// btnRef.addEventListener('click', update);



