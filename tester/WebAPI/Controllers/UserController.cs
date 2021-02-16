using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;
using DAL;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        [HttpGet]
        [Route("GetAllUsers")]
        public IHttpActionResult GetAllUsers()
        {
            var u = BLL.UserBLL.GetAllUsers();
            if (u == null)
                return NotFound();
            return Ok(u);
        }

        [HttpGet]
        [Route("GetUserById/{id}")]
        public IHttpActionResult GetUserById(string id)
        {
            var u = BLL.UserBLL.GetUserById(id);
            if (u == null)
                return NotFound();
            return Ok(u);
        }

        [HttpPost]
        [Route("AddUser")]
        public IHttpActionResult AddUser(User user)
        {
            var u = BLL.UserBLL.AddUser(user);
            if (u == null)
                return NotFound();
            return Ok(u);
        }

<<<<<<< HEAD
       
=======
       [HttpGet]
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01
        [Route("SendEmail")]
        public IHttpActionResult SendEmail(string sender, string contactAddress, string subject, string body)
        {
          var u= UserBLL.SendEmail(sender, contactAddress, subject, body);
            if (u == null)
                return NotFound();
            return Ok(u);
        }

        // PUT: api/User/5
        [HttpPut]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/User/5
        [HttpDelete]
        public void Delete(int id)
        {
        }
    }
}
