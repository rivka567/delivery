using BLL.converters;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
   public class PackageBLL
    {
        public static DTO.PackageDTO GetPackageById(int id)
        {
            var d = DAL.PackageDal.GetPackageById(id);
            return PackageConverter.convertToPackageDTO(d);

        }

        public static List<DTO.PackageDTO> GetAllPackages()
        {
            var d = DAL.PackageDal.GetAllPackages();
            return PackageConverter.convertToPackageDTOList(d);

        }

        public static string AddPackage(Package package)
        {
            return DAL.PackageDal.AddPackage(package); ;

        }

    }
}
