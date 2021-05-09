using BLL;
using DAL;
using DTO;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/EmailManagement")]

    public class EmailManagementController : ApiController
    {
        // שולח את פרטי החבילה לכל אלו שנרשמו להתראות וחבילה זו מתאימה לפרטי הנסיעה שלהם
        [HttpPost]
        [Route("SendEmailToMatchDrivers")]
        public IHttpActionResult SendEmailToMatchDrivers([FromBody]JObject data)
        {
            PackageDTO package=data["package"].ToObject<PackageDTO>();
            List<DriveDTO> matchDrives = data["matchDrives"].ToObject<List<DriveDTO>>();

            var d = EmailManagementBLL.SendEmailToMatchDrivers(matchDrives,package);
            if (d == null)
                return NotFound();
            return Ok(d);
        }

        [HttpPost]
        [Route("SendEmailToMatchPackages")]
        public IHttpActionResult SendEmailToMatchPackages([FromBody]JObject data)
        {
            DriveDTO drive = data["drive"].ToObject<DriveDTO>();
            List<PackageDTO> matchPackages = data["matchPackages"].ToObject<List<PackageDTO>>();

            var d = EmailManagementBLL.SendEmailToMatchPackages(matchPackages, drive);
            if (d == null)
                return NotFound();
            return Ok(d);
        }

        [HttpGet]
        [Route("SendCodeByEmail")]
        public IHttpActionResult SendCodeByEmail(string mail)
        {
            var u = EmailManagementBLL.SendCodeByEmail(mail);

            if (u == null)
                return NotFound();
            return Ok(u);
        }
        [HttpPost]
        [Route("SendPackageByEmail")]
        public IHttpActionResult SendPackageByEmail([FromBody]JObject data)


        {

            string contactAddress, subject;
            PackageDTO body;
            DriveDTO drive;
            drive = data["drive"].ToObject<DriveDTO>();
            contactAddress = data["contactAddress"].ToString();
            subject = data["subject"].ToString();
            body = data["body"].ToObject<PackageDTO>();
            int totalPrice = Convert.ToInt32(data["totalPrice"]);
            string u = null;

            if (BLL.WaitingMessageBLL.AddWaitingMessage(body.packageCode, drive.driveCode,totalPrice))
           {
              u= EmailManagementBLL.SendPackageByEmail(contactAddress, subject, body, drive);

            }
            if (u == null)
                return BadRequest("erorrrrr");
            return Ok(u);

        }
        [HttpPost]
        [Route("SendDriveByEmail")]
        public IHttpActionResult SendDriveByEmail([FromBody]JObject data)
        {

            string contactAddress, subject;
            DriveDTO body;
            PackageDTO package;
            package = data["package"].ToObject<PackageDTO>();
            contactAddress = data["contactAddress"].ToString();
            subject = data["subject"].ToString();
            body = data["body"].ToObject<DriveDTO>();
            int totalPrice = Convert.ToInt32(data["totalPrice"]);
            string u = null;
            if (BLL.WaitingMessageBLL.AddWaitingMessage(package.packageCode, body.driveCode,totalPrice))
            {
               u= EmailManagementBLL.SendDriveByEmail(contactAddress, subject, package, body);
                //string mailBody = File.ReadAllText("C: \\Users\\dvora bloch\\Desktop\\new tester\\tester\\WebAPI\\MyDrive.html");
                //string str = mailBody;

                //str = str.Replace("$customerName", package.customerName);
                //str = str.Replace("$deliveryName", body.driverName);
                //str = str.Replace("$packageId", package.packageCode.ToString());
                //str = str.Replace("$driveId", body.driveCode.ToString());
                //str = str.Replace("$fromlocation", body.fromLocationFormat);
                //str = str.Replace("$tolocation", body.toLocationFormat);
                //str = str.Replace("$date", body.travelDate.ToString());
                //str = str.Replace("$time", body.drivingTime.ToString());
                //str = str.Replace("$trans", body.transportation.ToString());
                //str = str.Replace("$price", body.price.ToString());
                //str = str.Replace("$describe", body.describeDrive);
                //u = EmailManagementBLL.SendEmail(contactAddress, subject, str);
            }
            if (u == null)
                return NotFound();
            return Ok(u);
        }

    }
}
