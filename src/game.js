/* eslint-disable indent */
'use strict';
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
    ]
    const placedShips = {};
    let counter = 0;

    
    function setState(array) {
        state = array;
    }

    function createID() {
        counter++;
        return `ship${counter}`;
    }

    function createShipReference(length) {
        const newShip = Ship(length);

        const id = createID();
        placedShips[id] = newShip;
        return id;
    }


    function placeShip(length, placeHorizontal, y, x) {
        const id = createShipReference(length);
        const stateCopy = [...state];
        const completedPlacingShip = true;
        

        // place ship
        for (let i = 0; i < length; i++) {
                const changingAxis = placeHorizontal ? x : y;
                const manipulatedCoord = changingAxis + i;

                if (placeHorizontal) {
                    const fieldContent = stateCopy[y][manipulatedCoord];
                    if (!(fieldContent === 'empty')) {
                        completedPlacingShip = false;
                        break;
                    }

                    stateCopy[y][manipulatedCoord] = id;
                }

                if (!placeHorizontal) {
                    const fieldContent = stateCopy[y][manipulatedCoord];
                    if (!(fieldContent === 'empty')) {
                        completedPlacingShip = false;
                        break;
                    }

                    stateCopy[manipulatedCoord][x] = id;
                }
            }
        
        if (completedPlacingShip) setState(stateCopy);
        return completedPlacingShip;
    }

    function receiveAttack(y, x) {

    }

    return { state, placeShip, receiveAttack}

};
const board = Gameboard();
board.placeShip(3, false, 0, 0);
board.state;
export { Ship, Gameboard };