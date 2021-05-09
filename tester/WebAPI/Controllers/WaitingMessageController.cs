using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;
using DTO;
using Newtonsoft.Json.Linq;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/WaitingMessage")]

    public class WaitingMessageController : ApiController
    {
        [HttpPost]
        [Route("DeleteWaitingMessageFromCustomer")]
        public IHttpActionResult DeleteWaitingMessageFromCustomer([FromBody]JObject data)
        {
            PackageDTO package=data["package"].ToObject<PackageDTO>();
            DriveDTO drive= data["drive"].ToObject<DriveDTO>();
           var w= WaitingMessageBLL.DeleteWaitingMessageFromCustomer(package,drive);
            if (w == null)
                return NotFound();
            return Ok(w);
        }

        [HttpPost]
        [Route("DeleteWaitingMessageFromDelivery")]
        public IHttpActionResult DeleteWaitingMessageFromDelivery([FromBody]JObject data)
        {
            PackageDTO package = data["package"].ToObject<PackageDTO>();
            DriveDTO drive = data["drive"].ToObject<DriveDTO>();
            var w = WaitingMessageBLL.DeleteWaitingMessageFromDelivery(package, drive);
            if (w == null)
                return NotFound();
            return Ok(w);
        }

        //[HttpPost]
        //[Route("deleteAllWaitingMessage")]
        //public IHttpActionResult deleteAllWaitingMessage([FromBody]JObject data)
        //{
        //    PackageDTO package = data["package"].ToObject<PackageDTO>();
        //    DriveDTO confirmDrive = data["confirmDrive"].ToObject<DriveDTO>();
        //  //  List<DriveDTO> listToDelete = data["listToDelete"].ToList<DriveDTO[]>();
        //    // var w = WaitingMessageBLL.deleteAllWaitingMessage(package, confirmDrive, listToDelete);
        //    string w = null;
        //    if (w == null)
        //        return NotFound();
        //    return Ok(w);
        //}

    }
}
