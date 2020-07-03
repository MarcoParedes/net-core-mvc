var myHeight = 0;
var myWidth = 0;
var veces = 0;

function setSize() {
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myHeight = window.innerHeight;
    myWidth = window.innerWidth;
  } else if( document.documentElement &&
      ( document.documentElement.clientHeight || document.documentElement.clientWidth ) ) {
    //IE 6+ in 'standards compliant mode'
    myHeight = document.documentElement.clientHeight;
    myWidth = document.documentElement.clientWidth;
  } else if( document.body && ( document.body.clientHeight || document.body.clientWidth ) ) {
    //IE 4 compatible
    myHeight = document.body.clientHeight;
    myWidth = document.body.clientWidth;
  }
}

function setSizeDiv(divReporte){
	setSize();
	//width = (myWidth - (myWidth*15/100)) - 40;
	width = myWidth - 40;
	//height = myHeight - 260;
	height = myHeight - 90;
	divReporte.style.height = height;
	divReporte.style.width = width;
}


function setSizeDiv2(divReporte)
{
	setSize();
	//width = (myWidth - (myWidth*15/100)) - 40;
	width = myWidth - 40;
	height = myHeight - 170;
	//height = myHeight - 90;
	divReporte.style.height = height;
	divReporte.style.width = width;
}

function setSizeGrid(divDataGrid)
{
	setSize();
	//width = (myWidth - (myWidth*15/100)) - 40;
	width = myWidth - 40;
	//height = myHeight - 210;
	height = myHeight - 40;
	divDataGrid.style.height = height;
/*	divDataGrid.style.width = width;*/
}
function setSizeList(divDataList)
{
	setSize();
	divDataList.style.height = 200;
	divDataList.style.width = 100;
}
function setSizeTexto(divWhite, alto)
{
	setSize();
	//width = (myWidth - (myWidth*15/100)) - 40;
	width = myWidth - 40;
	height = myHeight - alto;
	divWhite.style.height = height;
	divWhite.style.width = width;
	divWhite.style.overflow = "auto";
}
function setSizeArnet(divWhite, alto)
{
	setSize();
	//width = (myWidth - (myWidth*15/100)) - 120;
	width = myWidth - 120;
	height = myHeight - alto;
	divWhite.style.height = height;
	divWhite.style.width = width;
	divWhite.style.overflow = "auto";
}

function showDiv(myDiv, myFrame, myTexto, clase, largo)
{
	setSize();
	var myDiv = document.getElementById(myDiv);
	var myFrame = document.getElementById(myFrame);
	myDiv.style.left = 100;
	myDiv.style.top = 50;
	myFrame.style.left = 100;
	myFrame.style.top = 50;
	if(myWidth - 200 < 560)
	{
		myDiv.style.width = 560;
		myFrame.style.width = 560;
	}
	else
	{
		myDiv.style.width = myWidth - 200;
		myFrame.style.width = myWidth - 200;
	}
	myFrame.style.height = myDiv.style.height;
	if(myTexto != '')
	{
		var textoMail = document.getElementById(myTexto);
		if(myWidth - 220 < 560)
			textoMail.style.width = 540;
		else
			textoMail.style.width = myWidth - 220;
		if(myHeight - largo > 100)
			textoMail.style.height = myHeight - largo;
		else
			textoMail.style.height = 100;
	}
	else // si es el alta de isp (chanchada total)
	{
		myDiv.style.left = 100;
		myDiv.style.top = 50;
		myDiv.style.width = 400;
		myFrame.style.width = 400;
		myFrame.style.left = 100;
		myFrame.style.top = 50;
		myFrame.style.height = myDiv.style.height;
	}
	myFrame.style.filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';
	myFrame.style.display = 'block';
	myDiv.style.display = 'block';
	if(!NiftyCheck() || veces > 0)
		return;
    veces++;
	RoundedTop(clase,"#FFF","#83BFEA");
	RoundedBottom(clase,"#FFF","#d0dfff");
}

function hideDiv(myDiv, myFrame)
{
	var myDiv = document.getElementById(myDiv);
	var myFrame = document.getElementById(myFrame);
	myDiv.style.display = 'none';
	myFrame.style.display = 'none';
}

function showDiv2(myDiv, myTexto, clase, largo)
{
	setSize();
	var myDiv = document.getElementById(myDiv);
	myDiv.style.left = 100;
	myDiv.style.top = 50;

	if(myWidth - 200 < 560)
		myDiv.style.width = 560;
	else
		myDiv.style.width = myWidth - 200;

	if(myTexto != '')
	{
		var textoMail = document.getElementById(myTexto);
		if(myWidth - 220 < 560)
			textoMail.style.width = 540;
		else
			textoMail.style.width = myWidth - 220;
		if(myHeight - largo > 100)
			textoMail.style.height = myHeight - largo;
		else
			textoMail.style.height = 100;
	}
	else // si es el alta de isp (chanchada total)
	{
		myDiv.style.left = 100;
		myDiv.style.top = 50;
		myDiv.style.width = 400;
	}
	myDiv.style.display = 'block';
	if(!NiftyCheck() || veces > 0)
		return;
    veces++;
	RoundedTop(clase,"#FFF","#83BFEA");
	RoundedBottom(clase,"#FFF","#d0dfff");
}

function hideDiv2(myDiv)
{
	var myDiv = document.getElementById(myDiv);
	myDiv.style.display = 'none';
}
function rollover(id, imagen)
{
	try
	{
		var myBoton = document.getElementById(id);
		myBoton.src= 'images/' + imagen;
	}
	catch(e)
	{
		return false;
	}
}

function rolloverGrilla(id, imagen) {
    try {
        var myBoton = document.getElementById(id);
        myBoton.src = '../images/' + imagen;
    }
    catch (e) {
        return false;
    }
}


function getElementsByTagNames(list,obj) {
        if (!obj) var obj = document;
        var tagNames = list.split(',');
        var resultArray = new Array();
        for (var i=0;i<tagNames.length;i++)
        {
                var tags = obj.getElementsByTagName(tagNames[i]);
                for (var j=0;j<tags.length;j++)
                {
                        resultArray.push(tags[j]);
                }
        }
        var testNode = resultArray[0];
        if (testNode.sourceIndex)
        {
                resultArray.sort(function (a,b) {
                                return a.sourceIndex - b.sourceIndex;
                });
        }
        else if (testNode.compareDocumentPosition)
        {
                resultArray.sort(function (a,b) {
                                return 3 - (a.compareDocumentPosition(b) & 6);
                });
        }
        return resultArray;
}

function ShowToolTip(e)
{
	var myToolTip = document.getElementById('tooltip');
	myToolTip.style.display = 'block';
	myToolTip.style.position = 'absolute';
	myToolTip.style.left = event.clientX;
	myToolTip.style.top = event.clientY;
}

function HideToolTip(e)
{
	var myToolTip = document.getElementById('tooltip');
	myToolTip.style.display = 'none';
}


function CursorWait (){
    var body = document.getElementById('body');
	var table = document.getElementById('table1');
//	table.style.cursor = '';
//	body.style.cursor = '';
	table.className = 'cursorwait';
	body.className = 'cursorwait';
}
function CursorNormal (){
	var body = document.getElementById('body');
	var table = document.getElementById('table1');
	table.className = 'default';
	table.className = 'default';
}
function setSizeDivBaseIP(divReporte){
	setSize();
	width = myWidth - 40;
	height = myHeight - 250;
	divReporte.style.height = height;
	divReporte.style.width = width;
}
function setSizeDivBaseIPResProc(divReporte) {
	setSize();
	width = myWidth - 40;
	height = myHeight - 185;
	divReporte.style.height = height;
	divReporte.style.width = width;
}

function setCursor(){
    if (document.getElementById('hcursor').value == '') 
        CursorNormal();
    else
        CursorWait();
}

function setCursorState(){
    if (document.getElementById('ddlFormat') == null)
        document.getElementById('hcursor').value = '1';
    else if (document.getElementById('ddlFormat').value == 'EXCEL')
        document.getElementById('hcursor').value = '';
    else
        document.getElementById('hcursor').value = '1';
}

function forceCursorState(valor){
    document.getElementById('hcursor').value = valor;
}


function ValidarNumericosCampo(campo) {
    var ctrlDown = false;
    var ctrlKey = 17, vKey = 86, cKey = 67, xKey = 88;
    $(document).keydown(function (e) {
        if (e.keyCode == ctrlKey) ctrlDown = true;
    }).keyup(function (e) {
        if (e.keyCode == ctrlKey) ctrlDown = false;
    }).keypress(function (e) {
        if (e.keyCode == ctrlKey) ctrlDown = false
    });
    ;
    $("#" + campo).keydown(function (event) {
        //46 espacio y 8 backspace
        if (event.keyCode == 46 ||
            event.keyCode == 13 ||
            event.keyCode == 8 ||
            event.keyCode == 9 ||
            event.keyCode == 35 ||
            event.keyCode == 36 ||
            event.keyCode == 37 ||
            event.keyCode == 38 ||
            event.keyCode == 39 ||
            event.keyCode == 45 ||
            event.keyCode == 96 ||
            (ctrlDown && event.keyCode == cKey) ||
            (ctrlDown && event.keyCode == vKey) ||
            (ctrlDown && event.keyCode == xKey)) {

        }
        else {
            if (event.keyCode < 95) {
                if (event.keyCode < 48 || event.keyCode > 57) {
                    event.preventDefault();
                }
            }
            else {
                if (event.keyCode < 96 || event.keyCode > 105) {
                    event.preventDefault();
                }
            }
        }
    });
    $("#" + campo).keyup(function (event) {
        //46 espacio y 8 backspace
        if (event.keyCode == 46 ||
            event.keyCode == 13 ||
            event.keyCode == 8 ||
            event.keyCode == 9 ||
            event.keyCode == 35 ||
            event.keyCode == 36 ||
            event.keyCode == 37 ||
            event.keyCode == 38 ||
            event.keyCode == 39 ||
            event.keyCode == 45 ||
            event.keyCode == 96 ||
            (ctrlDown && event.keyCode == cKey) ||
            (ctrlDown && event.keyCode == xKey)) {
        }
        else if (ctrlDown && event.keyCode == vKey) {
            str = $("#" + campo).val();
            long = str.length - 1;
            patron = '[0-9]';
            if (!str.substr(long, 1).match(patron))
                $("#" + campo).val("");
        }

    });
}

function pegar() {
    var elem = clipboardData.getData("Text");
    //alert ("Lo que se va a pegar es: "+elem);

    if (isNaN(parseInt(elem))) {
        //alert ("El numero del acuerdo debe ser numerico");
        clipboardData.clearData();
        event.returnValue = false;
        return false;
    }
    event.returnValue = true;
    return true;
}

