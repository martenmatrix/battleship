/* eslint-disable indent */

const BoardDOM = (id, inDiv) => {
    (function createName(name = id) {
        const nameDIV = inDiv.querySelector('.name');
        nameDIV.textContent = name;
    }());

    function getNewField(x, y) {
        const field = document.createElement('div');
        field.classList.add('field');
        field.dataset.x = x;
        field.dataset.y = y;
        field.dataset.id = id;

        return field;
    }

    (function createFields() {
        const fields = inDiv.querySelector('.fields');

        // create 100 divs in 1 div
        let y = 0;
        let x = 0;
        for (let i = 0; i < 100; i++) {
            const field = getNewField(x, y);
            fields.appendChild(field);

            // every 10 steps increase y and reset x
            x += 1;
            if (x > 9) {
                y += 1;
                x = 0;
            }
        }
    }());

    function setStateField(state, y, x) {
        const fieldSelector = `.fields .field[data-y="${y}"][data-x="${x}"]`;
        const field = inDiv.querySelector(fieldSelector);
        switch (state) {
            case 'miss':
                field.style.background = 'orange';
                break;
            case 'hit':
                field.style.background = 'red';
                break;
            case 'empty':
                field.style.background = 'white';
                break;
            default:
                // must be a ship
                field.style.background = 'black';
        }
    }

    function setState(boardArray) {
        boardArray.forEach((fieldArray, y) => {
            fieldArray.forEach((fieldState, x) => setStateField(fieldState, y, x));
        });
    }

    return { setState };
};

const DragDropAPI = (shipContainer, gameField) => {
    function addListenerToGameField(GameboardObject) {
        gameField.addEventListener('dragover', (e) => {
            GameboardObject.resetPreview();
            const currentDragElement = shipContainer.querySelector('.dragging');
            const shipLength = currentDragElement.dataset.length;
            const placeInField = e.target.closest('.fields .field');
            GameboardObject.placeShipPreview(length, placeHorizontal, y, x)
        });
    }

    function addOnDragListener(div) {
        div.addEventListener('dragstart', () => div.classList.add('dragging'));
    }

    // drop event fires if player let element go
    function addOnReleaseListener(div) {
        div.addEventListener('dragend', () => div.classList.remove('dragging'));
    }

    function addEventListenersToShip(div) {
        addOnDragListener(div);
        addOnReleaseListener(div);
    }

    function getXAndYCoordinateOfFirstCell(div) {
    }

    function createDraggableShip(length) {
        const ship = document.createElement('div');
        ship.classList.add('draggable-ship');
        ship.dataset.length = length;
        ship.setAttribute('draggable', 'true');

        for (let i = 0; i < length; i++) {
            const field = document.createElement('div');
            field.classList.add('field');
            field.classList.add('drag');
            ship.appendChild(field);
        }

        addEventListenersToShip(ship);
        shipContainer.appendChild(ship);
    }

    return { createDraggableShip, addListenerToGameField };
};

const UserInterface = (() => {
    const fieldPlayer = (() => {
        const name = 'You';
        const inDiv = document.getElementById('player');

        const shipContainer = document.querySelector('.draggable-ships');
        const gameField = document.querySelector('#player .fields');
        const dragAPI = DragDropAPI(shipContainer, gameField);

        const boardDOM = BoardDOM(name, inDiv);
        return { ...boardDOM };
    })();

    const fieldEnemy = (() => {
        const name = 'Enemy';
        const inDiv = document.getElementById('enemy');

        const boardDOM = BoardDOM(name, inDiv);
        return { ...boardDOM };
    })();

    function displayWinner(name) {

    }

    return { fieldPlayer, fieldEnemy };
})();

export { UserInterface, DragDropAPI };
