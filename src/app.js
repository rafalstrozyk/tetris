import './sass/index.scss';
import moment from 'moment';
console.log('it Work');

document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	let squares = Array.from(document.querySelectorAll('.grid div'));
	const ScoreDisplay = document.querySelector('#score');
	const startButton = document.querySelector('#start-button');
	const width = 10;
	let nextRandom = 0;
	let timerId;
	let score = 0;
	const time = 700;

	// The tetrominoes
	const lTetromino = [
		[1, width + 1, width * 2 + 1, 2],
		[width, width + 1, width + 2, width * 2 + 2],
		[1, width + 1, width * 2 + 1, width * 2],
		[width, width * 2, width * 2 + 1, width * 2 + 2]
	];

	const zTetromino = [
		[0, width, width + 1, width * 2 + 1],
		[width + 1, width + 2, width * 2, width * 2 + 1],
		[0, width, width + 1, width * 2 + 1],
		[width + 1, width + 2, width * 2, width * 2 + 1]
	];

	const tTetromino = [
		[1, width, width + 1, width + 2],
		[1, width + 1, width + 2, width * 2 + 1],
		[width, width + 1, width + 2, width * 2 + 1],
		[1, width, width + 1, width * 2 + 1]
	];

	const oTetromino = [
		[0, 1, width, width + 1],
		[0, 1, width, width + 1],
		[0, 1, width, width + 1],
		[0, 1, width, width + 1]
	];

	const iTetromino = [
		[1, width + 1, width * 2 + 1, width * 3 + 1],
		[width, width + 1, width + 2, width + 3],
		[1, width + 1, width * 2 + 1, width * 3 + 1],
		[width, width + 1, width + 2, width + 3]
	];

	const theTetromiones = [
		lTetromino,
		zTetromino,
		tTetromino,
		oTetromino,
		iTetromino
	];

	let currentPosition = 4;
	let currentRotation = 0;

	// randomly select a Tetrimino and its first rotation
	let random = Math.floor(Math.random() * theTetromiones.length);
	let current = theTetromiones[random][0];

	// draw the tetromino
	function draw() {
		current.forEach((index) => {
			squares[currentPosition + index].classList.add('tetromino');
		});
	}

	// undraw the Tetromino
	function undraw() {
		current.forEach((index) => {
			squares[currentPosition + index].classList.remove('tetromino');
		});
	}

	// make the tetrimino move down every second
	// timerId = setInterval(moveDown, 1000);

	// assign functions to keyCodes
	function control(e) {
		if (e.keyCode === 37) {
			moveLeft();
		} else if (e.keyCode === 38) {
			rotate();
		} else if (e.keyCode === 39) {
			moveRight();
		} else if (e.keyCode === 40) {
			moveDown();
		}
	}

	document.addEventListener('keyup', control);

	// move down function
	function moveDown() {
		undraw();
		currentPosition += width;
		draw();
		freeze();
	}

	// freeze function
	function freeze() {
		if (
			current.some((index) =>
				squares[currentPosition + index + width].classList.contains('taken')
			)
		) {
			current.forEach((index) =>
				squares[currentPosition + index].classList.add('taken')
			);
			// start a new tetromino falling
			random = nextRandom;
			nextRandom = Math.floor(Math.random() * theTetromiones.length);
			current = theTetromiones[random][currentRotation];
			currentPosition = 4;
			draw();
			displayShape();
			addScore();
			gameOver();
		}
	}

	// move the tetromino left, unless is at the edge or there is a block
	function moveLeft() {
		undraw();
		const isAtLeftEdge = current.some(
			(index) => (currentPosition + index) % width === 0
		);

		if (!isAtLeftEdge) currentPosition -= 1;

		if (
			current.some((index) =>
				squares[currentPosition + index].classList.contains('taken')
			)
		) {
			currentPosition += 1;
		}

		draw();
	}

	// move the tetromino right, unless is at the edge or there is a block
	function moveRight() {
		undraw();
		const isAtRightEdge = current.some(
			(index) => (currentPosition + index) % width === width - 1
		);
		if (!isAtRightEdge) currentPosition += 1;

		if (
			current.some((index) =>
				squares[currentPosition + index].classList.contains('taken')
			)
		) {
			currentPosition -= 1;
		}

		draw();
	}

	// rotate the tetromino
	function rotate() {
		undraw();
		currentRotation++;
		if (currentRotation === current.length) {
			currentRotation = 0;
		}
		const isAtRightEdge = current.some(
			(index) => (currentPosition + index) % width === width - 1
		);
		const isAtLeftEdge = current.some(
			(index) => (currentPosition + index) % width === 0
		);
		if (isAtLeftEdge) {
			currentPosition += 1;
		}
		if (isAtRightEdge) {
			currentPosition -= 1;
		}
		current = theTetromiones[random][currentRotation];
		draw();
	}

	// show un-next tetromino in mini-grid display
	const displaySquares = document.querySelectorAll('.mini-grid div');
	const displayWidth = 4;
	let displayIndex = 0;

	// the Tetrominos without rotations
	const upNextTetrominoes = [
		[1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
		[0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zTetromino
		[1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
		[0, 1, displayWidth, displayWidth + 1], // oTetromino
		[1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
	];

	// display the shape in the mini-grid display
	function displayShape() {
		// remove any of a tetromino form the entire grid
		displaySquares.forEach((squares) => {
			squares.classList.remove('tetromino');
		});
		upNextTetrominoes[nextRandom].forEach((index) => {
			displaySquares[displayIndex + index].classList.add('tetromino');
		});
	}

	// add functionality to the button
	startButton.addEventListener('click', () => {
		if (timerId) {
			clearInterval(timerId);
			timerId = null;
		} else {
			draw();
			timerId = setInterval(moveDown, time);
			nextRandom = Math.floor(Math.random() * theTetromiones.length);
			displayShape();
		}
	});

	// add score
	function addScore() {
		for (let i = 0; i < 199; i += width) {
			const row = [
				i,
				i + 1,
				i + 2,
				i + 3,
				i + 4,
				i + 5,
				i + 6,
				i + 7,
				i + 8,
				i + 9
			];

			if (row.every((index) => squares[index].classList.contains('taken'))) {
				score += 10;
				ScoreDisplay.innerHTML = score;

				row.forEach((index) => {
					squares[index].classList.remove('taken');
					squares[index].classList.remove('tetromino');
				});
				const squaresRemoved = squares.splice(i, width);
				squares = squaresRemoved.concat(squares);
				squares.forEach((cell) => grid.appendChild(cell));
			}
		}
	}

	// game over
	function gameOver() {
		if (
			current.some((index) =>
				squares[currentPosition + index].classList.contains('taken')
			)
		) {
			ScoreDisplay.innerHTML = 'end';
			clearInterval(timerId);
		}
	}

	document.getElementById('reset-button').addEventListener('click', () => {
		squares.forEach((element, index) => {
			element.classList.remove('tetromino');
			if (index < 200) {
				element.classList.remove('taken');
			}
		});
		displaySquares.forEach((squares) => {
			squares.classList.remove('tetromino');
		});
		if (timerId) {
			clearInterval(timerId);
			timerId = null;
		} else {
			draw();
			timerId = setInterval(moveDown, time);
			nextRandom = Math.floor(Math.random() * theTetromiones.length);
			displayShape();
		}
		undraw();
		score = 0;
		currentPosition = 4;
		displayIndex = 0;
		ScoreDisplay.innerHTML = score;
	});
});
