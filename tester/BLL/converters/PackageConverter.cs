using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL.converters
{
    public class PackageConverter
    {
        public static DTO.PackageDTO convertToPackageDTO(DAL.Package package)
        {
            if (package == null)
                return null;

            Loction fromL = LocationDAL.GetLocationById(package.fromLocation);
            Loction toL = LocationDAL.GetLocationById(package.toLocation);
            PackageSize pSize = PackageSizeDAL.GetPackageSizeById(package.packageSize);
            PackageType pType = PackageTypeDAL.GetPackageTypeById(package.packageType);
            User u = UserDAL.GetUserById(package.userCustomerCode);

            DTO.PackageDTO newPackage = new DTO.PackageDTO()
            {
                packageCode = package.packageCode,
                userCustomerCode = package.userCustomerCode,
                userDeliveryCode = package.userDeliveryCode,
                fromLocationId =fromL.locationId,
                fromLocationFormat = fromL.locationFormat,
                fromLocationLat = fromL.locationLat,
                fromLocationLng = fromL.locationLng,
                toLocationId=toL.locationId,
                toLocationFormat = toL.locationFormat,
                toLocationLat = toL.locationLat,
                toLocationLng = toL.locationLng,
                fromDate = package.fromDate,
                toDate=package.toDate,
                fromTime = package.toTime,
                toTime=package.toTime,
                status = package.status,
                packageTypeCode = pType.packageTypeCode,
                packageType = pType.packageTypeName,
                describePackage = package.describePackage,
                packageSizeCode = pSize.packageSizeCode,
                packageSize = pSize.packageSizeName,
                timeInDate = new DateTime(),
             //   timeInDate = new DateTime(package.travelDate.Date.Year, package.travelDate.Date.Month, package.travelDate.Date.Day, package.drivingTime.Hours, package.drivingTime.Minutes, 0),
             //   listWaiting = BLL.converters.DriveConverter.convertToDriveDTOList(listDrives),
                customerName =u.userName,
                message=package.message,
                distance=package.distance
            };
           
       
            return newPackage;
        }
        public static List<DTO.PackageDTO> convertToPackageDTOList(List<DAL.Package> packages)
        {
            List<DTO.PackageDTO> listPackage = new List<DTO.PackageDTO>();
            packages.ForEach(lp => listPackage.Add(convertToPackageDTO(lp)));
            return listPackage;
        }

        public static DAL.Package convertDtoToDALPackage(DTO.PackageDTO packageDTO)
        {
            DAL.Package p = new DAL.Package()
            {
                packageCode=packageDTO.packageCode,
                userCustomerCode = packageDTO.userCustomerCode,
                userDeliveryCode = packageDTO.userDeliveryCode,
                fromLocation = packageDTO.fromLocationId,
                toLocation = packageDTO.toLocationId,
                fromDate = packageDTO.fromDate,
                toDate=packageDTO.toDate,
                fromTime=packageDTO.fromTime,
                toTime = packageDTO.toTime,
                status = packageDTO.status,
                packageType= packageDTO.packageTypeCode,
                describePackage = packageDTO.describePackage,
                packageSize = packageDTO.packageSizeCode,
                message=packageDTO.message,
                distance=packageDTO.distance              
            };

            return p;
        }

    }
}
