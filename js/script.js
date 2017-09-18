// boolean for open menu

var menuOpen = false;

$(document).ready(function() {

// menu
// click on menu
   $("#menu-button").click(function(){
   	if (menuOpen == true){
   		menuClose();
   		menuOpen = false;
   	}else{
   		menuOpen();
   		menuOpen = true;
   	}

  });

   function menuOpen(){
   	$("#sidebar").css("opacity", "1");
   	// $("#sidebar").toggleClass('gradient-fill');
   	setTimeout(
            function() {
               $("#sidebar").css("width", "100%");
            },
            350);
   };

   function menuClose(){
   	 $("#sidebar").css("width", "35px");
   	// $("#sidebar").toggleClass('gradient-fill');
   	setTimeout(
            function() {
            $("#sidebar").css("opacity", "0.3");  
            },
            900);
   	
   };

});