using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.converters
{
    public class PackageConverter
    {
        public static DTO.PackageDTO convertToPackageDTO(DAL.Package package)
        {
            if (package == null)
                return null;
            DTO.PackageDTO newPackage = new DTO.PackageDTO()
            {
                packageCode = package.packageCode,
                userCustomerCode=package.userCustomerCode,
                userDeliveryCode=package.userDeliveryCode,
                fromLocation=package.fromLocation,
                toLocation=package.toLocation,
                travelDate=package.travelDate,
                drivingTime=package.drivingTime,
                packageSize=package.packageSize,
                packageType=package.packageType,
                confirmationDelivery=package.confirmationDelivery,
                watingTimeForConfirmation=package.watingTimeForConfirmation,
                happinesslevel=package.happinesslevel,
                describeHappiness=package.describeHappiness,
                describePackage=package.describePackage,
                redinessForChanges=package.redinessForChanges

            };
            return newPackage;
        }
        public static List<DTO.PackageDTO> convertToPackageDTOList(List<DAL.Package> packages)
        {
            List<DTO.PackageDTO> listPackage = new List<DTO.PackageDTO>();
            packages.ForEach(lp => listPackage.Add(convertToPackageDTO(lp)));
            return listPackage;
        }

    }
}
