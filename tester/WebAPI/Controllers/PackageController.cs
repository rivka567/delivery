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
        [Route("GetPackagesByUserId/{id}")]
        public IHttpActionResult GetPackagesByUserId(string id)
        {
            var p = BLL.PackageBLL.GetPackagesByUserId(id);
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
        public IHttpActionResult AddPackage(PackageDTO package)
        {
            var p = BLL.PackageBLL.AddPackage(package);

            if (p == null)
                return NotFound();
            return Ok(p);
        }

        [HttpPost]
        [Route("UpdatePackage")]
        public IHttpActionResult UpdatePackage([FromBody]JObject data)
        {
            PackageDTO updatePackage = data["updatePackage"].ToObject<PackageDTO>();
            List<DriveDTO> listWaiting = data["listWaiting"].ToObject < List<DriveDTO>>();
            var u = BLL.PackageBLL.UpdatePackage(updatePackage,listWaiting);
            if (u == null)
                return NotFound();
            return Ok(u);
        }
        // PUT: api/Package/5
        [HttpPut]
        public void Put(int id, [FromBody]string value)
        {
        }

        [HttpPost]
        [Route("DeletePackage/{id}")]
        public IHttpActionResult DeletePackage(int id,List<DriveDTO> listWaiting)
        {
            var u = BLL.PackageBLL.DeletePackage(id,listWaiting);
            if (u == null)
                return NotFound();
            return Ok(u);
        }
    }
}

