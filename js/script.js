var devID = '98195103';

var featuredDesigners = [];

var menuOpen = false;

var AccessToken;
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

		var Followers;
		var Comments;
		var PersonName;

function showStats(){
	$("#modalDesignerStats .button").click(function(){
		google.charts.load('current', {'packages':['corechart']});
		google.charts.load('current', {'packages':['geochart'], 'mapsApiKey': 'AIzaSyB1qe7ia7SLO6ZZheIqZIvXViHSzMBYzG8'});
		google.charts.setOnLoadCallback(drawChart);

		var dataBar;
		var options;
		
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
					dataBar.addColumn('number', 'Followers');
					// dataBar.addColumn('number', 'Views');
					dataBar.addColumn('number', 'Comments');
					

					for (var i = 0; i < dataResults.length; i++) {
							PersonName = dataResults[i].name;
							Followers = dataResults[i].stats.appreciations;
							Comments = dataResults[i].stats.comments;
							// Views = DataFromJSON.projects[i].stats.views;
							// console.log(Comments);
							
						dataBar.addRow([
							PersonName, createCustomHTMLContent(PersonName, Followers, Comments), Followers, Comments
						]);
							// console.log(Followers);
					
						// console.log(createCustomHTMLContent);
					}

					options = {
						title: 'MY PROJECT STATS',
						width: "100%",
						height: "100%",
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

		function createCustomHTMLContent(PersonName, Followers, Comments) {
			return '<div style="padding:10px 10px 10px 10px;">' +
				'<table class="medals_layout">' + '<tr>' +
				'<td><span style="font-size: 15px; color: #009DFF";>' + "<strong>"+PersonName+"</strong>" + '</span></td>' + '</tr>' + '<tr>' +
				'<td><span class="glyphicon glyphicon-user" style="font-size: 40px; padding-top: 20px; padding-bottom: 20px; color: #FF2B67"></span></td>' +
				'<td><span style="font-size: 20px; color: #009DFF">' + Followers + '</span></td>' + '</tr>' +
				'<td><span class="glyphicon glyphicon-comment" style="font-size: 40px; color: #FF2B67"></span>' +
				'<td><span style="font-size: 20px; color: #2BB5A5">' + Comments + '</span></td>' + '</tr>' + '<tr>'
		}

	})
	
}

// SHOW USERS
function showData(featuredDesigners){
	for (var i = 0; i < featuredDesigners.length; i++) {
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
				<div data-ID="${featuredDesigners[i].id}" class="coverDesignersContainer col-sm-6">
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
var sidebarID;

function designerExpand(designer) {
	if (menuOpen == false) {
		sidebarID = designer.parent()["0"].dataset.id;
		console.log(sidebarID);
		checkMenu();
		$(".modalImagePopup").css('opacity', '0'); 
		$(".featureImage, .designersImage").css('opacity', '1'); 
		$("#sidebar").addClass('designerOpened');
		designer.parent().clone().appendTo("#sidebarContent");
		$('#sidebarContent').append(`
			<div data-ID="${sidebarID}" class="col-sm-12">
				<div id="modalDesignerStats" class="col-sm-12">
					<div class="button">View stats</div>
				</div>
				<div id="modalDesignerGrid" class="col-sm-12"></div>
			</div>
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

	if ("width" < "1440px") {
		$(".coverFeaturedContainer col-sm-12");
	}else {
		$(".coverFeaturedContainer col-sm-4");	
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

// scroll down
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
