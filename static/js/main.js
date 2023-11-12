let page = 1;
let totalPages = 0;
let storedCharsPerPage = [];
let chars = [];

function updateChars() {
	if (storedCharsPerPage[page] != null) {
		const display = $("#display-chars");
		display.html("");
		storedCharsPerPage[page].forEach(function (character) {
			let str = "<div class='char'><img src='" +
			character.image +
			"'>";
			str += "<div class='right'>";

			str += "<p class='char-name'>Nome: <span>" + character.name + "</span></p>";
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
		if (page > 1) {
			$(".display-prev").show();
		} else {
			$(".display-prev").hide();
		}
		if (page < totalPages) {
			$(".display-next").show();
		} else {
			$(".display-next").hide();
		}
		$("#display-page").html(page);
		return;
	}
	storedCharsPerPage[page] = [];
	$.get("https://rickandmortyapi.com/api/character?page=" + page, function (data) {
		console.log(data);
		totalPages = data.info.pages;
		let characters = data.results;
		const display = $("#display-chars");
		display.html("");
		characters.forEach(function (character) {
			storedCharsPerPage[page].push(character);
			let str = "<div class='char'><img src='" +
				character.image +
				"'>";
			str += "<div class='right'>";

			str += "<p class='char-name'>Nome: <span>" + character.name + "</span></p>";
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
		if (data.info.prev == null) {
			$(".display-prev").hide();
		} else {
			$(".display-prev").show();
		}
		if (data.info.next == null) {
			$(".display-next").hide();
		} else {
			$(".display-next").show();
		}
		$("#display-page").html(page);
	});
}
$().ready(function () {
	updateChars();
	$(".display-prev .display-btn").click(function () {
		if (page > 1) {
			page--;
			updateChars();
		}
	});
	$(".display-next .display-btn").click(function () {
		page++;
		updateChars();
	});
});