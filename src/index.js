import { Gameboard } from './game';
import { UserInterface } from './dom';

const board = Gameboard();
board.placeShip(3, true, 3, 2);
board.receiveAttack(3, 2);
