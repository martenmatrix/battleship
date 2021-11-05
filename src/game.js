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
    let previewState = [...state];

    const placedShips = [];
    let counter = 0;

    function setState(newArray) {
        state = newArray;
    }

    function setPreviewState(newArray) {
        previewState = newArray;
    }

    function resetPreview() {
        setPreviewState([...state]);
    }

    function createID() {
        counter += 1;
        return `ship${counter}`;
    }

    function createShipReference(length) {
        const newShip = Ship(length);
        const id = createID();

        const newShipWithID = { id, ...newShip };
        placedShips.push(newShipWithID);
        return id;
    }

    function getShipReference(id) {
        const reference = placedShips.find((obj) => obj.id === id);
        return reference;
    }

    function placeShip(length, placeHorizontal, y, x, renderPreview = false) {
        let id, stateCopy;

        if (!renderPreview) {
            // manipulating the real gameboard
            id = createShipReference(length);
            stateCopy = [...state];
        } else {
            id = 'previewship';
            stateCopy = [...previewState];
        }

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

        if (completedPlacingShip) {
            if (!renderPreview) {
                setState(stateCopy);
            } else {
                setPreviewState(stateCopy);
            }
        }
        return completedPlacingShip;
    }

    function receiveAttack(y, x) {
        const stateOfField = state[y][x];
        if (stateOfField === 'miss') return false;
        if (stateOfField === 'empty') {
            state[y][x] = 'miss';
            return 'miss';
        }

        // must have hit a ship if not empty and not missed
        const id = stateOfField;
        const hitShipObject = getShipReference(id);
        hitShipObject.hit();
        state[y][x] = 'hit';
        return true;
    }

    function allSunk() {
        const allShipsSunk = placedShips.every((shipObject) => shipObject.isSunk() === true);
        return allShipsSunk;
    }

    function placeShipPreview(length, placeHorizontal, y, x) {
        const response = placeShip(length, placeHorizontal, y, x, true);
        return response;
    }

    return {
        state, previewState, placeShip, receiveAttack, allSunk, placeShipPreview, resetPreview,
    };
};

const Player = (name) => {
    const playerBoard = Gameboard();
    const isComputer = name === 'computer';
    let iterationAI = 0;

    function attackEnemy(enemyPlayer, y, x) {
        const response = enemyPlayer.receiveAttack(y, x);
        return response;
    }

    const attackedCoordinates = {
        hit: [],
        miss: [],
    };

    function attackEnemyAI(enemyPlayer) {
        // generates number bewteen 0 and 9
        const randomCoordinate = () => Math.floor(Math.random() * 10);

        while (iterationAI < 100) {
            const x = randomCoordinate();
            const y = randomCoordinate();

            const response = attackEnemy(enemyPlayer, y, x);

            if (!(response === false)) {
                // field was not already hit, increase counter
                iterationAI += 1;
            }

            if (response === true) {
                attackedCoordinates.hit.push({ y, x });
                return true;
            }

            if (response === 'miss') {
                attackedCoordinates.miss.push({ x, y });
                return 'miss';
            }
        }

        return false;
    }

    return {
        name, isComputer, attackEnemy, attackEnemyAI, ...playerBoard,
    };
};

// es6 modules are always in strict mode
export { Ship, Gameboard, Player };
