let page = 1;
$().ready(function () {
	$.get("https://rickandmortyapi.com/api/character?page=" + page, function (data){
		let characters = data.results;
		const display = $("#display-chars");
		characters.forEach(function (character) {
			let str = "<div class='char'><img src='" +
				character.image +
				"'>";
			str += "<div class='right'>";

			str += "<p class='char-name'>Nome: <span>" + character.name + "<span></p>";
			str += "<p class='char-status'>Status: ";
			switch (character.status) {
				case "Alive":
					str += "<span class='col-verde bold'>" + character.status + "</span>";
					break;
				case "Dead":
					str += "<span class='col-vermelho bold'>" + character.status + "</span>";
					break;
				case "unknown":
					str += "<span class='bold underline'>" + character.status + "</span>";
					break;
			}
			str += "</p>";

			str += "</div>";
			str += "</div>";
			display.append(str);
		});
	});
});