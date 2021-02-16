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
<<<<<<< HEAD
            var d = DAL.PackageDal.GetPackageById(id);
=======
            var d = DAL.PackageDAL.GetPackageById(id);
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01
            return PackageConverter.convertToPackageDTO(d);

        }

        public static List<DTO.PackageDTO> GetAllPackages()
        {
<<<<<<< HEAD
            var d = DAL.PackageDal.GetAllPackages();
=======
            var d = DAL.PackageDAL.GetAllPackages();
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01
            return PackageConverter.convertToPackageDTOList(d);

        }

<<<<<<< HEAD
        public static string AddPackage(Package package)
        {
            return DAL.PackageDal.AddPackage(package); ;
=======
        public static string AddPackage(DTO.PackageDTO package)
        {
            Loction fromL = new Loction()
            {
                locationFormat = package.fromLocatioFormat,
                locationLat = package.fromLocatioLat,
                locationLng = package.fromLocatioLng
            };
            Loction FrLo = LocationDAL.AddLocation(fromL);
            Loction toL = new Loction()
            {
                locationFormat = package.toLocatioFormat,
                locationLat = package.toLocatioLat,
                locationLng = package.toLocationLng
            };
            Loction ToLo = LocationDAL.AddLocation(toL);

            Package p = PackageConverter.convertDtoToDALPackage(package);
            p.fromLocation = FrLo.locationId;
            p.toLocation = ToLo.locationId;

            return DAL.PackageDAL.AddPackage(p);
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01

        }

    }
}
