let char_info = {};

$().ready(function() {
	let params = new URLSearchParams(window.location.search);
	let char_name = params.get("name");
	if (char_name == null) {
		alert("No character name provided");
		return;
	}
	char_name = char_name.trim();
	if (char_name == "") {
		alert("No character name provided");
		return;
	}
	char_name = char_name.replace(/ /g, "%20");
	let specific_params = ["status", "species", "type", "gender", "origin", "location", "image", "episode", "url", "created"];
	let more_params = [];
	params.forEach(function(value, key) {
		if (key != "name" && specific_params.includes(key)) {
			more_params.push(key);
		}
	});
	if (more_params.length > 0) {
		more_params = more_params.map(function(param) {
			return param + "=" + params.get(param);
		});
	}
	console.log("Specific params: ", more_params);
	let url = "https://rickandmortyapi.com/api/character/";
	if (params.has("id")) {
		url += params.get("id");
	} else {
		try {
			url += "?name=" + char_name + (more_params && more_params.length > 0 ? "&" + more_params.join("&") : "");
		} catch (e) {
			url += "?name=" + char_name;
		}
	}
	console.log("URL: ", url);
	$.ajax({
		url: url,
		type: "GET",
		// data: {},
		// data: JSON.stringify(data),
		async: false,
		dataType: "json",
		headers: {
			"Content-Type": "application/json"
		},
		success: function(data) {
			let character = data;
			if (!params.has("id")) {
				if (!data || !data.results) {
					alert("No character found with the name: " + char_name);
					return;
				}
				if (data.results.length == 0) {
					alert("No character found with the name: " + char_name);
					return;
				}
				if (data.results.length > 1) {
					alert("Multiple characters found with the name: " + char_name + ", displaying the first one.");
					console.log("Multiple characters found with the name: " + char_name);
					console.log(data.results);
					console.log("Displaying the first one.");
					console.log(data.results[0]);
				}
			}
			/*
			"id": 2,
			"name": "Morty Smith",
			"status": "Alive",
			"species": "Human",
			"type": "",
			"gender": "Male",
			"origin": {
				"name": "Earth",
				"url": "https://rickandmortyapi.com/api/location/1"
			},
			"location": {
				"name": "Earth",
				"url": "https://rickandmortyapi.com/api/location/20"
			},
			"image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
			"episode": [
				"https://rickandmortyapi.com/api/episode/1",
				"https://rickandmortyapi.com/api/episode/2",
				// ...
			],
			"url": "https://rickandmortyapi.com/api/character/2",
			"created": "2017-11-04T18:50:21.651Z"
			*/
			$(".char-name").html(character.name);
			$("#char-image").attr("src", character.image);
			$("#char-image").attr("alt", character.name);
			$("#char-id").html(character.id);
			$("#char-created").html(character.created.split("T")[0]);
			let type = character.type;
			if (type == "") {
				type = "Unknown";
			}
			$("#char-type").html(type);

			$("#char-status").html(character.status);
			$("#char-species").html(character.species);
			switch (character.gender) {
				case "Male":
					$("#char-gender").html( character.gender + " ♂️");
					break;
				case "Female":
					$("#char-gender").html( character.gender + " ♀️");
					break;
				case "unknown":
					$("#char-gender").html( character.gender + " 🤷");
					break;
				default:
					$("#char-gender").html( character.gender + " ⚧️");
			}

			switch (character.status) {
				case "Alive":
					$("#char-status").html("<span class='col-verde'>" + character.status + "</span>");
					break;
				case "Dead":
					$("#char-status").html("<span class='col-vermelho'>" + character.status + "</span>");
					break;
				case "unknown":
					$("#char-status").html("<span class='italic'>" + character.status + "</span>");
					break;
			}
			$("#char-origin").html(character.origin.name);
			$("#char-location").html(character.location.name);
			$("#char-episode-count").html(character.episode.length);
			$("#char-url").html(`<a href="${character.url}" target="_blank" class="underline">Here for Rick & Morty API</a>`);
		},
		error: function(xhr, status, error) {
			$("#char-info").html("Error fetching character data");
			$("#char-image").attr("src", "https://rickandmortyapi.com/api/character/avatar/2.jpeg");
			$("#char-image").attr("alt", "Error fetching character data");
			$("#char-id").html("Error");
			$("#char-created").html("Error");
			$("#char-type").html("Error");
			$("#char-status").html("Error");
			$("#char-species").html("Error");
			$("#char-origin").html("Error");
			$("#char-location").html("Error");
			$("#char-episode-count").html("Error");
			$("#char-url").html("Error");
			console.error("Error fetching character data:", error);
			alert("Error fetching character data. Please try again later.");
		}
	});
});