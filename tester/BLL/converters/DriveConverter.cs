using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL.converters
{
   public class DriveConverter
    {
        public static DTO.DriveDTO convertToDriveDTO(DAL.Drive drive)
        {
            if (drive == null)
                return null;
            Loction fromL= LocationDAL.GetLocationById(drive.fromLocation);
            Loction toL= LocationDAL.GetLocationById(drive.toLocation);


            DTO.DriveDTO newdrive = new DTO.DriveDTO()
            {
                //driveCode = drive.driveCode,
                driverCode = drive.driverCode,
                customerCode=drive.customerCode,
                drivingTime = drive.drivingTime,
                travelDate = drive.travelDate,
                fromLocationFormat=fromL.locationFormat,
                fromLocationLat=fromL.locationLat,
                fromLocationLng = fromL.locationLng,
                toLocationFormat=toL.locationFormat,
                toLocationLat=toL.locationLat,
                toLocationLng=toL.locationLng,
                //fromLocation = drive.fromLocation,
                //toLocation = drive.toLocation,
                packageSizeCode = drive.packageSizeCode,
                howLongBeforeReminder = drive.howLongBeforeReminder,
                transportation = drive.transportation,
                describeDrive=drive.describeDrive,
                confirmationCustomer=drive.confirmationCustomer
             };
            return newdrive;
        }
        public static List<DTO.DriveDTO> convertToDriveDTOList(List<DAL.Drive> drives)
        {
            List<DTO.DriveDTO> listdrive = new List<DTO.DriveDTO>();
            drives.ForEach(lp => listdrive.Add(convertToDriveDTO(lp)));
            return listdrive;
        }
        public static DAL.Drive convertDtoToDALDrive(DTO.DriveDTO driveDTO)
        {
            DAL.Drive d = new DAL.Drive()
            {
                //driveCode = driveDTO.driveCode,
                driverCode = driveDTO.driverCode,
                customerCode = driveDTO.customerCode,
                drivingTime = driveDTO.drivingTime,
                travelDate = driveDTO.travelDate,

                //fromLocation = drive.fromLocation,
                //toLocation = drive.toLocation,
                packageSizeCode = driveDTO.packageSizeCode,
                howLongBeforeReminder = driveDTO.howLongBeforeReminder,
                transportation = driveDTO.transportation,
                describeDrive = driveDTO.describeDrive,
                confirmationCustomer = driveDTO.confirmationCustomer
            };

            return d;
        }

    }
}
