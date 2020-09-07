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
        //[HttpGet]
        //[Route("GetAllDeliveries")]
        //public IHttpActionResult GetAllDeliveries()
        //{
        //    var p = BLL.UserBLL.GetAllDeliveries();
        //    if (p == null)
        //        return NotFound();
        //    return Ok(p);
        //}

        [HttpGet]
        [Route("GetUserById/{id}")]
        public IHttpActionResult GetUserById(string id)
        {
            var p = BLL.UserBLL.GetUserById(id);
            if (p == null)
                return NotFound();
            return Ok(p);
        }

        [HttpPost]
        [Route("AddUser")]
        public IHttpActionResult AddUser( User user)
        {
            var p = BLL.UserBLL.AddUser(user);
            if (p == null)
                return NotFound();
            return Ok(p);
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
