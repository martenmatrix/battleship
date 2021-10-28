/* eslint-disable indent */

const Ship = (length) => {
    const hitState = [];

    function createState() {
        const createHitState = () => hitState.push(false);
        for (let i = 0; i < length; i++) createHitState();
    }

    function hit(index) {
        this.hitState[index] = true;
    }

    function isSunk() {
        return hitState.every((isHit) => isHit === true);
    }

    createState();
    return {
        length, hitState, hit, isSunk,
    };
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
        const stateOfField = state[x][y];
        if (stateOfField === 'miss') return false;
        if (stateOfField === 'empty') return false;

        // must have hit a ship if not empty and not missed
        const id = stateOfField;
        const hitShip = getShipReferenceFromID(id);
        hitShip.hit();
        return true;
    }

    function allSunk() {

    }

    return { state, placeShip, receiveAttack };
};

const board = Gameboard();
board.receiveAttack(2, 2);

// es6 modules are always in strict mode
export { Ship, Gameboard };
