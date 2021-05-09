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
            Transportation trans = TransportationDAL.GetTransportationById(drive.transportation);
            User u = UserDAL.GetUserById(drive.driverCode);
          //  List<Package> listPackages = WaitingPackageDAL.GetgPackagesByDrive(drive.driveCode);

            DTO.DriveDTO newdrive = new DTO.DriveDTO()
            {
                driveCode = drive.driveCode,
                driverCode = drive.driverCode,
                customerCode = drive.customerCode,
                drivingTime = drive.drivingTime,
                travelDate = drive.travelDate,
                fromLocationFormat = fromL.locationFormat,
                fromLocationLat = fromL.locationLat,
                fromLocationLng = fromL.locationLng,
                toLocationFormat = toL.locationFormat,
                toLocationLat = toL.locationLat,
                toLocationLng = toL.locationLng,
                fromLocationId = drive.fromLocation,
                toLocationId = drive.toLocation,
                describeDrive = drive.describeDrive,
                status = drive.status,
                transportation = trans.transportationId,
                price=drive.price,
                transportationType = trans.transportationType,
                timeInDate = new DateTime(drive.travelDate.Date.Year, drive.travelDate.Date.Month, drive.travelDate.Date.Day, drive.drivingTime.Hours, drive.drivingTime.Minutes, 0),
              //  listWaiting = BLL.converters.PackageConverter.convertToPackageDTOList(listPackages),
                driverName = u.userName,
                message=drive.message,
                distance=drive.distance
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
                driveCode = driveDTO.driveCode,
                driverCode = driveDTO.driverCode,
                customerCode = driveDTO.customerCode,
                drivingTime = driveDTO.drivingTime,
                travelDate = driveDTO.travelDate,
                fromLocation = driveDTO.fromLocationId,
                toLocation = driveDTO.toLocationId,
                describeDrive = driveDTO.describeDrive,
                status=driveDTO.status,
                transportation = driveDTO.transportation,
                price=driveDTO.price,
                message=driveDTO.message,
                distance=driveDTO.distance
               
            };
       
            return d;
        }

    }
}
