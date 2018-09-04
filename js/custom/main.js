$(document).on('click', '.main-accordion__link', function(){
	if($(this).parent().hasClass('main-accordion__content--active')){
		$(this).parent().removeClass('main-accordion__content--active');
	} else{
		$('.main-accordion__content').removeClass('main-accordion__content--active');
		$(this).parent().addClass('main-accordion__content--active');
	}

	return false;
});