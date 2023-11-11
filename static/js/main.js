let page = 1;
$().ready(function () {
	$.get("https://rickandmortyapi.com/api/character?page=" + page, function (data){
		let characters = data.results;
		const display = $("#display-chars");
		characters.forEach(function (character) {
			display.append("<div class='character'><img src='" + character.image + "'><div class='right'><h3>" + character.name + "</h3></div>");
		});
	});
});