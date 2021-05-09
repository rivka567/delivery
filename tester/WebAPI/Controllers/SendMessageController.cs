using DTO;
using BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/SendMessage")]
    public class SendMessageController : ApiController
    {
    [HttpPost]
    [Route("SendMessageFromCustomerToDelivery")]
        public IHttpActionResult SendMessageFromCustomerToDelivery([FromBody]JObject data)
        {
            string body;
            PackageDTO package;
            DriveDTO waitingD;
            package = data["package"].ToObject<PackageDTO>();
            waitingD = data["drive"].ToObject<DriveDTO>();
            body = data["body"].ToString();
            var m = SendMessageBLL.SendMessageFromCustomerToDelivery(package, waitingD, body);
            if (m == null)
                return NotFound();
            return Ok(m);
                
        }
  

    [HttpPost]
    [Route("SendMessageFromDeliveryToCustomer")]
    public IHttpActionResult SendMessageFromDeliveryToCustomer([FromBody]JObject data)
    {
        string body;
        PackageDTO waitingP;
        DriveDTO drive;
        waitingP = data["package"].ToObject<PackageDTO>();
        drive = data["drive"].ToObject<DriveDTO>();
        body = data["body"].ToString();
        var m = SendMessageBLL.SendMessageFromDeliveryToCustomer(waitingP, drive, body);
        if (m == null)
            return NotFound();
        return Ok(m);

    }
    }
}
