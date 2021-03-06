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
    function getArrayWithoutReference(array) {
        return array.map((nestedArray) => [...nestedArray]);
    }

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
    // copys previewState without reference
    let previewState = getArrayWithoutReference(state);
    const placedShips = [];
    let counter = 0;

    function setState(newArray) {
        state = getArrayWithoutReference(newArray);
    }

    function setPreviewState(newArray) {
        previewState = getArrayWithoutReference(newArray);
    }

    function getState() {
        return state;
    }

    function getPreviewState() {
        return previewState;
    }

    function resetPreview() {
        setPreviewState(state);
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

    function removeShipReference(id) {
        const index = placedShips.findIndex((obj) => obj.id === id);
        placedShips.splice(index, 1);
        counter -= 1;
    }

    function placeShip(length, placeHorizontal, y, x, renderPreview = false) {
        let id, stateCopy;

        if (!renderPreview) {
            // manipulating the real gameboard
            id = createShipReference(length);
            stateCopy = getArrayWithoutReference(state);
        } else {
            id = 'previewship';
            stateCopy = getArrayWithoutReference(previewState);
        }

        // place ship from starting point along its length
        for (let partsPlaced = 0; partsPlaced < length; partsPlaced++) {
                const isNotEmpty = (field) => !(field === 'empty');

                if (placeHorizontal) {
                    const newX = x + partsPlaced;
                    // exceeds array if field is bigger than 10
                    if (newX > 9) {
                        if (!renderPreview) removeShipReference(id);
                        return false;
                    }
                    const field = stateCopy[y][newX];
                    if (isNotEmpty(field)) {
                        if (!renderPreview) removeShipReference(id);
                        return false;
                    }
                    stateCopy[y][newX] = id;
                }
                if (!placeHorizontal) {
                    const newY = y + partsPlaced;
                    // exceeds array if field is bigger than 10
                    if (newY > 9) {
                        if (!renderPreview) removeShipReference(id);
                        return false;
                    }
                    const field = stateCopy[newY][x];
                    if (isNotEmpty(field)) {
                        if (!renderPreview) removeShipReference(id);
                        return false;
                    }
                    stateCopy[newY][x] = id;
                }
            }

        if (renderPreview) {
            setPreviewState(stateCopy);
        }
        if (!renderPreview) {
            setState(stateCopy);
        }
        // ship was successfully placed
        return true;
    }

    function receiveAttack(y, x) {
        if (y > 9 || x > 9) return false;
        if (y < 0 || x < 0) return false;
        const stateOfField = state[y][x];
        if (stateOfField === 'miss') return false;
        if (stateOfField === 'hit') return false;
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

    function populateRandom(shipLengthArray) {
        shipLengthArray.forEach((length) => {
            let response = false;
            do {
                const randomX = Math.floor(Math.random() * 10);
                const randomY = Math.floor(Math.random() * 10);
                const placeHorizontal = Math.random() >= 0.5;
                response = placeShip(length, placeHorizontal, randomY, randomX);
            } while (!response);
        });
    }

    return {
        getState,
        getPreviewState,
        placeShip,
        receiveAttack,
        allSunk,
        placeShipPreview,
        resetPreview,
        populateRandom,
    };
};

const GamePlayer = (name, shipsToPlay) => {
    const playerBoard = Gameboard();
    const isComputer = name.toLowerCase() === 'computer';
    let iterationAI = 0;

    if (isComputer) {
        playerBoard.populateRandom(shipsToPlay);
    }

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
            let x = randomCoordinate();
            let y = randomCoordinate();
            // check if array contains coordinates
            const isAlreadyAttacked = attackedCoordinates
                                        .hit
                                        .some((obj) => obj.x === x && obj.y === y);

            const isAlreadyMissed = attackedCoordinates
                                        .miss
                                        .some((obj) => obj.x === x && obj.y === y);

            // checks if a hit field was not checked for ships next to it
            const hitFieldNotCheckedAround = () => {
                const fieldToCheck = attackedCoordinates.hit.find((obj) => {
                        const isFree = obj.aroundHit.top === false
                                        || obj.aroundHit.left === false
                                        || obj.aroundHit.right === false
                                        || obj.aroundHit.bottom === false;
                        return isFree;
                    });
                if (fieldToCheck === undefined) {
                    return false;
                }
                return fieldToCheck;
            };

            let response = false;
            let fieldToCheck = false;
            fieldToCheck = hitFieldNotCheckedAround();
            if (fieldToCheck) {
                x = fieldToCheck.x;
                y = fieldToCheck.y;
                if (!fieldToCheck.aroundHit.top) {
                    y -= 1;
                    fieldToCheck.aroundHit.top = true;
                } else if (!fieldToCheck.aroundHit.left) {
                    x -= 1;
                    fieldToCheck.aroundHit.left = true;
                } else if (!fieldToCheck.aroundHit.right) {
                    x += 1;
                    fieldToCheck.aroundHit.right = true;
                } else if (!fieldToCheck.aroundHit.bottom) {
                    y += 1;
                    fieldToCheck.aroundHit.bottom = true;
                }
            }

            if ((!(isAlreadyAttacked || isAlreadyMissed))
                || fieldToCheck) {
                response = attackEnemy(enemyPlayer, y, x);
            }

            if (!(response === false)) {
                // field was not already hit, increase counter
                iterationAI += 1;
            }

            if (response === true) {
                attackedCoordinates.hit.push({
                y,
                x,
                aroundHit: {
                    top: false,
                    left: false,
                    right: false,
                    bottom: false,
                },
                });

                return true;
            }

            if (response === 'miss') {
                attackedCoordinates.miss.push({ x, y });
                return 'miss';
            }
        }

        return false;
    }

    function hasWon(enemyPlayer) {
        const allSunk = enemyPlayer.allSunk();
        return allSunk;
    }

    return {
        name, isComputer, attackEnemy, attackEnemyAI, hasWon, ...playerBoard,
    };
};

// es6 modules are always in strict mode
export { Ship, Gameboard, GamePlayer };
