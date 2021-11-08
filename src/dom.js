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
    let GameboardObject;
    let boardDOMObject;
    let currentlyDragging = null;
    let placeHorizontal = false;

    function setPlaceHorizontal(boolean) {
        placeHorizontal = boolean;
    }

    function setBoardDOMObject(boardDOM) {
        boardDOMObject = boardDOM;
    }

    function displayPreview() {
        boardDOMObject.setState(GameboardObject.getPreviewState());
    }

    function generatePreviewFromDraggingElement(e) {
        GameboardObject.resetPreview();
        const shipLength = currentlyDragging.dataset.length;
        const hoverCell = e.target.closest('.fields .field');
        const { x, y } = hoverCell.dataset;
        GameboardObject.placeShipPreview(parseInt(shipLength, 10),
                                        placeHorizontal,
                                        parseInt(y, 10),
                                        parseInt(x, 10));
        displayPreview();
    }

    function placeShipFromDraggingElement(e) {
        const shipLength = currentlyDragging.dataset.length;
        const hoverCell = e.target.closest('.fields .field');
        const { x, y } = hoverCell.dataset;
        const isPlaced = GameboardObject.placeShip(parseInt(shipLength, 10),
                                        placeHorizontal,
                                        parseInt(y, 10),
                                        parseInt(x, 10));
        if (isPlaced) currentlyDragging.classList.add('placed');
    }

    // will execute when gameboard is set
    function addListenerToGameField() {
        gameField.addEventListener('dragover', (e) => {
        // prevent default to drop event to work because it is not a valid place to drop data
        e.preventDefault();
        generatePreviewFromDraggingElement(e);
        });
        gameField.addEventListener('dragleave', (e) => {
            // if div in what the mouse currently entered
            // is a child of the div which the event listener was added to return
            if (e.currentTarget.contains(e.relatedTarget)) return;
            GameboardObject.resetPreview();
            displayPreview();
        });
        gameField.addEventListener('dragenter', (e) => {
            // if the div the mouse currently exited
            // is a child of the div which the event listener was added to return
            if (e.currentTarget.contains(e.relatedTarget)) return;
        });
        gameField.addEventListener('drop', placeShipFromDraggingElement);
    }

    function setGameBoardObject(gameBoardObject) {
        GameboardObject = gameBoardObject;
        addListenerToGameField();
    }

    function addOnDragListener(div) {
        div.addEventListener('dragstart', () => {
            currentlyDragging = div;
            div.classList.add('dragging');
        });
    }

    // drop event fires if player let element go
    function addOnReleaseListener(div) {
        div.addEventListener('dragend', () => div.classList.remove('dragging'));
    }

    function addEventListenersToShip(div) {
        addOnDragListener(div);
        addOnReleaseListener(div);
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

    return {
        setGameBoardObject,
        setBoardDOMObject,
        setPlaceHorizontal,
        createDraggableShip,
        addListenerToGameField,
    };
};

const UserInterface = (() => {
    const shipsToCreate = [5, 4, 3, 3, 2];

    const fieldPlayer = (() => {
        const name = 'You';
        const inDiv = document.getElementById('player');

        const boardDOM = BoardDOM(name, inDiv);

        const shipContainer = document.querySelector('.draggable-ships');
        const gameField = document.querySelector('#player .fields');
        const dragAPI = DragDropAPI(shipContainer, gameField);
        dragAPI.setBoardDOMObject(boardDOM);

        // create draggable ships
        shipsToCreate.forEach((length) => dragAPI.createDraggableShip(length));

        const { setGameBoardObject, setPlaceHorizontal } = dragAPI;
        return { ...boardDOM, setGameBoardObject, setPlaceHorizontal };
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

export default UserInterface;
