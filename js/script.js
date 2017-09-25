var devID = '98195103';

var featuredDesigners = [];

var menuOpen = false;

var dataBar;
var options;
//Google Charts Bar Graph

// google.charts.load('current', {'packages':['corechart']});
// google.charts.load('current', {'packages':['corechart'], 'mapsApiKey': 'AIzaSyB1qe7ia7SLO6ZZheIqZIvXViHSzMBYzG8'});
// google.charts.setOnLoadCallback(drawChart);

var AccessToken;
	$.ajax({
		url: 'config/config.json',
		dataType: "json",
		success: function(DataFromJSON){
			console.log(DataFromJSON.AccessToken);
			AccessToken = DataFromJSON.AccessToken;
			getID();

		},
		error: function(){
			console.log('Cant get config');
		}
	})

function getID(){
	$.ajax({
		url: "http://www.behance.net/v2/users/" + devID + "/following?api_key=" + AccessToken,
		type: "get",
		dataType: "jsonp",
		success: function(DataFromBehance){
			console.log(DataFromBehance.following);
			var featuredDesigners = DataFromBehance.following;
			showData(featuredDesigners);

		},
		error: function(){
			console.log("Cant get behance data")
		}

	})
}


// SHOW USERS
function showData(featuredDesigners){
	for (var i = 0; i < featuredDesigners.length; i++) {
		var fieldList = [];
		for (var j = 0; j < featuredDesigners[i].fields.length; j++) {
			fieldList.push(` ${featuredDesigners[i].fields[j]}`);
		}
		if (i < 3) {
			//Top 3 designer HTML
			$('#coverFeatured').append(`
				<div data-ID="${featuredDesigners[i].id}" class="coverFeaturedContainer">
					<p class="featureName"><strong>${featuredDesigners[i].display_name}</strong></p>
					<p class="featureFields">${fieldList}</p>
					<div class='modalImagePopup'>
						<p class="statsPopupTitle">
							<i class="fa fa-comment" aria-hidden="true"></i> 
							Comments: ${featuredDesigners[i].stats.comments} 
						</p><br>
						<p class="statsPopupTitle">
							<i class="fa fa-eye" aria-hidden="true"></i> 
							Views: ${featuredDesigners[i].stats.views}
							</p>
						</div>
					<img class="featureImage" src="${featuredDesigners[i].images[276]}" data-ID=${i}/>
				</div>
				`);

			$('.featureImage').mouseenter(function(){

			$(this).css("opacity", "0.1");
			var statsPopup = $();	
			$(this).siblings('div').css("opacity", "1");		
			});
			$('.featureImage').mouseleave(function(){
			$(this).siblings('div').css("opacity", "0");
			$(this).css("opacity", "1");

			});


		} else {
			//non-featured designers
			$('#coverDesigners').append(`
				<div data-ID="${featuredDesigners[i].id}" class="coverDesignersContainer">
					<p class="designersName"><strong>${featuredDesigners[i].display_name}</strong></p>
					<p class="designersFields">${fieldList}</p>
					<div class='modalImagePopup'><p class="statsPopupTitle"><i class="fa fa-comment" aria-hidden="true"></i> Comments: ${featuredDesigners[i].stats.comments} </p><br><p class="statsPopupTitle"><i class="fa fa-eye" aria-hidden="true"></i> Views: ${featuredDesigners[i].stats.views}</p></div>
					<img class="designersImage" src="${featuredDesigners[i].images[276]}"/>
					
				</div>
				`);

			$('.designersImage').mouseenter(function(){

			$(this).css("opacity", "0.1");
			var statsPopup = $();	
			$(this).siblings('div').css("opacity", "1");		
			});
			$('.designersImage').mouseleave(function(){
			$(this).siblings('div').css("opacity", "0");
			$(this).css("opacity", "1");

			});
		}
		$('.coverFeaturedContainer .featureImage').click(function(){
			designerExpand($(this))
		})
		$('.coverDesignersContainer .designersImage').click(function(){
			designerExpand($(this))
		})
			
	}
}

function designerExpand(designer) {
	if (menuOpen == false) {
		var sidebarID = designer.parent()["0"].dataset.id;
		checkMenu();
		$("#sidebar").addClass('designerOpened');
		designer.parent().clone().appendTo("#sidebarContent");
		$('#sidebarContent div').append(`
			<div id="modalDesignerStats">
				<div class="button">View stats</div>
			</div>
			<div id="modalDesignerGrid" class="col-xs-offset-1 col-xs-11 col-noPadding"></div>
			`);
		$.ajax({
			url: "http://www.behance.net/v2/users/" + sidebarID + "/projects?api_key=" + AccessToken,
			dataType: "jsonp",
			success: function(results){
				var result = results.projects;
				console.log(result);
				for (var i = 0; i < result.length; i++) {
					$('#modalDesignerGrid').append(`
						<div class="modalImageContainer">
							<div class="modalImagePopup"></div>
							<img class="modalDesignerImages" src="${results.projects[i].covers[230]}"/>
						</div>
						`);
				}
				$('.modalImageContainer').mouseenter(function(){
					$(this).children('img').css("opacity", "0.4");
					$(this).children('div').append("stats");		
				// console.log(results.projects[i].covers[230])		
				});
				$('.modalImageContainer').mouseleave(function(){
					$(this).children('img').css("opacity", "1");
					$(this).children('div').empty();	
				});
			}	
		});
	}
}

//submit listener for project search
$('#searchForm1').submit(function(){
	event.preventDefault();
	projectSearch($('#testSearch1').val());
})

//function for project search
function projectSearch(searchTerm) {
	var ownerList = [];
	$('#test1').empty();
	be(APIKey).project.search(searchTerm, function success(results){
	var searchResults = results.projects;
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

//submit listener for user search
$('#searchForm2').submit(function(){
	event.preventDefault();
	userSearch($('#testSearch2').val());
})

//function for user search
function userSearch(searchTerm) {
	$('#test2').empty();
	be(APIKey).user.search(searchTerm, function success(results){
	var searchResults = results.users;
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

//check menu state for toggle
function checkMenu(){
	if (menuOpen == true){
		menuCloseFunc();
		menuOpen = false;
	} else {
		menuOpenFunc();
		menuOpen = true;
	}
}

// click on menu
$("#menu-button").click(function(){
	if (menuOpen == false) {
		$("#sidebarMenu").css("display", "inline")
		setTimeout(
			function() {
				$("#sidebarMenu").css("opacity", "1")
			},
			440);
	}
	checkMenu();
});


function menuOpenFunc(){
	setTimeout(
		function() {
			$("body").css("overflow", "hidden");
		   	$("#sidebar").css("width", "100%");
		},
		150);
	setTimeout(
		function() {
			$("#sidebarContent").css("display", "inline");
			$("#sidebar").css("overflow", "auto");
			$("#sidebarContent").css("opacity", "1");
		},
		550);
};

function menuCloseFunc(){
	$("#sidebarMenu").css("opacity", "0")
	$("#sidebar").css("overflow", "hidden");
	$("#sidebarMenu").css("opacity", "0")

	setTimeout(
		function() {
			$("#sidebarMenu").css("display", "none")
	 		$("body").css("overflow", "auto");
			}, 
		440);

	setTimeout(
		function() {
			$('#sidebarContent').children().detach();
			$("#sidebarContent").css("display", "none");
			$("#sidebar").css("width", "35px");
		},
		320);
};

// Menu buttons
$("#featured-designers-link").click(function() {
	setTimeout(
	function() {
	   $('html, body').animate({
		scrollTop: $(".featured-designers-bookmark").offset().top - 40
		}, 100);
	},
	700);
});

$("#our-designers-link").click(function() {
	setTimeout(
	function() {
	   $('html, body').animate({
		scrollTop: $(".our-designers-bookmark").offset().top - 40
		}, 100);
	},
	700);
});

$("#about-us-link").click(function() {
	setTimeout(
	function() {
	   $('html, body').animate({
		scrollTop: $(".about-us-bookmark").offset().top - 120
		}, 100);
	},
	700);
});

// Nav Bar Scroll

// $(window).scroll(function(){
// 	$("#sidebar").css("opacity", 0 + $(window).scrollTop() - 1450);
// });

// $(window).scroll(function(){
// 	$("#sidebar").css("opacity", 0 + $(window).scrollTop() - 1450);
// });

// function isScrolledIntoView(elem)
// {
// 	var docViewTop = $(window).scrollTop();
// 	var docViewBottom = docViewTop + $(window).height();
// 	var elemTop = $(elem).offset().top;
// 	var elemBottom = elemTop - $(elem).height();
// 	return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
// }

// $(window).scroll(function() {
// 	if(isScrolledIntoView($('.featured-designers-bookmark'))){
// 		$("#sidebar").css("width", "35px");
// 	 } else {
// 	 	$("#sidebar").css("width", "0px");

// 	 }


// });

$(window).scroll(function(){
	if ($(window).scrollTop()) {
		$("#sidebar").css("width", "35px");
	}else{
		$("#sidebar").css("width", "0px");
	}
})

//Down Button
$(".fa-chevron-circle-down").click(function(){
	$("html,body").animate({
		scrollTop: $("#content").offset().top
	},
	200);
});

$(".featureImage, .designersImage").click(function(){
	menuOpen = true;
	setTimeout(
		function() {
		   $("#sidebar").css("width", "100%");
		},
		150);

	// disable scrolling body, enable scrolling sidebar
		setTimeout(
	  function() {
				$("body").css("overflow", "hidden");
				$("#sidebar").css("overflow", "scroll");
	  },
	  350);
	setTimeout(
		function() {
		   $("#sidebar").css("width", "100%");
		},
		150);

  });
