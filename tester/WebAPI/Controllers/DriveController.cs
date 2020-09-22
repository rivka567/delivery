using BLL;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPI.Controllers
{
    public class DriveController : ApiController
    {
        [HttpGet]
        [Route("GetDriveById/{id}")]
        public IHttpActionResult GetDriveById(string id)
        {
            var p = DriveBLL.GetDriveById(id);
            if (p == null)
                return NotFound();
            return Ok(p);
        }

        [HttpPost]
        [Route("AddDrive")]
        public IHttpActionResult AddDrive(Drive drive)
        {
            var p = BLL.DriveBLL.AddDrive(drive);
            if (p == null)
                return NotFound();
            return Ok(p);
        }

        // POST: api/Drive
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Drive/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Drive/5
        public void Delete(int id)
        {
        }
    }
}
