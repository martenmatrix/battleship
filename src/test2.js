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

const counter = 4;
console.log(counter);

let test;

counter === 4;
counter === 5;

switch (counter) {
    case 4: 
        test = "yo";
    case 5: 
        test = "no";
}

console.log(test);

new Date().getDay()