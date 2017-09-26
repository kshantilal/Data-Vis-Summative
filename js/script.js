var devID = '98195103';

var featuredDesignersArray = [];

var menuOpen = false;

//Global Variables
var AccessToken;
var sidebarID;
var Likes;
var Comments;
var PersonName;
//next 2 lines development only
AccessToken = "t6yjIR3c4Jwmu4kcuZUZsfiNCRHCY51f";
getID();

	// $.ajax({
	// 	url: 'config/config.json',
	// 	dataType: "json",
	// 	success: function(DataFromJSON){
	// 		console.log(DataFromJSON.AccessToken);
	// 		AccessToken = DataFromJSON.AccessToken;
	// 		getID();

	// 	},
	// 	error: function(){
	// 		console.log('Cant get config');
	// 	}
	// })

function getID(){
	$.ajax({
		url: "http://www.behance.net/v2/users/" + devID + "/following?api_key=" + AccessToken,
		type: "get",
		dataType: "jsonp",
		success: function(DataFromBehance){
			// console.log(DataFromBehance.following);
			var featuredDesigners = DataFromBehance.following;
			showData(featuredDesigners);
		},
		error: function(){
			console.log("Cant get behance data")
		}
	})
}

function showStats(){
	$("#modalDesignerStats .button").click(function(){
		var dataBar;
		var options;

		google.charts.load('current', {'packages':['corechart']});
		google.charts.load('current', {'packages':['geochart'], 'mapsApiKey': 'AIzaSyB1qe7ia7SLO6ZZheIqZIvXViHSzMBYzG8'});
		google.charts.setOnLoadCallback(drawChart);

		function drawChart(){
			var barChartJSON = $.ajax({
				url: "http://www.behance.net/v2/users/" + sidebarID + "/projects?api_key=" + AccessToken,
				type: "get",
				contentType: "application/json",
				dataType: "jsonp",
				success: function(DataFromJSON){
					// console.log(DataFromJSON.projects);
					var dataResults = DataFromJSON.projects;
					dataBar = new google.visualization.DataTable();
					dataBar.addColumn('string', 'Name');
					dataBar.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
					// dataBar.addColumn('number', 'id'); have to also add in i to the row
					dataBar.addColumn('number', 'Likes');
					// dataBar.addColumn('number', 'Views');
					dataBar.addColumn('number', 'Comments');
					

					for (var i = 0; i < dataResults.length; i++) {
							PersonName = dataResults[i].name;
							Likes = dataResults[i].stats.appreciations;
							Comments = dataResults[i].stats.comments;
							// Views = DataFromJSON.projects[i].stats.views;
							// console.log(Comments);
							
						dataBar.addRow([
							PersonName, createCustomHTMLContent(PersonName, Likes, Comments), Likes, Comments
						]);						
					}

					options = {
						title: 'MY PROJECT STATS',
						width: "100%",
						height: 600,
						colors: ['#009DFF', '#2BB5A5'],
						// This line makes the entire category's tooltip active.
						focusTarget: 'category',
						// Use an HTML tooltip.
						tooltip: { isHtml: true },
						titleTextStyle: {
							color: '#fff',
							fontSize: 30,
							fontName: 'Lato, san-serif'
						},

						hAxis: {
							title: 'Stats',
							titleTextStyle: {color: '#fff'},
							textStyle: {color: '#fff', fontName: 'Lato, san-serif'}
						},
						vAxis: {
							title: 'Projects',
							titleTextStyle: {color: '#fff'},
							textStyle: {color: '#fff', fontName: 'Lato, san-serif'}
						},
						backgroundColor: 'transparent',
						legend: {
							textStyle: {
								color: '#fff',
								fontName: 'Lato, san-serif'
							}
						}
					}
					var barChart = new google.visualization.BarChart(document.getElementById('chart1')); //what chart are you using eg PieChart
					barChart.draw(dataBar, options);
				},
				error: function(){
					console.log('Bar chart error');
				}

			});
		}
			setTimeout(function(){
				$('#sidebar').animate({
				scrollTop: $("#chart1").offset().top

				}, 300);
			}, 500);

		function createCustomHTMLContent(PersonName, Likes, Comments) {
			return '<div style="padding:10px 10px 10px 10px;">' +
				'<table class="medals_layout">' + '<tr>' +
				'<td><span style="font-size: 15px; color: #009DFF";>' + "<strong>"+PersonName+"</strong>" + '</span></td>' + '</tr>' + '<tr>' +
				'<td><span class="glyphicon glyphicon-thumbs-up" style="font-size: 20px; padding-top: 20px; padding-bottom: 20px; color: #009DFF"></span></td>' +
				'<td><span style="font-size: 20px; color: #009DFF">' + Likes + '</span></td>' + '</tr>' +
				'<td><span class="glyphicon glyphicon-comment" style="font-size: 20px; color: #2BB5A5"></span>' +
				'<td><span style="font-size: 20px; color: #2BB5A5">' + Comments + '</span></td>' + '</tr>' + '<tr>'
		}
	})
}

// SHOW USERS
function showData(featuredDesigners){
	for (var i = 0; i < featuredDesigners.length; i++) {
		featuredDesignersArray.push(featuredDesigners[i]);
		var fieldList = [];
		for (var j = 0; j < featuredDesigners[i].fields.length; j++) {
			fieldList.push(`${featuredDesigners[i].fields[j]}`);
		}
		if (i < 3) {
			//Top 3 designer HTML
			$('#coverFeatured').append(`
				<div data-ID="${featuredDesigners[i].id}" class="coverFeaturedContainer col-sm-4">
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
				<div data-ID="${featuredDesigners[i].id}" class="coverDesignersContainer col-sm-3">
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
		sidebarID = designer.parent()["0"].dataset.id;
		checkMenu();
		$(".modalImagePopup").css('opacity', '0'); 
		$(".featureImage, .designersImage").css('opacity', '1'); 
		$("#sidebar").addClass('designerOpened');
		// designer.parent().clone().appendTo("#sidebarContent");
		for (var i = 0; i < featuredDesignersArray.length; i++) {
			if (featuredDesignersArray[i].id == sidebarID) {
				var fieldList = [];
				for (var j = 0; j < featuredDesignersArray[i].fields.length; j++) {
					fieldList.push(`${featuredDesignersArray[i].fields[j]}`);
				}
				$('#sidebarContent').append(`
					<div id="modalDesignerContainer" data-ID="${sidebarID}" class="col-sm-12">
						<div id="modalProfileContainer" class="col-sm-12">
							<p class="designersName"><strong>${featuredDesignersArray[i].display_name}</strong></p>
							<p class="designersFields">${fieldList}</p>
							<div class='modalImagePopup'><p class="statsPopupTitle"><i class="fa fa-comment" aria-hidden="true"></i> Comments: ${featuredDesignersArray[i].stats.comments} </p><br><p class="statsPopupTitle"><i class="fa fa-eye" aria-hidden="true"></i> Views: ${featuredDesignersArray[i].stats.views}</p></div>
							<img class="designersImage" src="${featuredDesignersArray[i].images[276]}"/>
						</div>
						<div id="modalDesignerStats" class="col-sm-12">
							<div class="button">View stats</div>
						</div>
						<div id="modalDesignerGrid" class="col-sm-12"></div>
					</div>
				`);
				i = featuredDesignersArray.length;
			}
		}
		
		$.ajax({
			url: "http://www.behance.net/v2/users/" + sidebarID + "/projects?api_key=" + AccessToken,
			dataType: "jsonp",
			success: function(results){
				var result = results.projects;			
				for (var i = 0; i < result.length; i++) {
					$('#modalDesignerGrid').append(`
						<div class="modalImageContainer">
							<div class="modalImagePopup"></div>
							<img class="modalDesignerImages" src="${results.projects[i].covers[230]}"/>
						</div>
						`);					
				}
				showStats();
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

//Submit listener for project search
$('#searchForm1').submit(function(){
	event.preventDefault();
	projectSearch($('#testSearch1').val());
})

//Function for project search
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

//Submit listener for user search
$('#searchForm2').submit(function(){
	event.preventDefault();
	userSearch($('#testSearch2').val());
})

//Function for user search
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

//Check menu state for toggle
function checkMenu(){
	if (menuOpen == true){
		menuCloseFunc();
		menuOpen = false;
	} else {
		menuOpenFunc();
		menuOpen = true;
	}
}

// Click on menu
	$("#menuButton").click(function(){
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
	$("#chart1").empty();

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

// Scroll down
$(".scrollDown").click(function() {
	$('html, body').animate({
		scrollTop: $("#aboutUs").offset().top - 120
	}, 100);
});

// Menu buttons
$("#featuredDesignersLink").click(function() {
	setTimeout(
	function() {
		$('html, body').animate({
			scrollTop: $(".featuredDesignersBookmark").offset().top - 40
			}, 100);
	},
	700);
});

$("#ourDesignersLink").click(function() {
	setTimeout(
	function() {
		$('html, body').animate({
			scrollTop: $(".ourDesignersBookmark").offset().top - 40
			}, 100);
	},
	700);
});

$("#aboutUsLink").click(function() {
	setTimeout(
	function() {
		$('html, body').animate({
			scrollTop: $(".aboutUsBookmark").offset().top - 120
			}, 100);
	},
	700);
});

$(window).scroll(function(){
	if ($(window).scrollTop()) {
		$("#sidebar").css("width", "35px");
		$("#menuButton").css("position", "fixed");
	}else{
		$("#sidebar").css("width", "0px");
		$("#menuButton").css("position", "static");
	}
})

//Down Button
$(".fa-chevron-circle-down").click(function(){
	$("html,body").animate({
		scrollTop: $("#gradient-aboutUs").offset().top
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

	// Disable scrolling body, enable scrolling sidebar
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
