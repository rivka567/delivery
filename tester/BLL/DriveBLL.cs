using BLL.converters;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
  public  class DriveBLL
    {

        public static DTO.DriveDTO GetDriveById(int id)
        {
            var d = DAL.DriveDAL.GetDriveById(id);
            return DriveConverter.convertToDriveDTO(d);

        }

        public static List<DTO.DriveDTO> GetAllDrives()
        {
            var d = DAL.DriveDAL.GetAllDrives();
            return DriveConverter.convertToDriveDTOList(d);

        }

        public static List<DTO.DriveDTO> GetSpesificDrives(DateTime date, TimeSpan time)
        {
            var d = DAL.DriveDAL.GetSpesificDrives();
            return DriveConverter.convertToDriveDTOList(d);

        }

        public static string AddDrive(DTO.DriveDTO drive)
        {
            Loction fromL = new Loction()
            {
                locationFormat = drive.fromLocationFormat,
                locationLat = drive.fromLocationLat,
                locationLng = drive.fromLocationLng
            };
            Loction FrLo= LocationDAL.AddLocation(fromL);
            Loction toL = new Loction()
            {
                locationFormat = drive.toLocationFormat,
                locationLat = drive.toLocationLat,
                locationLng = drive.toLocationLng
            };
            Loction ToLo = LocationDAL.AddLocation(toL);

            Drive d = DriveConverter.convertDtoToDALDrive(drive);
            d.fromLocation = FrLo.locationId;
            d.toLocation = ToLo.locationId;

            return DAL.DriveDAL.AddDrive(d); 

        }
    
}
}
