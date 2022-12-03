'use strict';

(() => {
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const game = () => {
    const balls = {
      player: 5,
      computer: 5,
    };

    return function start() {
      const figures = ['камень', 'ножницы', 'бумага'];

      let playerIsFirst = true;

      const computerIndex = getRandomIntInclusive(0, 2);
      const text = prompt('Камень, ножницы или бумага?');
      const playerIndex = figures.findIndex(elem => elem.startsWith(text));

      if (text === '' || playerIndex === -1) {
        alert('Некорректный ввод! Попробуйте еще раз');
        return start();
      }

      if (computerIndex === 0 && playerIndex === figures.length - 1) {
        playerIsFirst = true;
      } else if (playerIndex === 0 && computerIndex === figures.length - 1) {
        playerIsFirst = false;
      } else if (playerIndex < computerIndex) {
        playerIsFirst = true;
      } else if (computerIndex < playerIndex) {
        playerIsFirst = false;
      } else {
        playerIsFirst = true;
      }

      if (playerIsFirst) {
        alert('Вы ходите первым!');
      } else {
        alert('Компьютер ходит первым!');
      }

      const playerMove = () => {
        const playerRiddle = +prompt('Загадайте количество шариков: ');
        if (playerRiddle < 1 || playerRiddle > balls.player) {
          alert('Число должно быть меньше/равно вашему количеству шариков!');
          return playerMove();
        }
        const random = getRandomIntInclusive(0, 1);
        const computerAnswerIsEven = random === 0;

        if (playerRiddle % 2 === 0 && computerAnswerIsEven ||
          playerRiddle % 2 !== 0 && !computerAnswerIsEven) {
          balls.player -= playerRiddle;
          balls.computer += playerRiddle;
          alert('Компьютер угадал!');
        } else {
          balls.player += playerRiddle;
          balls.computer -= playerRiddle;
          alert('Компьютер не угадал!');
        }
      };

      const computerMove = () => {
        const computerRiddle = getRandomIntInclusive(1, balls.computer);
        const playerAnswerIsEven = confirm('Загаданное число четное?');

        if (computerRiddle % 2 === 0 && playerAnswerIsEven ||
          computerRiddle % 2 !== 0 && !playerAnswerIsEven) {
          balls.player += computerRiddle;
          balls.computer -= computerRiddle;
          alert('Вы угадали!');
        } else {
          balls.player -= computerRiddle;
          balls.computer += computerRiddle;
          alert('Вы не угадали!');
        }
      };

      const printBalls = () => {
        alert(`Шариков у игрока: ${balls.player}
        \nШариков у компьютера: ${balls.computer}`);
      };

      const isEnded = () => {
        if (balls.player <= 0 || balls.computer <= 0) {
          return true;
        }
        return false;
      };

      while (!isEnded()) {
        printBalls();

        if (playerIsFirst) {
          playerMove();
        } else {
          computerMove();
        }

        if (isEnded()) break;

        printBalls();

        if (playerIsFirst) {
          computerMove();
        } else {
          playerMove();
        }
      }

      if (balls.computer <= 0) {
        alert('Вы победили!');
      } else {
        alert('Вы проиграли!');
      }

      const toContinue = confirm('Сыграем еще разок?');
      if (toContinue) {
        balls.player = 5;
        balls.computer = 5;
        return start();
      }
    };
  };

  window.marbles = game;
})();
