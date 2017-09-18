var APIKey = "BjjvUIbXE6c4XfLAYUIyPszNDSzI4CP8"

function projectSearch(searchTerm) {
	be(APIKey).project.search(searchTerm, function success(results){
	var searchResults = results.projects;
	console.log(searchResults);	
		for (var i = 0; i < 10; i++) {
			var ownerList = [];
			for (var j = 0; j < searchResults[i].owners.length; j++) {
				ownerList.push(` ${searchResults[i].owners[j].display_name}`);
			}
			$('#test1').append(`
				<div class="projectName">${searchResults[i].name}</div>
				<div class="projectOwners">${ownerList}</div>
				<div>${searchResults[i].created_on}</div
				<div class="projectURL">${searchResults[i].url}</div>
				<div class="projectCover"><img src="${searchResults[i].covers[404]}"/></div>
				<div class="projectStats">Likes:${searchResults[i].stats.appreciations} Views:${searchResults[i].stats.views} Comments:${searchResults[i].stats.comments} 
				<br><br>
			`);
		}
	})
}

function userSearch(searchTerm) {
	be(APIKey).user.search(searchTerm, function success(results){
	var searchResults = results.users;
	console.log(searchResults);	
		for (var i = 0; i < 10; i++) {
			var ownerList = [];
			for (var j = 0; j < searchResults[i].fields.length; j++) {
				ownerList.push(` ${searchResults[i].fields[j]}`);
			}
			$('#test2').append(`
				<div class="userName">${searchResults[i].display_name}</div>
				<div class="userURL">${searchResults[i].url}</div>
				<div class="userCover"><img src="${searchResults[i].images[276]}"/></div>
				<div class="userStats">Likes:${searchResults[i].stats.appreciations} Views:${searchResults[i].stats.views} Comments:${searchResults[i].stats.comments}
				<br><br>
			`);
		}
	})
}