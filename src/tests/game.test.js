/* eslint-disable no-undef */
/* eslint-disable indent */
import { Ship } from '../game';

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
    test
});
