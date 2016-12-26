$(function() {

	console.log($.fn.jquery);

	$(document).ready(function(){

		var game = Game();

		GameVis_install($("#widget"), game);

	});


})
