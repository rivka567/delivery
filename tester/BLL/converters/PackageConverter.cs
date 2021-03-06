﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
<<<<<<< HEAD
=======
using DAL;
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01

namespace BLL.converters
{
    public class PackageConverter
    {
        public static DTO.PackageDTO convertToPackageDTO(DAL.Package package)
        {
            if (package == null)
                return null;
<<<<<<< HEAD
            DTO.PackageDTO newPackage = new DTO.PackageDTO()
            {
                packageCode = package.packageCode,
                userCustomerCode=package.userCustomerCode,
                userDeliveryCode=package.userDeliveryCode,
                fromLocation=package.fromLocation,
                toLocation=package.toLocation,
                travelDate=package.travelDate,
=======

            Loction fromL = LocationDAL.GetLocationById(package.fromLocation);
            Loction toL = LocationDAL.GetLocationById(package.toLocation);

            DTO.PackageDTO newPackage = new DTO.PackageDTO()
            {
                //packageCode = package.packageCode,
                userCustomerCode=package.userCustomerCode,
                userDeliveryCode=package.userDeliveryCode,
                fromLocatioFormat = fromL.locationFormat,
                fromLocatioLat =fromL.locationLat,
                fromLocatioLng = fromL.locationLng,
                toLocatioFormat = toL.locationFormat,
                toLocatioLat = toL.locationLat,
                toLocationLng =toL.locationLng,
                //fromLocation=package.fromLocation,
                //toLocation=package.toLocation,
                travelDate =package.travelDate,
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01
                drivingTime=package.drivingTime,
                packageSize=package.packageSize,
                packageType=package.packageType,
                confirmationDelivery=package.confirmationDelivery,
<<<<<<< HEAD
                watingTimeForConfirmation=package.watingTimeForConfirmation,
                happinesslevel=package.happinesslevel,
                describeHappiness=package.describeHappiness,
                describePackage=package.describePackage,
                redinessForChanges=package.redinessForChanges

            };
=======
                happinesslevel=package.happinesslevel,
                describeHappiness=package.describeHappiness,
                describePackage=package.describePackage,
               
            };
           
       
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01
            return newPackage;
        }
        public static List<DTO.PackageDTO> convertToPackageDTOList(List<DAL.Package> packages)
        {
            List<DTO.PackageDTO> listPackage = new List<DTO.PackageDTO>();
            packages.ForEach(lp => listPackage.Add(convertToPackageDTO(lp)));
            return listPackage;
        }

<<<<<<< HEAD
=======
        public static DAL.Package convertDtoToDALPackage(DTO.PackageDTO packageDTO)
        {
            DAL.Package p = new DAL.Package()
            {
                userCustomerCode = packageDTO.userCustomerCode,
                userDeliveryCode = packageDTO.userDeliveryCode,
                
                //fromLocation=package.fromLocation,
                //toLocation=package.toLocation,
                travelDate = packageDTO.travelDate,
                drivingTime = packageDTO.drivingTime,
                packageSize = packageDTO.packageSize,
                packageType = packageDTO.packageType,
                confirmationDelivery = packageDTO.confirmationDelivery,
                happinesslevel = packageDTO.happinesslevel,
                describeHappiness = packageDTO.describeHappiness,
                describePackage = packageDTO.describePackage,

            };

            return p;
        }

>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01
    }
}
