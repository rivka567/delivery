using BLL.converters;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
   public class DriveBLL
    {
        public static DTO.DriveDTO GetDriveById(string id)
        {
            var d = DAL.DriveDal.GetDriveById(id);
            return DriveConverter.convertToDriveDTO(d);

        }

        public static List<DTO.DriveDTO> GetAllDrives()
        {
            var d = DAL.DriveDal.GetAllDrives();
            return DriveConverter.convertToDriveDTOList(d);

        }

        public static string AddDrive(Drive drive)
        {
            return DAL.DriveDal.AddDrive(drive); ;

        }
    }
}
