//para mover un objeto y que otro lo reciba
$(function() {
	$( ".draggable" ).draggable();
    $( "#droppable" ).droppable({
      drop: function( event, ui ) {
        $( this )
          .find( "p" )
            .html( "Recibido" );
      }
    });
});

//para mover un clon de un objeto
$(function() {
  $('.draggableElement').draggable( {
    cursor: 'move',
    containment: 'document',
    helper: 'clone'
  } );
});