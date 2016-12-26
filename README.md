Conway's Game of Life Interpretation for 6.170 Software Studio class at MIT, 2016.
Ege Ozgirin

	This project is designed with: 

	Javascript for model-view-controller implementation + 
	Jquery for user interaction
	HTML Canvas for visualization of the board.

	You can initate the game by:
	* downloading the repository
	* starting a simple HTTP server with Python
	* accessing from localhost.
	
# Game of Life

### Rules of the Game

Every cell interacts with its eight neighbours, that are the cells that are horizontally, vertically, or diagonally adjacent, according to the following rules:

* Any live cell with fewer than two live neighbours dies (under-population).
* Any live cell with two or three live neighbours lives on to the next generation.
* Any live cell with more than three live neighbours dies (over-population).
* Any dead cell with exactly three live neighbours becomes a live cell (reproduction).

Interface of the game:

<p align="center"><img src="https://github.mit.edu/egeozin/Game-of-Life/blob/master/images/initial.jpg" width="500"></p>

### Implementation Details

Initially, I have started writing functions for the game logic. 
I created a Game object in "game.js" and implemented my functions within it. 
I created cells array and neighbors array that contain
values, and functions that manipulate them accordingly.

Inspired by Micheal Bostock's implementation, I have decided to use "cells" array that comprises of binary integers representing whether a cell is alive("1") or dead("0").
I would have integrate 'cells' and 'neighbors' in one object. I have decided to keep them separate as neigbors array is used only in Game model.
I believe this is still a simple but effective representation that could establish a clean interface with the controller file. 

In "gamevis.js", I selected canvas element that I have defined in my html to add elements into it. I have created four buttons for game functionality. 
These are "Play", "Pause", "Randomize" and "Clean". Users can create their own starting configuration by clicking on the canvas above in Pause or Clean mode. Randomize initiates a random configuration.

<p align="center"><img src="https://github.mit.edu/egeozin/Game-of-Life/blob/master/images/progress.jpg" width="900"></p>

I implemented a subscriber pattern that draws/updates pixels in the canvas whenever relevant functions are called in "game.js".

I used functionals in the Game object for copying new array(map() in game.update), for cleaning into 'O's(map() in game.clean), for extracting alive cells(reduce() in arbitrary).
I have defined my own iteration abstraction: 'arrayFromTo' in order to populate an array with custom functions.

I have decided to enable editing during the 'Pause' mode in order to let the user to intervene during the game.

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.