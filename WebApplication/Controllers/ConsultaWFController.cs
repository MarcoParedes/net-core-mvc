using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace WebApplication.Controllers
{
    public class ConsultaWFController : Controller
    {
        private HttpClient httpClient;

        public ConsultaWFController()
        {
            httpClient = new HttpClient();
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult LeerProxy(string accion, string nombre, string legajo)
        {

            return Json(new { });
        }

        [HttpGet]
        public JsonResult InicioWorkflow()
        {

            return Json(new { });
        }

        [HttpGet]
        public JsonResult ProximoPaso()
        {

            return Json(new { } );
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            string result = string.Empty;
            //httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "sdsffdf");
            var res = await httpClient.GetAsync($"https://jsonplaceholder.typicode.com/todos");
            if (res.IsSuccessStatusCode) 
                result = res.Content.ReadAsStringAsync().Result;

            return Json(result);
        }


        //public string GetInstancia(string WorkflowName, string ip_usuario, string legajo)
        //{
        //    try
        //    {
        //        //string pedido = RecuperadorDeDatos.GetValueConfig("URL_SMP");
        //        string pedido = "https://xcvnsmp.xdev.motive.com/wfe/rest";

        //        System.Net.ServicePointManager.ServerCertificateValidationCallback += (se, cert, chain, sslerror) =>
        //        {
        //            return true;
        //        };

        //        string data = "{\"workflowName\":  \"" + WorkflowName + "\"}";
        //        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(pedido + "/5.2/instances");
        //        request.Method = "PUT";
        //        request.Timeout = 60000;

        //        string host = HttpContext.Current.Request.Url.Host.ToLower();
        //        if (host == "localhost")
        //        {
        //            request.Proxy = HttpWebRequest.DefaultWebProxy;
        //            request.Credentials = System.Net.CredentialCache.DefaultCredentials;
        //            request.Proxy.Credentials = System.Net.CredentialCache.DefaultCredentials;
        //        }
        //        else
        //        {
        //            string IP_proxy = RecuperadorDeDatos.GetValueConfig("IP_proxyApp");
        //            int PuertoDelProxy = int.Parse(RecuperadorDeDatos.GetValueConfig("Port_proxyApp"));
        //            System.Net.WebProxy ProxyApp = new System.Net.WebProxy(IP_proxy, PuertoDelProxy);
        //            request.Proxy = ProxyApp;
        //            request.Credentials = System.Net.CredentialCache.DefaultCredentials;
        //            request.Proxy.Credentials = System.Net.CredentialCache.DefaultCredentials;
        //        }
        //        //Add a header to the request that contains our credentials
        //        string svcCredentials = GetCredencial();
        //        request.Headers.Add("Authorization", "Basic " + svcCredentials);
        //        Encoding encoding = Encoding.UTF8;
        //        request.ContentType = "application/json; charset=utf-8";
        //        byte[] buffer = encoding.GetBytes(data);
        //        Stream dataStream = request.GetRequestStream();
        //        dataStream.Write(buffer, 0, buffer.Length);
        //        dataStream.Close();
        //        HttpWebResponse response = (HttpWebResponse)request.GetResponse();

        //        string result = "";
        //        using (StreamReader reader = new StreamReader(response.GetResponseStream(), System.Text.Encoding.Default))
        //        {
        //            result = reader.ReadToEnd();
        //        }

        //        // debe llamar al paso 2
        //        var serializer = new JavaScriptSerializer();
        //        serializer.RegisterConverters(new[] { new DynamicJsonConverter() });
        //        dynamic resultado = serializer.Deserialize(result, typeof(object));

        //        string id = resultado.id.ToString();
        //        if (id == null)
        //        {
        //            EnviarMailError(request.Address.AbsoluteUri, result, legajo, "GetInstancia");
        //        }
        //        return StartInstancia(WorkflowName, "", "", id, ip_usuario, legajo);
        //    }
        //    catch (WebException e)
        //    {
        //        if (e.Status == WebExceptionStatus.ProtocolError)
        //        {
        //            string error = new System.IO.StreamReader(e.Response.GetResponseStream()).ReadToEnd();
        //            //Common.Mailer.SendMail(error, "Error en la ejecución SMP");
        //            throw new Exception(error);
        //        }
        //        else
        //        {
        //            //Common.Mailer.SendMail(Common.Excepciones.Format(e), "Error en la ejecución SMP");
        //            throw e;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        //Common.Mailer.SendMail(Common.Excepciones.Format(ex), "Error en la ejecución SMP");
        //        throw ex;
        //    }
        //}

    }
}
