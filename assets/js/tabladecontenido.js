/* Tabla de contenido dinámica */
$(function() { 
Toc.init({
    $nav: $("#toc"), 
    $scope: $("")
  });
});

/* Elimina clase h1 de tabla de contenido */
$(document).ready(function () {
	$('.content h1').each(function (i, el) {
		$(el).replaceWith('<h1 data-toc-skip>' + $(el).html() +'</h1>')
  });
}); 
