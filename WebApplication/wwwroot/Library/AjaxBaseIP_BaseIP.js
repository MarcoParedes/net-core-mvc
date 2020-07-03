/*
     VGM 19102010 modifique el llamado ReporteBatchAjax.GetItems  
     agregue en el for el if que hace el alternado de color
*/




function populateTable1() {

	CursorWait();
    AgregarHeadersExcel();
    AgregarHeadersResultados();
	
	ReporteBatchAjax.GetItems (
		function(result) { // por aca pasa con las filas del Excel
			
			if(result.value != null) {

				var items = result.value;
				
				if(!EstaVacio(items))
				    ProcesarPlanilla(items);
			    else
			    {
					cambiarEstado('block', 'none');
    				alert('La planilla excel se encuentra vacia.');
	    			CursorNormal();
			    }
			}
			else {
				cambiarEstado('block', 'none');
				alert('No hay items para procesar en la planilla excel.');
				CursorNormal();
			}	
		}
	)
	
}

function EstaVacio(items){
    for (var i = 0; i < items.length; i++){
        if (items[i] != "")
            return false;
    }
    return true;
}

var indiceExcel = 0;
var indiceHTML = 1;
function ProcesarPlanilla(items){
    
    contadorRows = CargarDatosExcel(items);
    
    var contadorAlternado = 0;

    function ProcessItemCallBack(result) {
        CursorWait();
        var localResult = result.value;
        if(localResult[1] != null)	{
            InsertarResultado (localResult, contadorAlternado);
            contadorAlternado++;
        }

        SetResultado (indiceHTML, localResult[0])

        indiceHTML++;
        if (indiceHTML < contadorRows + 1) {
            CursorWait();
	        indiceExcel++;
	        SetProcesando (items, ProcessItemCallBack, indiceHTML);
        }
        else {
	        CursorNormal();
	        var mostrarBotonExportarObj = document.getElementById("mostrarBotonExportar");
            mostrarBotonExportarObj.style.display='';	
        }
    	
    }

    SetProcesando (items, ProcessItemCallBack, indiceHTML);
}

function SetProcesando (items, ProcessItemCallBack, indiceHTML) {
    while (items[indiceExcel * 3] == "" && items[(indiceExcel * 3)+1] == "" && items[(indiceExcel * 3)+2] == "")
        indiceExcel++;
    SetResultado (indiceHTML, "Procesando...")
    ReporteBatchAjax.ProcessItem(indiceExcel, items[indiceExcel], ProcessItemCallBack);
}

function SetResultado (indiceHTML, valor){
    var tableState = document.getElementById("state");
    tableState.rows[indiceHTML].childNodes[3].innerHTML = valor;
}

function InsertarResultado (localResult, contadorAlternado){
    var table = document.getElementById("table1");
    var row = table.insertRow(-1);
    if(contadorAlternado % 2)
        row.className = "GridRow";
    else
        row.className = "GridAltRow";
    var cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(localResult[1]));
    cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(localResult[2]));
    cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(localResult[3]));
    cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(localResult[4]));
    cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(localResult[5]));
    cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(localResult[6]));
    cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(localResult[7]));
    cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(localResult[8]));
    cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(localResult[9]));
    cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(localResult[10]));
}

function CargarDatosExcel (items){
    var tableState = document.getElementById("state");
    var contadorRows = 0;
    for (var i = 0; i < items.length; i++){
        if (items[i] != "" || items[i+1] != "" || items[i+2] != ""){
            var rowState = tableState.insertRow(-1);
            var cellState = rowState.insertCell(-1);
            if(contadorRows % 2)
                rowState.className = "GridRow";
            else
                rowState.className = "GridAltRow";

            cellState.appendChild(document.createTextNode(items[i]));
            cellState = rowState.insertCell(-1);
            cellState.appendChild(document.createTextNode(items[i+1]));
            cellState = rowState.insertCell(-1);
            cellState.appendChild(document.createTextNode(items[i+2]));
            rowState.insertCell(-1);
            
            contadorRows++;  
        }
        i += 2;  
    }
    
    return contadorRows;
}

function AgregarHeadersResultados (){
	var table = document.getElementById("table1");
	var row = table.insertRow(-1);
    row.className = "TableFixedHeader2";
	cell = row.insertCell(-1);
	cell.appendChild(document.createTextNode("IP"));
	cell = row.insertCell(-1);
	cell.appendChild(document.createTextNode("Inicio Sesion/Fecha Alta"));
	cell = row.insertCell(-1);
	cell.appendChild(document.createTextNode("Fin Sesion/Fecha Baja"));
	cell = row.insertCell(-1);
	cell.appendChild(document.createTextNode("Linea/Referencia"));
	cell = row.insertCell(-1);
	cell.appendChild(document.createTextNode("Sesion/Sistema"));
	cell = row.insertCell(-1);
	cell.appendChild(document.createTextNode("Usuario/Razon Social"));
	cell = row.insertCell(-1);
	cell.appendChild(document.createTextNode("Dominio/Tipo de Uso"));
	cell = row.insertCell(-1);
	cell.appendChild(document.createTextNode("NAS"));
	cell = row.insertCell(-1);
	cell.appendChild(document.createTextNode("Reg.Temis"));
	cell = row.insertCell(-1);
	cell.appendChild(document.createTextNode("Servicio"));
}

function AgregarHeadersExcel(){
    var tableState = document.getElementById("state");
    var rowState = tableState.insertRow(-1);
    rowState.className = "TableFixedHeader2";
    var cellState = rowState.insertCell(-1);
    cellState.appendChild(document.createTextNode("IP"));
    cellState = rowState.insertCell(-1);
    cellState.appendChild(document.createTextNode("Fecha Incidente"));
    cellState = rowState.insertCell(-1);
    cellState.appendChild(document.createTextNode("Reg.Temis"));
    cellState = rowState.insertCell(-1);
    cellState.appendChild(document.createTextNode("Resultado"));
}

function CursorWait ()     {
	var body = document.getElementById("body");
	var table = document.getElementById("table1");
	var tableState = document.getElementById("state");
//	table.style.cursor = "";
//	tableState.style.cursor = "";
//	body.style.cursor = "";
	table.className = "cursorwait";
	tableState.className = "cursorwait";
	body.className = "cursorwait";
}
function CursorNormal ()   {
	var body = document.getElementById("body");
	var table = document.getElementById("table1");
	var tableState = document.getElementById("state");
	table.style.cursor = "default";
	tableState.style.cursor = "default";
	body.style.cursor = "default";
}
function cambiarEstado(var1, var2)   {
	var imp = document.getElementById("divImp");
	imp.style.display = var1; 
	var	recon = document.getElementById("divRecon");
	recon.style.display = var2;
	var	state = document.getElementById("divState");
	state.style.display = var2;
	var	labels = document.getElementById("divLabels");
	labels.style.display = var2;
	var	reporte = document.getElementById("divReporte");
	reporte.style.display = var2;
	
}