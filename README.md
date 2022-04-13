# Battleship
This application provides you the possibilities to play the classic Battleship Game against a computer, which uses a bit of AI.

The ships can be placed per drop and drag because the [HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) is used. The ships, which can be placed, have the `draggable` attribute set to `true`. After a user drags a ship onto his game board, the `dragover` event listener assigned to the game board fires every few hundred milliseconds. 
The corresponding tile the user is currently dragging its ship over is found with `e.target.closest('.fields .field')`, which returns the closets DIV in relation to the place of the mouse pointer and a preview is generated.
The user can now drop the ship on a tile and the `drop` event listener assigned to the game board will fire, the ship gets placed.
If a user decides to abort the placement of a ship and leaves the game board with it, the `dragleave` is fired once, which resets the preview.

The computer plays with a moderate AI built in. It places random tiles until it hits a ship, then it checks every tile next to the successful shot. If there are no tiles next to the successful shot, it assumes the ship has sunk.

## Table of Contents
- [Deployed links](#globe_with_meridians-deployed-links)
- [Usage](#grey_exclamation-usage)
- [Features](#sparkles-features)
- [Installation](#wrench-installation)
- [Technology stack](#blue_book-technology-stack)
- [License](#scroll-license)

## :globe_with_meridians: Deployed links
> :warning: The page is not correctly displayed on mobile devices or smaller screens.

The application is hosted at the following address:

- https://martenmatrix.github.io/battleship/

## :grey_exclamation: Usage

1. Place the ships located above your game field per drag and drop.
2. If you've placed every ship, click a tile on the enemies board. If the thils is now red, you've hit a ship, if its orange, you missed.
3. The computer should place a tile on your board.
4. Enjoy your game and good luck. :tada:
If something does not work as expected, please [create an issue](https://github.com/martenmatrix/battleship/issues).

## :sparkles: Features
- place ships per drag and drop
- play against a computer with an AI

## :wrench: Installation
If you want to run the application on your local pc or just want to contribute, do the following steps:
1. Clone the repository.
`git clone https://github.com/martenmatrix/battleship`
2. Install the dependencies.
`npm install`
3. If you want to run the website on your localhost type:
`npm run start`

## :blue_book: Technology Stack

- **Webpack** v5.60.0
- **Jest** v27.3.1
- **ESLint** v.7.32.0
- **Babel** v.7.15.8
- **PostCSS** v.8.3.11

## :scroll: License
[MIT](https://github.com/martenmatrix/battleship/blob/main/LICENSE)
