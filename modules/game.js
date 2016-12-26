/*
 *
 * Implementation of the Conway's Game of Life in Javascript.
 * 6.170 Software Studio class. Sept 26, 2016. Ege Ozgirin.
 *
 */

/* Grid object for representing and instantiating cells and neighbors.
 * This object will work as a model for the gamevis widget.
 *
 * @see https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * @see http://mbostock.github.io/protovis/ex/life.html
 *
 * @class Grid
 * @constructor
 */ 


var Game = function() {

	var that = {};
	var that = Object.create(Game.prototype);
	var cells = [];
	var neighbors = [];
	var subscribers = [];
	var rows = 40;
	var columns = 80;


	/* 
 	 * Any dead cell with three live cells in the proximal area 
 	 * that are comprised by horizontally, vertically and diagonally
 	 * adjacent cells, becomes a live cell.
 	 * @method spawn
     * @param {Number} index for calculating neighbor indices
     * @param {Number} value to be added to neighbors
     * @return {Void}
 	 */

	that.spawn = function (index, val) {
		rowInd = Math.floor(index / columns);
		colInd = index % columns;
		that.beforeAndAfter(rowInd).forEach(function(e){
    		that.beforeAndAfter(colInd).forEach(function(i){
      			neighbors[e*columns+i] += val;

      		})
    	});

    	neighbors[index] -= val;

	};

	/*
	 * Function that calculates row and column index from index.
	 * @method getXandY
	 * @param {Number}
	 * @return {Array}
	 */ 

	that.getXandY = function(index) {
		ro = Math.floor(index / columns);
		col = index % columns;
		return [col, ro];
	};

	/*
	 * Simple iteration abstraction for populating an array with a custom function
	 * @method arrayFromTo
	 * @param {Integer} start index
	 * @param {Integer} end index
	 * @param {Array} array to be filled.
	 * @param {method} Function for specifying the value of an array element
	 * @return {Array} New array
	 */ 

 	that.arrayFromTo = function (from, to, array, f) {
 		if (from > to) return array;
 		f(array); that.arrayFromTo(from+1, to, array, f);
 	};

 	/*
	 * Function that adds a random binary element to an array.
	 * @param {Array} Array to be appended.
	 */ 

 	that.randomSeed = function (a) {
 		rand = Math.random() > .5 ? 1 : 0;
 		a.push(rand);
 	};

 	/*
	 * Function that takes number as an input and
	 * returns an array including it and the numbers before and after it.
	 * This will be used to derive indices of the neighbors of a cell.
	 * @param {Integer} Index to be sent.
	 * @return {Array}
	 */ 

 	that.beforeAndAfter = function(ind) {
 		return [ind-1, ind, ind+1];
 	};

 	/* 
 	 * Initiate the cells with random values(1 or 0).
 	 * Update neighbors.
 	 * @method arbitrary
 	 * @return {Void}
 	 */
 	
	that.arbitrary = function() {
		var seeds = [];
		var size = rows*columns; 
		that.arrayFromTo(0, size-1, seeds, that.randomSeed);
		cells = seeds.slice(0);
		cells.forEach(function(e, i, a) {neighbors[i] = 0;});
		
		var liveCells = cells.reduce(function(acc, elm, j, arr) {
			if (arr[j]) {
                acc.push(j);
				return acc;
			}
            return acc;
		}, []);
		
		liveCells.forEach(function(e, i, a){that.spawn(e, 1);});

		publishChanges();
	};

	/*
	 * Function that updates the state of the cells.
	 * returns an array including it and the numbers before and after it.
	 * @method update
	 * @param {Integer} Index to be sent.
	 * @return {Array}
	 */ 

	that.update = function() {
		var temp = neighbors.map(function(e){return e;});
		cells.forEach(function(e, i, a) { 
			if(a[i]) {
				if((temp[i] < 2) || (temp[i] > 3)) {
					that.spawn(i, -1);
					a[i] = 0;
				}
			} else if (temp[i] == 3) {
				that.spawn(i, 1);
				a[i] = 1;
			}
		});

		publishChanges();

	};

	/**
   	 * Subscribe to changes to this object.
   	 * @param subscriber a function that is called whenever the Game model is changed
   	 */

	that.subscribe = function(subscriber){
		subscribers.push(subscriber);
	};

	var publishChanges = function() {
		subscribers.forEach(function(e, i) {
			e();
		})
	}

	/*
   	 * Kills all the cells.
   	 * @method clean
     */

	that.clean = function() {
		cells = cells.map(function(e){ return e && 0});
		neighbors = neighbors.map(function(e) {return e && 0 });
		publishChanges();
	};

	/*
   	 * Get the current state of the cells of the game.
   	 * @method getCells
     */

    that.getCells = function(){
    	return cells;
    };

    /*
   	 * Get the neighbors of the game.
   	 * @method getNeighbors
     */

    that.getNeighbors = function(){
    	return neighbors;
    };

    /*
   	 * Sets the cell alive. Update its neighbors.
   	 * @method setCell
   	 * @param index
     */

	that.setCell = function(index){
		cells[index] = 1;
		that.spawn(index, 1);
		publishChanges();
	};


	Object.freeze(that);
	return that;

}