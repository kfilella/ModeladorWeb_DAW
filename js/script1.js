$(document).ready(function() {
	jsPlumb.bind("ready", function() {
	  jsPlumb.registerConnectionType("example", {
  paintStyle:{ strokeStyle:"blue", lineWidth:5  },
  hoverPaintStyle:{ strokeStyle:"red", lineWidth:7 }
});

var c = jsPlumb.connect({ source:"objeto1", target:"objeto2" });
c.bind("click", function() {
  c.setType("example");
}); 
	});
	
	objetos = 0; //numero de objetos arrastrables de paleta
	loads = 0; //numero de cargas de archivo SVG
	idLoad = "import"; //se usa para generar un ID para los objetos SVG
	/*$.contextMenu({
	            selector: '.context-menu-one', 
	            callback: function(key, options) {
	                var m = "clicked: " + key;
	                window.console && console.log(m) || alert(m); 
	            },
	            items: {
	                "edit": {name: "Edit", icon: "edit"},
	                "cut": {name: "Cut", icon: "cut"},
	               copy: {name: "Copy", icon: "copy"},
	                "paste": {name: "Paste", icon: "paste"},
	                "delete": {name: "Delete", icon: "delete"},
	                "sep1": "---------",
	                "quit": {name: "Quit", icon: function(){
	                    return 'context-menu-icon context-menu-icon-quit';
	                }}
	            }
	        });

	        $('.context-menu-one').on('click', function(e){
	            console.log('clicked', this);
    })*/
	var i=0;
	for (i=0; i<=3; i++){
		$("#objeto"+i).load("svg/"+i+".svg", function( response, status, xhr ) {
		  	if ( status == "error" ) {
		    	alert("File not found");
		  	}
	}); //cargo SVG en el div
	}
	
	$('.rectangulo').width($('.rectangulo').parent().width());
	$('.rectangulo').height($('.rectangulo').parent().height());

	//boton se encarga de cargar un archivo SVG
	$('#btnLoad').click(function(){
		idLoads = idLoad+loads;
		svg = $('#txtLoad').val(); //obtengo input del usuario
		$('.canvas').append('<div id="'+idLoads+'"></div>'); //creo el div que envuelve al SVG importado
		$("#"+idLoads).load(svg, function( response, status, xhr ) {
		  	if ( status == "error" ) {
		    	alert("File not found");
		  	}
		}); //cargo SVG en el div
        $("#"+idLoads).addClass("inline");
        $("#"+idLoads).draggable({ //hago arrastrable al SVG
 			containment: 'canvas'
 		});
        loads++;
        $("#"+idLoads).mousedown(function(e){ //SVG desaparece con rueda del mouse
	       	if( e.button == 1 ) { 
	      		$(this).fadeOut();
	      		return false;
	    	} 
	    	return true; 
 		});
    });
 	
 	//clase drag hace a los elementos arrastrables
  	$('.drag').draggable( {
	    containment: 'canvas', //solo son arrastrables dentro del canvas
	    helper: 'clone', //se genera un clon al arrastrar de la paleta
	    start:function(ev, ui){
	    	$("#sidebar-wrapper").removeClass("overflowy");
	    },
	    stop:function(ev, ui) {
	    	var pos=$(ui.helper).offset();
	    	nombre = "#clone"+objetos; //genero un ID para los clones arrastrables
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

  	//hace que el canvas admita objetos arrastrables
	$(".canvas").droppable({
		drop: function(ev, ui) {
			console.log(ui.helper);
			if (ui.helper.attr('id').search(/objeto[0-9]/) != -1){
				objetos++;
				var element=$(ui.draggable).clone();
				element.addClass("tempclass");
				$(this).append(element);
				$(".tempclass").attr("id","clone"+objetos);
				$("#clone"+objetos).removeClass("tempclass");
				draggedNumber = ui.helper.attr('id').search(/objeto([0-9])/)
				itemDragged = "dragged" + RegExp.$1
				$("#clone"+objetos).addClass(itemDragged);
				$("#clone"+objetos).addClass("absolute");
			    $("#clone"+objetos).hover(
			        function() { $(this).addClass("Hover"); },
			        function() { $(this).removeClass("Hover"); }
			    );
							//$("#clone"+objetos).addClass("hideable"+objetos);
			}
		}
	});

}); 	
 