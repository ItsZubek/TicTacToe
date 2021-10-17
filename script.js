/*
Get an active player
Choose a square to put the symbol too
check if win condition is met
change player

*/

const cellElements = document.querySelectorAll('.cell');
const winningMessageText = document.getElementById('winningMessageText');
const winningMessage = document.getElementById('winningMessage');
const RestartBtn = document.getElementById('restartButton');
const turnText = document.getElementById('turnText');
const WinningConditions = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]

let X_Turn;
gameStart();

function gameStart() {
	X_Turn = true;
	CheckTurn();
	cellElements.forEach(element => {
	element.innerText = '';
	element.removeEventListener('click', handleClick);
	element.addEventListener('click', handleClick, {once: true})
}) 
	winningMessage.classList.remove('visible');
}

function handleClick(e) {
	const cell = e.target;
	PlaceXO(cell);
	if(CheckWin(X_Turn)) {
		gameEnd(false);
	} else if (isDraw()) {
		gameEnd(true);
	}
	else {
		ChangePlayer();
	}

}

function gameEnd(draw) {
	if(draw) {
				winningMessageText.innerText = 'Draw!';
	}
	else {
		winningMessageText.innerText = `${X_Turn ? "X's" : "O's"} WIN`;
	}
	winningMessage.classList.add('visible');
}
function ChangePlayer() {
	X_Turn = !X_Turn;
	CheckTurn();
}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.innerText === 'X' || cell.innerText === 'O';
	})
}

function PlaceXO(cell) {
	if(X_Turn) 
	{
	cell.innerText = 'X';
	}
	else {
		cell.innerText = 'O';
	}
}

function CheckWin(X_Turn) 
{
	if(X_Turn) 
	{
		return WinningConditions.some(combination => {
		return combination.every(index => {
			return cellElements[index].innerText === 'X';
		})
	})
	}
	else if(!X_Turn) 
	{
		return WinningConditions.some(combination => {
		return combination.every(index => {
			return cellElements[index].innerText === 'O';
		})
	})
	}
}
function CheckTurn() {
	if(X_Turn) turnText.textContent = `X's Turn`
	else turnText.textContent = `O's Turn`
}
RestartBtn.addEventListener('click', gameStart);