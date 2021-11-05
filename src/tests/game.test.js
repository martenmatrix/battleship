/* eslint-disable no-undef */
/* eslint-disable indent */
import { Ship, Gameboard, Player } from '../game';

describe('Ship Factory Function', () => {
    test('You can pass in length parameter, which is accessible as property', () => {
        const ship = new Ship(3);
        const shipLength = ship.length;
        expect(shipLength).toEqual(3);
    });

    test('hit() marks one position as hit', () => {
        const ship = new Ship(3);
        ship.hit();
        expect(ship.isSunk()).toEqual(false);
    });

    test('if all positions are hit, isSunk is true', () => {
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toEqual(true);
    });

    test('if ship is more hit than there are positions, isSunk is false', () => {
        const ship = new Ship(1);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toEqual(true);
    });
});

describe('Gameboard Factory Function', () => {
    const board = Gameboard();

    test('Has a state array property', () => {
        expect(Array.isArray(board.state)).toEqual(true);
    });

    test('Is a 10x10 field', () => {
        const { state } = board;
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
        const response = board.placeShip(3, false, 6, 0);
        expect(response).toEqual(true);
        const didHit = board.receiveAttack(6, 0);
        expect(didHit).toEqual(true);
    });

    test('If ship received an attack, state in array is hit', () => {
        expect(board.state[6][0]).toEqual('hit');
    });

    test('Empty fields can receive an attack and are marked as missed', () => {
        const { state } = board;
        const didHit = board.receiveAttack(9, 0);
        expect(didHit).toEqual('miss');
        expect(state[9][0]).toEqual('miss');
    });

    test('Unable to place a ship on an already posessed position', () => {
        const placedShip = board.placeShip(4, false, 0, 0);
        expect(placedShip).toEqual(false);
    });

    test('Has allSunk() tells if all ships are sunk', () => {
        const board2 = Gameboard();
        board2.placeShip(2, true, 5, 0);
        board2.receiveAttack(5, 0);
        board2.receiveAttack(5, 1);
        expect(board2.allSunk()).toEqual(true);
    });

    // test if it has an array of previewState
    describe('Preview function', () => {
        const newBoard = Gameboard();
        test('previewState is a 10x10 array', () => {
            const { previewState } = newBoard;
            expect(Array.isArray(previewState)).toEqual(true);
        });
        test('previewState has currently the same state as the normal state', () => {
            const { previewState, state } = newBoard;
            expect(previewState).toEqual(state);
        });
        test('placeShipPreview() returns true if a placement of a ship is possible changes the preview array', () => {
            const { previewState } = newBoard;
            const response = newBoard.placeShipPreview(3, true, 0, 0);
            expect(response).toEqual(true);
            expect(previewState[0][0]).not.toEqual('empty');
            expect(previewState[0][1]).not.toEqual('empty');
            expect(previewState[0][2]).not.toEqual('empty');
        });
        test('placeShipPreview() returns false and does not change the array if a move is not possible', () => {
            const previousState = newBoard.previewState;
            const response = newBoard.placeShipPreview(3, true, 0, 0);
            expect(response).toEqual(false);
            const { previewState } = newBoard;
            expect(previewState).toEqual(previousState);
        });
        test('resetPreview() resets the array to the current state', () => {
            const { previewState } = newBoard;
            newBoard.placeShipPreview(3, true, 0, 0);
            newBoard.resetPreview();
            expect(previewState).toEqual(state);
        });
        // todo maybe completely replace previewState with one var declarations as refernce is kept
    });
});

describe('Player Factory Function', () => {
    const player = Player('player1');
    const player2 = Player('player2');

    test('attackEnemy() takes an enemy player factory and receives an attack on it', () => {
        expect(Array.isArray(player.state)).toEqual(true);
    });

    test('Players have an accessible name property', () => {
        expect(typeof player.name).toEqual('string');
    });

    test('Players can attack enemy with attackEnemy() and get a response', () => {
        player.placeShip(1, true, 0, 0);
        const response = player2.attackEnemy(player, 0, 0);
        expect(response).toEqual(true);
        const response2 = player2.attackEnemy(player, 1, 1);
        expect(response2).toEqual('miss');
    });

    describe('Attack AI', () => {
            const computer = Player('computer');
            const computerEnemy = Player('player1');

            test('has isComputer property', () => {
                expect(computer.isComputer).toEqual(true);
            });

            test('when doing 100 random attacks all miss', () => {
                for (let i = 0; i < 100; i++) {
                    const response = computer.attackEnemyAI(computerEnemy);
                    expect(response).toEqual('miss');
                }
            });

            test('every state field of the enemy has the missed state', () => {
                computerEnemy.state.forEach((fieldArray) => {
                    const everyFieldMiss = fieldArray.every((field) => field === 'miss');
                    expect(everyFieldMiss).toEqual(true);
                });
            });

            test('if every state field is posessed returns false', () => {
                const response = computer.attackEnemyAI(computerEnemy);
                expect(response).toEqual(false);
            });
    });
});
