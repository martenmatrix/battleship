/* eslint-disable indent */
function createShip(length) {
    let isSunk = false;

    function logIt() {
        this.isSunk = true;
        console.log(isSunk);
    }

    return { length, isSunk, logIt };
}

const ship = createShip(3);
ship.logIt();
console.log(ship.isSunk);
console.log(ship.length);
