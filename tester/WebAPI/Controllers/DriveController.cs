using BLL;
using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/Drive")]
    public class DriveController : ApiController
    {
        // GET: api/Drive
        [HttpGet]
        [Route("GetAllDrives")]
        public IHttpActionResult GetAllDrives()
        {
            var p = BLL.DriveBLL.GetAllDrives();
            if (p == null)
                return NotFound();
            return Ok(p);
        }
        [HttpGet]
        [Route("GetSpesificDrives")]
        public IHttpActionResult GetSpesificDrives(DateTime date,TimeSpan time)
        {
            var p = BLL.DriveBLL.GetSpesificDrives();
            if (p == null)
                return NotFound();
            return Ok(p);
        }
        [HttpGet]
        [Route("GetDriveById/{id}")]
        public IHttpActionResult GetDriveById(int id)
        {
            var p = DriveBLL.GetDriveById(id);
            if (p == null)
                return NotFound();
            return Ok(p);
        }

        [HttpPost]
        [Route("AddDrive")]
        public IHttpActionResult AddDrive(DriveDTO drive)
        {
            var p = DriveBLL.AddDrive(drive);
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
