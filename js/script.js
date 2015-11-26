$(document).ready(function() {
	counter = 0;
  $('.drag').draggable( {
    containment: 'droppable',
    helper: 'clone',
    stop:function(ev, ui) {
    	var pos=$(ui.helper).offset();
    	//console.log(ui.helper);
    	objName = "#clonediv"+counter
    	console.log(objName);
    	$(objName).css({"left":pos.left,"top":pos.top});
    	$(objName).removeClass("drag");


       	//When an existiung object is dragged
        $(objName).draggable({
        	containment: 'parent',
            stop:function(ev, ui) {
            	var pos=$(ui.helper).offset();
            	console.log($(this).attr("id"));
				console.log(pos.left)
                console.log(pos.top)
            }
        });
    }
  });
	$("#droppable").droppable({
		drop: function(ev, ui) {
			console.log(ui.helper);
			if (ui.helper.attr('id').search(/drag[0-9]/) != -1){
				counter++;
				var element=$(ui.draggable).clone();
				element.addClass("tempclass");
				$(this).append(element);
				$(".tempclass").attr("id","clonediv"+counter);
				$("#clonediv"+counter).removeClass("tempclass");

				//Get the dynamically item id
				draggedNumber = ui.helper.attr('id').search(/drag([0-9])/)
				itemDragged = "dragged" + RegExp.$1
				console.log(itemDragged)

				$("#clonediv"+counter).addClass(itemDragged);
			}
		}
	});
});