$(document).ready(function() {
	objetos = 0;

	$('.objeto').width($('.objeto').parent().width());
	$('.objeto').height($('.objeto').parent().height());
	$(".resizable").resizable();

  	$('.drag').draggable( {
	    containment: 'canvas',
	    helper: 'clone',
	    stop:function(ev, ui) {
	    	var pos=$(ui.helper).offset();
	    	//console.log(ui.helper);
	    	nombre = "#clone"+objetos
	    	console.log(nombre);
	    	$(nombre).css({"left":pos.left,"top":pos.top});
	    	$(nombre).removeClass("drag");


	       	//cuando objeto se arrastra
	        $(nombre).draggable({
	        	containment: 'parent',
	            stop:function(ev, ui) {
	            	var pos=$(ui.helper).offset();
	            	console.log($(this).attr("id"));
					console.log(pos.left)
	                console.log(pos.top)
	            }
	        });
	        //objeto desaparece cuando aplasto rueda del mouse
	        $(nombre).addClass("hide"+objetos);
	    	$(".hide"+objetos).mousedown(function(e){
		       if( e.button == 1 ) { 
		      		$(this).fadeOut();
		      		return false; 
		    	} 
		    	return true; 
		 	}); 
	    }
	});

	$("#canvas").droppable({
		drop: function(ev, ui) {
			console.log(ui.helper);
			if (ui.helper.attr('id').search(/drag[0-9]/) != -1){
				objetos++;
				var element=$(ui.draggable).clone();
				element.addClass("tempclass");
				$(this).append(element);
				$(".tempclass").attr("id","clone"+objetos);
				$("#clone"+objetos).removeClass("tempclass");

				//Get the dynamically item id
				draggedNumber = ui.helper.attr('id').search(/drag([0-9])/)
				itemDragged = "dragged" + RegExp.$1
				console.log(itemDragged)

				$("#clone"+objetos).addClass(itemDragged);
				
				//$("#clone"+objetos).addClass("hideable"+objetos);
			}
		}
	});

}); 	
  