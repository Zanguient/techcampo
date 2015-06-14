$(document).ready(function () {
	//Efeito de tags para posts
	$('#tags').tagsInput({
		defaultText:'Adicionar tag',
	});

	//Editor para posts
	$('#body').wysihtml5({
		"font-styles": false,
		"html": true,
		"stylesheets": ["/stylesheets/bootstrap.wysihtml5.css"]
	});
});