import $ from 'jquery';
$(document).ready(function(){
	$(document).on('click','.top-right-button-container button',function(){
		$('.modal-right').show();
		$('.modal.fade.show').show();
	})
	$(document).on('click','.modal-header .close span',function(){
		$('.modal-right').hide();
		$('.modal.fade.show').hide();
	})
	
	$(document).on('click','.list-unstyled li',function(){
		$('.list-unstyled li').removeClass('active');
		$(this).addClass('active');
	})
});