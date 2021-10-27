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

const Gameboard = () => {
    const state = [
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ];

    function placeShip(horizontal, x, y) {
        
    };

};

export { Ship };
