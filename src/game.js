/* eslint-disable indent */

const Ship = (length) => {
    let positionsHit = 0;

    // make hit function that it subtract from length
    function hit() {
        positionsHit += 1;
    }

    function isSunk() {
        return (length <= positionsHit);
    }

    return { length, hit, isSunk };
};

const test = Ship(3);
test.hit(1);

const Gameboard = () => {
    let state = [
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ];
    const placedShips = {};
    let counter = 0;

    function setState(array) {
        state = array;
    }

    function createID() {
        counter += 1;
        return `ship${counter}`;
    }

    function createShipReference(length) {
        const newShip = Ship(length);

        const id = createID();
        placedShips[id] = newShip;
        return id;
    }

    function getShipReferenceFromID(id) {
        const reference = Object.keys(placedShips).find((key) => {
            const value = placedShips[key];
            return value === id;
        });
        return reference;
    }

    function placeShip(length, placeHorizontal, y, x) {
        const id = createShipReference(length);
        const stateCopy = [...state];
        let completedPlacingShip = true;

        // place ship
        for (let i = 0; i < length; i++) {
                const changingAxis = placeHorizontal ? x : y;
                const manipulatedCoord = changingAxis + i;

                if (placeHorizontal) {
                    // get field content
                    const fieldContent = stateCopy[y][manipulatedCoord];
                    if (!(fieldContent === 'empty')) {
                        completedPlacingShip = false;
                        break;
                    }
                    // set field content
                    stateCopy[y][manipulatedCoord] = id;
                }

                if (!placeHorizontal) {
                    // get field content
                    const fieldContent = stateCopy[y][manipulatedCoord];
                    if (!(fieldContent === 'empty')) {
                        completedPlacingShip = false;
                        break;
                    }
                    // set field content
                    stateCopy[manipulatedCoord][x] = id;
                }
            }

        if (completedPlacingShip) setState(stateCopy);
        return completedPlacingShip;
    }

    function receiveAttack(y, x) {
        const stateOfField = state[y][x];
        if (stateOfField === 'miss') return false;
        if (stateOfField === 'empty') {
            state[y][x] = 'miss';
            return false;
        }

        // must have hit a ship if not empty and not missed
        const id = stateOfField;
        const hitShipObject = placedShips[id];
        hitShipObject.hit();
        return true;
    }

    function allSunk() {
    }

    return { state, placeShip, receiveAttack };
};

console.log('this is output');

const board = Gameboard();
board.placeShip(3, true, 3, 2);
board.receiveAttack(3, 2);

// es6 modules are always in strict mode
export { Ship, Gameboard };
