var APIKey = "BjjvUIbXE6c4XfLAYUIyPszNDSzI4CP8";
var featuredDesignerID = ['79180651','60254','107441'];



function grabDesigners() {
	for (var i = 0; i < featuredDesignerID.length; i++) {
		be(APIKey).user(featuredDesignerID[i], function success(results){
			var result = results.user;
			var fieldList = [];
			console.log(result)
			for (var j = 0; j < result.fields.length; j++) {
				// fieldList = [];
				fieldList.push(` ${result.fields[j]}`);
			}
			$('#coverFeatured').append(`
				<div class="coverFeaturedContainer">
					<p class="featureName">${result.display_name}</p>
					<img class="featureImage">src="${result.images[276]}"/>
					<p class="featureFields">${fieldList}</p>
				</div>
				`);
			
		});
	}
}

grabDesigners();

$('#searchForm1').submit(function(){
	event.preventDefault();
	projectSearch($('#testSearch1').val());
})

$('#searchForm2').submit(function(){
	event.preventDefault();
	userSearch($('#testSearch2').val());
})

function projectSearch(searchTerm) {
	var ownerList = [];
	$('#test1').empty();
	be(APIKey).project.search(searchTerm, function success(results){
	var searchResults = results.projects;
	console.log(searchResults);	
		for (var i = 0; i < 10; i++) {
			
			for (var j = 0; j < searchResults[i].owners.length; j++) {
				ownerList.push(` ${searchResults[i].owners[j].display_name}`);
			}
			$('#test1').append(`
				<div class="projectName">${searchResults[i].name}</div>
				<div class="projectName">${searchResults[i].id}</div>
				<div class="projectOwners">${ownerList}</div>
				<div>${searchResults[i].created_on}</div
				<a target="_blank" href="${searchResults[i].url}">Link to page</a>
				<div class="projectCover"><img src="${searchResults[i].covers[404]}"/></div>
				<div class="projectStats">Likes:${searchResults[i].stats.appreciations} Views:${searchResults[i].stats.views} Comments:${searchResults[i].stats.comments} 
				<br><br>
			`);
		}
	})
}

function userSearch(searchTerm) {
	$('#test2').empty();
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
				<div class="userName">${searchResults[i].id}</div>
				<a target="_blank" href="${searchResults[i].url}">Link to page</a>
				<div class="userCover"><img src="${searchResults[i].images[276]}"/></div>
				<div class="userStats">Likes:${searchResults[i].stats.appreciations} Views:${searchResults[i].stats.views} Comments:${searchResults[i].stats.comments}
				<br><br>
			`);
		}
	})
}