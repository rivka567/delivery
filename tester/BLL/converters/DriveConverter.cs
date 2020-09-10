using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL.converters
{
   public class DriveConverter
    {
        public static DTO.DriveDTO convertToDriveDTO(DAL.Drive drive)
        {
            if (drive == null)
                return null;
            DTO.DriveDTO newdrive = new DTO.DriveDTO()
            {
                driveCode = drive.driveCode,
                userCode = drive.userCode,
                drivingTime = drive.drivingTime,
                travelDate = drive.travelDate,
                fromLocation = drive.fromLocation,
                toLocation = drive.toLocation,
                readinessForChanges = drive.readinessForChanges,
                packageSizeCode = drive.packageSizeCode,
                howLongBeforeReminder = drive.howLongBeforeReminder,
                transportation = drive.transportation

            };
            return newdrive;
        }
        public static List<DTO.DriveDTO> convertToDriveDTOList(List<DAL.Drive> drives)
        {
            List<DTO.DriveDTO> listdrive = new List<DTO.DriveDTO>();
            drives.ForEach(lp => listdrive.Add(convertToDriveDTO(lp)));
            return listdrive;
        }
    }
}
