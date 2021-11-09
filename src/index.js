/* eslint-disable indent */
import { GamePlayer } from './game';
import { BoardDOM, DragDropAPI, displayWinner } from './dom';
import './style.css';

const shipsToPlay = [5, 4, 3, 2, 1];

const userBoard = GamePlayer('Player', shipsToPlay);
const enemyBoard = GamePlayer('Computer', shipsToPlay);

const userDIV = document.querySelector('#player');
const enemyDIV = document.querySelector('#enemy');
const UserGameboardDOM = userDIV.querySelector('.fields');
const EnemyGameboardDOM = enemyDIV.querySelector('.fields');

const UserBoardDOM = BoardDOM(userBoard.name, userDIV);
const EnemyBoardDOM = BoardDOM(enemyBoard.name, enemyDIV);

// enable DragDropAPI for real human player
const shipContainer = document.querySelector('#player .draggable-ships');
const DragDropPlayer = DragDropAPI(shipContainer, UserGameboardDOM);
DragDropPlayer.setGameBoardObject(userBoard);
DragDropPlayer.setBoardDOMObject(UserBoardDOM);
DragDropPlayer.setShipsToPlace(shipsToPlay);
DragDropPlayer.addListenerToGameField();

// wait until player has placed all ships on the board
(DragDropPlayer.allShipsPlaced()).then(() => {
    // all ships were placed by the placer
    EnemyGameboardDOM.addEventListener('click', (e) => {
        // player is able to attack enemyboard until attack was successful
        const fieldToAttack = e.target.closest('.field');
        if (!fieldToAttack) return;
        const { x, y } = fieldToAttack.dataset;
        const attackSuccess = userBoard.attackEnemy(enemyBoard, y, x);
        if (!attackSuccess) return;

        // attack was successful, display result on the board
        const newEnemyState = enemyBoard.getState();
        EnemyBoardDOM.setState(newEnemyState, false);

        // wait for enemy to attack and display result on board
        enemyBoard.attackEnemyAI(userBoard);
        const newUserState = userBoard.getState();
        UserBoardDOM.setState(newUserState, true);

        // check if there is one winner
        if (userBoard.hasWon(enemyBoard)) displayWinner(userBoard.name);
        if (enemyBoard.hasWon(userBoard)) displayWinner(enemyBoard.name);
    });
});
