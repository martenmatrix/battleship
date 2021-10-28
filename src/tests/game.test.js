/* eslint-disable no-undef */
/* eslint-disable indent */
import { Ship, Gameboard } from '../game';

describe('Ship Factory Function', () => {
    test('You can pass in length parameter, which is accessible as property', () => {
        const ship = new Ship(3);
        const shipLength = ship.length;
        expect(shipLength).toEqual(3);
    });

    test('has hitState array property', () => {
        const ship = new Ship(3);
        expect(Array.isArray(ship.hitState)).toEqual(true);
    });

    test('hit() takes a position and marks it as hit', () => {
        const ship = new Ship(3);
        ship.hit(0);
        expect(ship.hitState).toEqual([true, false, false]);
    });

    test('isSunk() can tell if the ship is completely sunk', () => {
        const ship = new Ship(3);
        ship.hit(1);
        expect(ship.isSunk()).toEqual(false);
        ship.hit(0);
        ship.hit(2);
        expect(ship.isSunk()).toEqual(true);
    });
});

describe('Gameboard Factory Function', () => {
    const board = Gameboard();
    
    test('Has a state array property', () => {
        expect(Array.isArray(board.state)).toEqual(true);
    });

    test('Is a 10x10 field', () => {
        const state = board.state;
        expect(state[9][9]).toEqual('empty');
    });

    test('Can place a ship horizontally', () => {
        const response = board.placeShip(3, true, 0, 0);
        const boardState = board.state;
        expect(response).toEqual(true);
        expect(boardState[0][0]).not.toEqual('empty');
        expect(boardState[0][1]).not.toEqual('empty');
        expect(boardState[0][2]).not.toEqual('empty');
    });

    test('Can place a ship vertically', () => {
        const response = board.placeShip(3, false, 3, 0);
        const boardState = board.state;
        expect(response).toEqual(true);
        expect(boardState[3][0]).not.toEqual('empty');
        expect(boardState[4][0]).not.toEqual('empty');
        expect(boardState[5][0]).not.toEqual('empty');
    });

    test('Ship can receive an attack', () => {
        const didHit = board.receiveAttack();
        expect(didHit).toEqual(true); 
    });

    test('Empty fields can receive an attack and are marked as missed', () => {
        const didHit = board.receiveAttack(9, 0);
        const state = board.state;
        expect(didHit).toEqual(false);
        expect(state[9][0]).toEqual('miss');
    });

    test('Unable to place a ship on an already posessed position', () => {
        const placedShip = board.placeShip(4, false, 0, 0);
        expect(placedShip).toEqual(false);
    });

    test.todo('Has allSunk() tells if all ships are sunk')
})