using BLL;
using DAL;
using DTO;
using Newtonsoft.Json.Linq;
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
          
            var p = DriveBLL.GetAllDrives();
            if (p == null)
                return NotFound();
            return Ok(p);
        }

        [HttpGet]
        [Route("GetDrivesByUserId/{id}")]
        public IHttpActionResult GetDrivesByUserId(string id)
        {
            var p = BLL.DriveBLL.GetDrivesByUserId(id);
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

        [HttpGet]
        [Route("ChangeStatusToClose/{id}")]
        public IHttpActionResult ChangeStatusToClose(int id)
        {
            var p = DriveBLL.ChangeStatus(id,false);
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
        [HttpPost]
        [Route("UpdateDrive")]
        public IHttpActionResult UpdateDrive([FromBody] JObject data)
        {

            DriveDTO drive = data["updateDrive"].ToObject<DriveDTO>();
            List<PackageDTO> listWaiting = data["listWaiting"].ToObject<List<PackageDTO>>();
            var u = BLL.DriveBLL.UpdateDrive(drive,listWaiting);
            if (u == null)
                return NotFound();
            return Ok(u);
        }

        [HttpPost]
        [Route("ConfirmDrive")]
        public IHttpActionResult ConfirmDrive([FromBody]JObject data)
        {
            PackageDTO package = data["package"].ToObject<PackageDTO>();
            DriveDTO confirmDrive = data["confirmDrive"].ToObject<DriveDTO>();
            List<DriveDTO> listToDelete = data["listToDelete"].ToObject<List<DriveDTO>>();
            string w = null;
            if (EmailManagementBLL.SendEmailAboutConfirmDrive(UserBLL.GetUserById(confirmDrive.driverCode).userMail, package.customerName + " " + "אישר/ה נסיעה שלך", package, confirmDrive)!=null)
             w= WaitingMessageBLL.deleteAllWaitingMessage(package, confirmDrive, listToDelete);
            if (w == null)
                return NotFound();
            return Ok(w);
        }
        [HttpPost]
        [Route("DeleteDrive")]
        public IHttpActionResult DeleteDrive([FromBody]JObject data)
        {
            DriveDTO drive = data["drive"].ToObject<DriveDTO>();
            string url = data["url"].ToString();
            List<PackageDTO> listWaiting = data["listWaiting"].ToObject<List<PackageDTO>>();
            var d = DriveBLL.DeleteDrive(drive, listWaiting,url);
            if (d == null)
                return NotFound();
            return Ok(d);
        }

    }

}
