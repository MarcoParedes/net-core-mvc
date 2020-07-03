/* 
    VGM 25012011
    Funciones que validan los formato de fecha  
    tambien valida que la fecha no sea mayor al dia de hoy
 */
 
 
 /*
    Esta función valida que el formato de la fecha sea el correcto
    y ademas que la fecha no sea mayor al dia de hoy
 */
    
function esFechaValida(fecha)
{
    var myArray = new Array(2);
	myArray[0]= true;
	myArray[1]= "";
	
	if (fecha != undefined && fecha.value != "" )
	{
	    
        	
		if (!/^\d{2}\/\d{2}\/\d{4}$/.test(fecha))
		{   
		     myArray[0]= false;
	        myArray[1]= ("Formato de fecha no válido (dd/mm/aaaa)");
			
		}
		var dia  =  parseInt(fecha.substring(0,2),10);
		var mes  =  parseInt(fecha.substring(3,5),10);
		var anio =  parseInt(fecha.substring(6),10);	
		if (anio <= Anio())
		{     
		    if( mes <= Mes() && anio <= Anio())
		    {
		        if( dia <=Dia())
		        {
		            if (dia>Dias_mes(mes, anio) || dia==0)
		            {
						   myArray[0]= false;
	                    myArray[1]= ("Fecha introducida errónea");
		            }
		        }
		        else
		        {
		             myArray[0]= false;
	                myArray[1]= ("Día mayor a Hoy");
		        }
		    }    
		    else
		    {
				if( mes >= Mes() && anio < Anio())
				{
					if( dia <=Dia() || anio <= Anio())
		            {
		                if (dia>Dias_mes(mes, anio) || dia==0)
		                {
						     myArray[0]= false;
	                         myArray[1]= ("Fecha introducida errónea");

		                }
		            }
		            else
		            {
		                   myArray[0]= false;
	                       myArray[1]= ("Día mayor a Hoy");
		              
		            }
				}
				else
				{
					   myArray[0]= false;
	                 myArray[1]= ("Mes mayor a Mes Actual");
				}
		    }
		}
		else
		{
            myArray[0]= false;
	        myArray[1]= ("Año Mayor a Año Actual");
			
		}
			
	}
	else
	{
		   myArray[0]= false;
	        myArray[1]= ("Fecha es Requerida"); 
	}
	return myArray;
}


/*
    Esta función compara dos fechas 
    y que las fechas no sean mayores al dia de hoy
    el resultado lo devuelve en un array de dos campos
    r[0]= es el resultado true-false
    r[1]= mensaje a mostrar en pantalla
*/
function Validar(Desde, Hasta)
{
	
	var xDay=parseInt(Desde.substring(0, 2));
	var xMonth=parseInt(Desde.substring(3, 5));
	var xYear=parseInt(Desde.substring(6,10));
	
	var yDay=parseInt(Hasta.substring(0,2));
	var yMonth=parseInt(Hasta.substring(3, 5));
	var yYear=parseInt(Hasta.substring(6,10));
	
	var myArray = new Array(2);
	myArray[0]= true;
	myArray[1]= "";
	if (Desde != "" || Hasta != "")   
	{
	    var arrayD= esFechaValida(Desde);
	    var arrayH = esFechaValida(Hasta);
	    if (arrayD[0]!=true || arrayH[0]!= true)
	    {
	       if (arrayD[1]=="")
			{
				myArray[1]=arrayH[1];
				myArray[0]=arrayH[0];
			}
			else
			{
				myArray[1]=arrayD[1];
				myArray[0]=arrayD[0]
			}
	    }
	    else
	    {
	        if (xYear > Anio() || yYear > Anio())
			{
				myArray[0]= false;
			    myArray[1]= "Año Mayor a Año Actual";
			}
		    if (xYear < yYear )
		    {
		    	if (xYear > Anio() || yYear > Anio())
		    	{
		    		myArray[0]= false;
		    		myArray[1]= "Año Mayor a Año Actual";
		    	}
		    }
		    else
		    {
				if (xYear == yYear)
				{ 
					if (xMonth < yMonth)
				    {
				    	myArray[0]= true;
				    	myArray[1]= "";
				    }
				    else
				    { 
				    	if (xMonth == yMonth)
				    	{
				    		if (xDay > yDay)
			    			{
			    				myArray[0]= false;
			    				myArray[1]="Día Desde mayor a Día Hasta";
			    			}
			    		} 
			    		else
			    		{
			    			myArray[0]= false;
			    			myArray[1]="Mes Desde mayor a Mes Hasta";
		    			}
		    		}	  
				}
		    	else
		    	{
		    		myArray[0]= false;
		    		myArray[1]="Año Desde mayor a Año Hasta";	
	    		}
	    	}
        }
	}	
	else
	{
		myArray[0]= false;
	    myArray[1]="Las Fechas son Requeridas";	
	}
	return myArray;
}



/*
    Funcion que formatea y obtiene la fecha de hoy 
    devuelve fecha con  formato "dd/mm/aaaa" SIN HORA
*/    
function obtiene_fecha() 
{	
	var fecha_actual = new Date()

	var dia = fecha_actual.getDate();
	var mes = fecha_actual.getMonth() + 1;
	var anio = fecha_actual.getFullYear();

	if (mes < 10)
		mes = '0' + mes

	if (dia < 10)
		dia = '0' + dia

	return (dia + "/" + mes + "/" + anio);
}


/*
    Retorna el Año actual en formato numero
*/
function Anio() 
{	
	var fecha_actual = new Date();
	var anio =parseInt(fecha_actual.getFullYear());
	return anio
}

/*
    Retorna el mes actual en numero
*/

function Mes() 
{	
	var fecha_actual = new Date();
	var mes = parseInt(fecha_actual.getMonth() + 1);
	return mes
}

/*
    Retorna el dia de hoy
*/
function Dia() 
{	
	var fecha_actual = new Date();
	var dia = parseInt(fecha_actual.getDate());
	return dia
}

/*
    Funcion que segun el mes y año 
    devuelve la cantidad de dias del mes
*/

function Dias_mes(mes, anio)
{
    var numDias =31;
    switch(mes)
	{
	     case 1:case 3:case 5:case 7:case 8:case 10:case 12:
		      numDias=31;
			break;
		    case 4: case 6: case 9: case 11:
			    numDias=30;
			break;
			case 2:
			    if ( ( anio % 100 != 0) && ((anio % 4 == 0) || (anio % 400 == 0))) 
			    {
					    numDias=29 ;
	            }
                 else 
                    {
	                    numDias=28;
	                }
			break;
			default:
			numDias =31;
			}
	    return numDias;
				        
}