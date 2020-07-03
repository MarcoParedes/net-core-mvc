
$(document).ready(function () {

    $.ajax({
        url: '/ConsultaWF/Get',
        type: 'get',
        dataType: "json",
        encoding: "UTF-8",
        success: function (data) {
            console.log(JSON.parse(data));
        },
        error: function (err) {
            console.log(err);
        }
    });

    $('#btn-confirmacion-yes').click(function () {
        $('#btn-confirmacion-no').click();
        setTimeout(function () {
            leerProxy();
        }, 300);
    });

    $("#button_siguiente").click(function () { nextStep(stepId, id) });
    $("#button_reinicio").click(function () { leerProxy() });

});

var wf = new jQuery.extend(true, new Motive.WorkflowImpl(), new Motive.WorkflowBaseAdapter());
jQuery(document).ready(function () {
    var g_restartParams = {};

    // CSC-1339 Pass keydown event to parent
    $(document).keydown(function (e) {
        e = e || window.event;
        wf.globalEvents.trigger("keypressWFE", e);
    });

    //SMP-13715 Pass mousemove event to parent to refresh session
    $(document).mousemove(function (e) {
        e = e || window.event;
        wf.globalEvents.trigger("mousemoveWFE", e);
    });

    g_restartParams['__runAsRoles'] = "SV_Admin";
    g_restartParams['process'] = "WFTEST-STBIP_SCREEN_PLATE-!!-1572268994575";
    g_restartParams['requestingIP'] = "200.3.94.27";
    g_restartParams['channel'] = "desktop";
    g_restartParams['__runAsRoles_hidden'] = "SV_Admin";
    g_restartParams['subscriberId'] = "55555";
    g_restartParams['selectedDictionaryId'] = "";
    g_restartParams['testlaunch'] = "false";

    wf.init({
        contextPath: "/wf",
        context: "WbZ00c8yhknsjfNqz5U4XCDC.xcvn0_7403_1572269052655",
        restartParams: g_restartParams,
        rootElement: document.body,
        ajaxTimeout: 60000,
        data: {
            feedbackControl: new Motive.FeedbackModule(wf)
        },

        onInit: function () {
            this.initUI({
                maxElementShow: 5,
                useCompression: false
            });
            this.data.feedbackControl.init();
        }
    });

    wf.globalEvents.bind('gridcomplete', function (evt, grid) {
        // this handler may be useful for manipulating the grid
    });

    // Hide breadcrumb full history when click outside of breadcrumbRow.
    jQuery('html').click(function () {
        hideFullHistory();
    });

    jQuery('#breadcrumbRow').click(function (event) {

        event.stopPropagation();
    });

    jQuery(window).bind("load resize", function () {
        var bc = wf.getBreadcrumbControl();
        bc.find("div:first").css("width", "100%");
    });

    var bcControl = jQuery('#breadcrumbRow');
    if (bcControl.is(":visible")) {
        bcControl.hide(10, function () {
            jQuery(this).show();
        });
    }
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function leerProxy() {

    var param = getParameterByName('wf');
    var resultado = param.split(".");
    var datos = { accion: 'inicioWorkflow', nombre: resultado[0], legajo: 'wdi585714' };

    $.ajax({
        type: "GET",
        url: "/ConsultaWF/LeerProxy",
        async: true,
        data: datos,
        dataType: "json",
        encoding: "UTF-8",
        cache: false,
        /***** Estas son las líneas agregadas *****/
        timeout: 120000,
        beforeSend: function (xhr) {
            xhr.readystate = 1;
            showLoading();
        },
        error: function (x, t, m) {
            hideLoading();
            $("#workflow-area").html("Se produjo un error").css({ 'padding-left': '1%', 'padding-top': '2%' });
            $('#button_reinicio').removeClass('d-none');
        },
        //beforeSend: function () {
        //    showLoading();
        //},
        success: function (data) {

            $('#cancel_button').removeClass('d-block').addClass('d-none');
            $('#suspend_button').removeClass('d-none');
            $('#button_siguiente').removeClass('d-none');
            setearId(data.info.stepID, data.exec.id);
            analizarWorkflow(data.exec.name, data.content, data.validSignals, data.templateName);       
        },
    });
}

function setearId(stepID, ID) {
    stepId = stepID;
    id = ID;
}

function analizarWorkflow(workflow, content, validSignals, templateName, stepId, id) {

    switch (templateName) {
        case "question":
            var datos = "";
            var displayName = "<div id=\"container-radio-opcion\">";
            for (var i = 0; i < validSignals.length; i++) {
                displayName += "<label><input class=\"opciones-radio\" type=\"radio\" name=\"displayName\" value=\"" + validSignals[i].name + "\" onclick=\"enabledButton(this)\" />" + "   " + validSignals[i].displayName + "</label><br/>";
            }
            displayName += "</div>";

            var indexTitulo = content.indexOf("<form>");
            if (indexTitulo != -1) {
                datos = content.substring(0, indexTitulo + 6) + displayName + content.substring(indexTitulo + 7);
            }

            var index = datos.indexOf('class="buttons');
            if (index != -1) {
                datos = datos.substring(0, index + 14) + " d-none\"" + datos.substring(index + 15);
            }

            $("#workflow-area").html(datos);
            $('#button_siguiente').prop('disabled', true);
            hideLoading();
            break;

        case "info":
            var index = content.indexOf('class="buttons');
            if (index != -1) {
                content = content.substring(0, index + 14) + " d-none\"" + content.substring(index + 15);
            }

            $("#button_reinicio").addClass('d-none');
            $('#cancel_button').removeClass('d-block').addClass('d-none');
            $('#suspend_button').removeClass('d-none');
            $('#button_siguiente').removeClass('d-none');

            $("#workflow-area").html(content);
            hideLoading();
            break;

        case "modelupdate":
            var index = content.indexOf('class="buttons');
            if (index != -1) {
                content = content.substring(0, index + 14) + " d-none\"" + content.substring(index + 15);
            }

            $("#workflow-area").html(content);
            hideLoading();
            break;

        case "wait":
            var index = content.indexOf('class="buttons');
            if (index != -1) {
                content = content.substring(0, index + 14) + " d-none\"" + content.substring(index + 15);
            }

            $("#workflow-area").html(content);
            hideLoading();
            break;

        case "no_step":
            var index = content.indexOf('class="buttons');
            if (index != -1) {
                content = content.substring(0, index + 14) + " d-none\"" + content.substring(index + 15);
            }

            $("#workflow-area").html(content);
            hideLoading();
            break;

        case "done":
            var datos = "";
            var index = content.indexOf('class="buttons');
            if (index != -1) {
                datos = content.substring(0, index + 14) + " d-none\"" + content.substring(index + 15);
            }

            $("#button_reinicio").removeClass('d-none');
            $("#suspend_button").removeClass('d-block').addClass('d-none');
            $('#button_siguiente').addClass('d-none');

            $("#workflow-area").html(datos);
            hideLoading();
            break;

        default:
            $("#workflow-area").html("Se ha producido un error.");
            $('#cancel_button').removeClass('d-none').addClass('d-block');
            $('#suspend_button').removeClass('d-block').addClass('d-none');
            $('#button_siguiente').removeClass('d-block').addClass('d-none');
            $('#workflow-area').css({ 'left': '1%', 'padding-top': '3%', 'padding-bottom': '2%' });
            hideLoading();
    }
}

function nextStep(proximo, id) {
    $("#contenido").html('');

    var datos = { accion: 'proximoPaso', id: id, step: proximo, legajo: 'wdi585714' };
    $.ajax({
        type: "GET",
        url: "services.aspx",
        async: false,
        data: datos,
        dataType: "json",
        encoding: "UTF-8",
        cache: false,
        /***** Estas son las líneas agregadas *****/
        timeout: 120000,
        beforeSend: function (xhr) {
            xhr.readystate = 1;
            showLoading();
            showLoading()
        },
        error: function (x, t, m) {

        },
        success: function (data) {

            analizarWorkflow(data.exec.name, data.content, data.validSignals, data.templateName);
        }
    });
}

function showLoading() {
    $('#wait-loading').removeClass('d-none').addClass('d-block');
}

function hideLoading() {
    $('#wait-loading').removeClass('d-block').addClass('d-none');
}
