using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/Happiness")]
    public class HappinessController : ApiController
    {
        [HttpGet]
        [Route("GetAllHappiness")]
        public IHttpActionResult GetAllHappiness()
        {
            var h = HappinessBLL.GetAllHappiness();
            if (h == null)
                return NotFound();
            return Ok(h);
        }

        [HttpGet]
        [Route("GetHappinessByDeliveryId/{id}")]
        public IHttpActionResult GetHappinessByDeliveryId(string id)
        {
            var h = HappinessBLL.GetHappinessByDeliveryId(id);
            if (h == null)
                return NotFound();
            return Ok(h);
        }

        [HttpPost]
        [Route("AddHappiness")]
        public IHttpActionResult AddHappiness(DAL.Happiness happiness)
        {
            var h = HappinessBLL.AddHappiness(happiness);
            if (h == true)
                return Ok();
            return NotFound();
        }

    }
}
