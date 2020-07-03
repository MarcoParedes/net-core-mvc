var smc={};smc.ValidTabNames=["subscriber","diagnostics","endpoints","accountActivity","tools","networkMap"];smc.Logger=function(){var logLevel=0;var _log=function(level,msg){try{if(smc.Logger.getLogLevel()>=level[0]){var d=new Date();var ds=(d.getMonth()+1)+"/"+(d.getDate())+"/"+d.getFullYear()+" "+d.toLocaleTimeString();var logMessage=level[1]+": "+ds+" - "+msg;if(navigator.appName.indexOf("Internet Explorer")>0&&navigator.appVersion.indexOf("MSIE 8.")>0){if(level[1]==="INFO"){console.info(logMessage);}else if(level[1]==="ERROR"||level[1]==="FATAL"){console.error(logMessage);}else if(level[1]==="WARN"){console.warn(logMessage);}else{console.log(logMessage);}}else{console.log(logMessage);}}}catch(e){}};return{LOG_LEVEL_NONE:[0,"NONE"],LOG_LEVEL_FATAL:[2,"FATAL"],LOG_LEVEL_ERROR:[4,"ERROR"],LOG_LEVEL_WARN:[6,"WARN"],LOG_LEVEL_INFO:[8,"INFO"],LOG_LEVEL_DEBUG:[10,"DEBUG"],LOG_LEVEL_TRACE:[12,"TRACE"],setLogLevel:function(level){logLevel=level;},getLogLevel:function(){return logLevel;},fatal:function(msg){_log(smc.Logger.LOG_LEVEL_FATAL,msg);},error:function(msg){_log(smc.Logger.LOG_LEVEL_ERROR,msg);},warn:function(msg){_log(smc.Logger.LOG_LEVEL_WARN,msg);},info:function(msg){_log(smc.Logger.LOG_LEVEL_INFO,msg);},debug:function(msg){_log(smc.Logger.LOG_LEVEL_DEBUG,msg);},trace:function(msg){_log(smc.Logger.LOG_LEVEL_TRACE,msg);}};}();smc.Resources=function(){var format=function(format,args){return format.replace(/\{(\d+)\}/g,function(m,i){return args[i];});};return{contextPath:null,messages:[],statusImages:{NONE:'',IN_PROGRESS:'',SUCCESS:'',FAILURE:'',LOADING:''},initialize:function(config){if(config.contextPath){this.contextPath=config.contextPath;this.statusImages.NONE=this.getImage('icon.question');this.statusImages.IN_PROGRESS=this.getImage('icon.running');this.statusImages.SUCCESS=this.getImage('icon.success');this.statusImages.FAILURE=this.getImage('icon.failure');this.statusImages.LOADING=this.getImage('icon.running');}},get:function(key,msg){var keyWithUnderscore=replaceSpacesWithUnderscore(key);var m=this.messages[keyWithUnderscore];if(!m){if(msg)return msg;else return key;}
var args=Array.prototype.slice.call(arguments,1);return format(m,args);},getHelpLink:function(key){var helpPath=this.contextPath+'/'+this.get('helpPath');var link=this.get(key);return helpPath+link;},getImage:function(key){var imageBasePath=this.get(key);return this.contextPath+imageBasePath;}};}();smc.Utilities=function(){return{argsToArray:function(args){var a=[];for(var i=0;i<args.length;i++){a.push(args[i]);}
return a;},configureMainTabDivs:function(tabData){var hasDiagnosticsLicense=tabData.hasDiagnosticsLicense;var hasEndpointsLicense=tabData.hasEndpointsLicense;var hasNetworkMapLicense=tabData.hasNetworkMapLicense;var isNetworkMapInTab=(tabData.isNetworkMapInTab==="TRUE");var cscTabs=tabData.cscTabs.split(",");for(var lcv=0;lcv<cscTabs.length;lcv++){var tabName=cscTabs[lcv].fullTrim();cscTabs[lcv]=tabName;}
for(var x=0;x<smc.ValidTabNames.length;x++){var cscTabName=smc.ValidTabNames[x].fullTrim();if($.inArray(cscTabName,cscTabs)>-1){if(cscTabName==="diagnostics"&&hasDiagnosticsLicense!=="true"){$('#tabs-'+cscTabName).remove();}
if(cscTabName==="endpoints"&&hasEndpointsLicense!=="true"){$('#tabs-'+cscTabName).remove();}
if(cscTabName==="networkMap"){if(hasNetworkMapLicense!=="true"){$('#tabs-'+cscTabName).remove();$('#northPane-'+cscTabName).remove();}
else{if(isNetworkMapInTab){$('#northPane-'+cscTabName).remove();}
else{$('#tabs-'+cscTabName).remove();}}}}
else{$('#tabs-'+cscTabName).remove();if(cscTabName==="networkMap"){$('#northPane-'+cscTabName).remove();}}}},isExecutionResultSuccess:function(resultXMLString){if(resultXMLString!=null){var resultXMLObject=getDomAdapter().parseXml(resultXMLString);if(getDomAdapter().hasParseError(resultXMLObject)){subscriberTabLogger.error("An error occurred parsing the resultXMLObject.");subscriberTabLogger.error("XML is ' "+resultXMLString+" '");return;}
var executionResultValueXML=resultXMLObject.documentElement.selectSingleNode("OverlayResults/Result[@name='ExecutionResult']/ResultValue/value");var executionResultValue=executionResultValueXML.childNodes[0].nodeValue;if(executionResultValue.toUpperCase()=='FAILURE'){return false;}
else if(executionResultValue.toUpperCase()=='99999'){return false;}
else{return true;}}
else{return false;}},makeAccordion:function(obj){obj.addClass("ui-accordion");accordionHeaders=$('p.accordion_head',obj).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){$(this).addClass('ui-state-hover');}).bind("mouseleave.accordion",function(){$(this).removeClass('ui-state-hover');}).click(function(){$(this).next("div.accordion_body").slideToggle(200);$(this).children("span.accordion_icon").toggleClass('ui-icon-triangle-1-e');$(this).children("span.accordion_icon").toggleClass('ui-icon-triangle-1-s');innerLayout.resizeAll();});$('p.accordion_head span',obj).addClass('ui-icon ui-icon-triangle-1-e');$('div.accordion_body',obj).addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");}};}();function trimFieldValue(theInputField){tempString=theInputField.value;tempString=strtrim(tempString);theInputField.value=tempString;}
function strtrim(theString){return theString.replace(/^\s+/,'').replace(/\s+$/,'');}
function replaceSpacesWithUnderscore(theString){return theString.replace(/\s+/g,'_');}
String.prototype.fullTrim=function(){return this.replace(/\s+/g,'');};function isArray(obj){if(obj.constructor.toString().indexOf("Array")==-1)
return false;else
return true;}
function HTMLEncode(t){return t.toString().replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;");}
function HTMLEncodeString(s){return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function rgb2hex(rgb){function hex(x){hexDigits=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];return isNaN(x)?"00":hexDigits[(x-x%16)/16]+hexDigits[x%16];}
return"#"+hex(rgb[0])+hex(rgb[1])+hex(rgb[2]);}