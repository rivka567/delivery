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
            var d = DAL.PackageDAL.GetPackageById(id);
            return PackageConverter.convertToPackageDTO(d);

        }

        public static List<DTO.PackageDTO> GetAllPackages()
        {
            var d = DAL.PackageDAL.GetAllPackages();
            return PackageConverter.convertToPackageDTOList(d);

        }

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

        }

    }
}
