import { Gameboard } from './game';
import UserInterface from './dom';
import './style.css';

const userBoard = Gameboard();
const enemyBoard = Gameboard();

UserInterface.fieldPlayer.setGameBoardObject(userBoard);
