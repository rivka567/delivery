using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using BLL;
using DAL;
using DTO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
            if (u != null)
                return Ok(u);
            return NotFound();

        }

        [HttpPost]
        [Route("UpdateUser")]
        public IHttpActionResult UpdateUser([FromBody]User user)
        {
            var u = BLL.UserBLL.UpdateUser(user);
            if (u == null)
                return NotFound();
            return Ok(u);
        }
        [HttpGet]
      
      

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
