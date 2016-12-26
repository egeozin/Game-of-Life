/*
 * GameVis_install installs a widget that visualizes the game object in the specified DOM container. 
 * @param {container} a jQuery wrapper around a single empty div element to
 *        install the GradeWidget in.
 * @param {game} game object to use as a model for the
 *        data being displayed and edited by the GameVis.
 */

GameVis_install = 
	function(container, game)

{
	
	var canvas = $('#cv').get(0)
	var context = canvas.getContext("2d");
	var startButton = $("<button type='button'>Play</button>");
	var pauseButton = $("<button type='button'>Pause</button>");
	var randomizeButton = $("<button type='button'>Randomize</button>");
	var cleanButton = $("<button type='button'>Clean</button>");
	var edge = canvas.width/80;
	var playing = false;
	var editMode = false;
	var rects = [];
	console.log(game.columns);

	game.arbitrary();
	drawPixels();

	function step(timestamp) {
		if (playing) {
			game.update();
			window.requestAnimationFrame(step); 
		}
	}

	game.getCells().forEach(function(e, i){
			var xAndY = game.getXandY(i);
			var rect = [xAndY[0]*edge, xAndY[1]*edge, edge, edge];
			rects.push(rect);
	})

    startButton.click(function () {
    	//console.log('accessed!');
    	playing = true;
    	editMode = false;
    	window.requestAnimationFrame(step);
    });

    pauseButton.click(function(){
    	//console.log('accessed! 2');
    	editMode = true;
    	playing = false;
    });

    randomizeButton.click(function(){
    	//console.log('accessed! But...');
    	editMode = false;
    	game.arbitrary();
    });

    cleanButton.click(function(){
    	playing = false;
    	editMode = true;
    	game.clean();
    })

    /* 
 	 * Checks whether the mouse is between specified coordinates.
 	 * Sets a cell alive and redraws the canvas.
 	 */

	$('#cv').click(function(e) {
		if(editMode){
    		var x = e.offsetX,
        		y = e.offsetY;

        	rects.forEach(function(elm, i, a) {
        		if(x > a[i][0]            // mouse x between x and x + width
        		&& x < a[i][0] + a[i][2]
        		&& y > a[i][1]            // mouse y between y and y + height
        		&& y < a[i][1] + a[i][3]) {
            		game.setCell(i);
            		drawPixels();
        		}
        	});
    	} 	
	});


    container.append(startButton);
    container.append(pauseButton);
    container.append(randomizeButton);
    container.append(cleanButton);



    /* 
 	 * Draw a square without stroke into canvas.
 	 * @method pixel
     * @param {Number} index for calculating neighbor indices
     * @param {Number} value to be added to neighbors
     * @param {Number} edge length for the rectangle
     * @param {Number} Parameter representing whether the cell is alive or not.
     * @oaram {Object} Context object
 	 */

	function pixel(x, y, e, exist, ctx){
		if (exist) {
		ctx.fillStyle = "#CD5360"// "#438496";
		ctx.fillRect(x*e, y*e, e, e);
		} else {
			ctx.fillStyle = "#EFEFEF";
			ctx.fillRect(x*e, y*e, e, e);
		}

	}


	/* 
 	 * Draw squares for each cell in the model.
 	 * @method drawPixels
 	 */

	function drawPixels() {
		$.each(game.getCells(), function (i, val) {
			var xAndY = game.getXandY(i);
			pixel(xAndY[0], xAndY[1], edge, val, context);
		});

	}

	game.subscribe(function(){
		drawPixels();
	})

	
}