import { Gameboard } from './game.js';

const board = Gameboard();
board.placeShip(3, true, 3, 2);
board.receiveAttack(3, 2);
