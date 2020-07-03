function dialogo (ref, valor)
	{
	
	    $(document).ready(function(){
	    
	    if (valor =='1')
	    {
	        nombreAncla = "Manuales/PRJ_ManualdeUsuario_BIP_Dialogo.htm#" + ref;
        }
        if (valor =='2')
        {
            nombreAncla = "Manuales/PRJ_ManualdeUsuarioAdmimistracionPortal_Dialogo.htm#" + ref;
        }
         else if (valor =='3')
        {
            nombreAncla = "Manuales/PRJ_ManualUsuarioLocalizaciones_Dialogo.htm#" + ref;
        }
         else if (valor =='4')
        {
            nombreAncla = "Manuales/PRJ_ManualdeUsuarioIntervenciones_Dialogo.htm#" + ref;
        }
        else if (valor =='5')
        {
            nombreAncla = "Manuales/PRJ_ManualdeUsuarioTitularidad_Dialogo.htm#" + ref;
        }
        
        k=document.createElement('div'); 
   	    var ancho =(((screen.width)*60)/100 );
	    var alto = (((screen.availHeight -top.screenTop)*60)/100 );	
	    var contenidoHTML="<div id='Helper'style='background-color: #EDF7FF' align='right' >";
	    contenidoHTML += "<input type='button' id='botonCierre'  onclick='closeModal()' class='botonAyuda' value='Cerrar' />";
	    contenidoHTML += "<iframe id='Content' src='" +nombreAncla + "' align=center style='height:"+ alto +"; width:"+ancho+";'>"; 
	    contenidoHTML += "</iframe>";
	    contenidoHTML += "</div>";
        k.innerHTML= contenidoHTML;

	$('#btnAyuda').click(function()
	{
		var bgdiv = $('<div>').attr({
					className: 'bgtransparent',
					id: 'bgtransparent'
					});
		$('body').append(bgdiv);
		
		var wscr = $(window).width();
		var hscr = $(window).height();
				
		$('#bgtransparent').css("width", wscr);
		$('#bgtransparent').css("height", hscr);
		
		
		// ventana flotante
		var moddiv = $('<div>').attr({
					className: 'bgmodal',
					id: 'bgmodal'
					});	
		
		$('body').append(moddiv);
		$('#bgmodal').append(k);
		
		$(window).resize();
	});

	$(window).resize(function(){
		// dimensiones de la ventana
		var wscr = $(window).width();
		var hscr = $(window).height();
      


		// estableciendo dimensiones de background
		$('#bgtransparent').css("width", wscr);
		$('#bgtransparent').css("height", hscr);
		
		// definiendo tamaño del contenedor
		$('#bgmodal').css("width", ancho+'px');
		$('#bgmodal').css("height", alto+'px');
		
		// obtiendo tamaño de contenedor
		var wcnt = $('#bgmodal').width();
		var hcnt = $('#bgmodal').height();
		
		// obtener posicion central
		var mleft = ( wscr - wcnt ) / 2;
		var mtop = (( hscr - hcnt ) / 2);
		
		// estableciendo posicion
		$('#bgmodal').css("left", mleft+'px');
		$('#bgmodal').css("top", mtop+'px');
	});
	
	$(window).keyup(function(event){
   		if (event.keyCode == 28) {
			var y = $("#botonCierre");
			y.click();
			closeModal();
		
   		}
	});
	
 });
}
function closeModal()
{

	$('#bgmodal').remove();
	$('#bgtransparent').remove();
}