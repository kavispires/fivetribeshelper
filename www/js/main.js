/* ============================
  SPLASH SCREEN
  ============================ */

$(document).ready(function(){
    setTimeout(function(){
        $('.splashscreen').fadeOut(2000);
    }, 2000);

});

/* ============================
  SPLASH SCREEN
  ============================ */

$(window).on( "orientationchange", function( event ) {
	orientation();
});

function orientation() {
  	if(window.innerWidth > window.innerHeight){  	
    	$('.portraitorientation').show();
	} else {
        $('.portraitorientation').fadeOut('slow');
	}
}

orientation();