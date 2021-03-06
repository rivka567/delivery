﻿using DAL;
<<<<<<< HEAD
=======
using DTO;
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/Package")]
    public class PackageController : ApiController
    {
        [HttpGet]
        [Route("GetAllPackages")]
        public IHttpActionResult GetAllPackages()
        {
            var p = BLL.PackageBLL.GetAllPackages();
            if (p == null)
                return NotFound();
            return Ok(p);
        }

        [HttpGet]
        [Route("GetPackageById/{id}")]
        public IHttpActionResult GetPackageById(int id)
        {
            var p = BLL.PackageBLL.GetPackageById(id);
            if (p == null)
                return NotFound();
            return Ok(p);
        }

        [HttpPost]
        [Route("AddPackage")]
<<<<<<< HEAD
        public IHttpActionResult AddPackage(Package package)
=======
        public IHttpActionResult AddPackage(PackageDTO package)
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01
        {
            var p = BLL.PackageBLL.AddPackage(package);

            if (p == null)
                return NotFound();
            return Ok(p);
        }

        // PUT: api/Package/5
        [HttpPut]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Package/5
        [HttpDelete]
        public void Delete(int id)
        {
        }
    }
}

