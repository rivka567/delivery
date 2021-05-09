using BLL.converters;
using DAL;
using DTO;
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
            var cd=DriveConverter.convertToDriveDTOList(d);
            foreach (var item in cd)
            {
                item.listWaiting = PackageConverter.convertToPackageDTOList(WaitingMessageDAL.GetgPackagesByDrive(item.driveCode));
            }
            return cd;

        }

        public static List<DTO.DriveDTO> GetDrivesByUserId(string id)
        {
            var d = DAL.DriveDAL.GetDrivesByUserId(id);
            var cd = DriveConverter.convertToDriveDTOList(d);
            foreach (var item in cd)
            {
                item.listWaiting = PackageConverter.convertToPackageDTOList(WaitingMessageDAL.GetgPackagesByDrive(item.driveCode));
            }
            return cd;

        }
        public static List<DTO.DriveDTO> DeleteDrive(DriveDTO drive,List<PackageDTO> listWaiting,string url)
        {
            if(listWaiting.Count!=0)
            { 
            WaitingMessageBLL.DeleteWaitingMessageByDriveId(drive.driveCode);

                //שולח מייל לכל הלקוחות המקושרים לנסיעה זו
            UserBLL.SendEmailToCustomersInListWaiting(drive,listWaiting,url);
            }
            string idUser = DriveDAL.DeleteDrive(drive.driveCode);
            return GetDrivesByUserId(idUser);
        }

        public static string ChangeStatus(int id,bool status)
        {
            if (DriveDAL.ChangeStatus(id,status))
                return "חבילה נסגרה ולא תופיע יותר ברשימת השליחויות";
            return null;
        }

        //public static List<DTO.DriveDTO> GetDrivesByDate(DateTime? fromDate, DateTime? toDate,TimeSpan? time)
        //{
        //    var d = DAL.DriveDAL.GetDrivesByDate(fromDate,toDate,time);
        //    return DriveConverter.convertToDriveDTOList(d);

        //}

        public static DriveDTO AddDrive(DTO.DriveDTO drive)
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

            var driveDAL= DAL.DriveDAL.AddDrive(d);
            return DriveConverter.convertToDriveDTO(driveDAL);

        }

        public static DTO.DriveDTO UpdateDrive(DTO.DriveDTO drive,List<PackageDTO> listWaiting)
        {
            if (drive.fromLocationId == 0)
            {
                Loction fromL = new Loction()
                {
                    locationFormat = drive.fromLocationFormat,
                    locationLat = drive.fromLocationLat,
                    locationLng = drive.fromLocationLng
                };
                Loction FrLo = LocationDAL.AddLocation(fromL);
                drive.fromLocationId = FrLo.locationId;
            }
            if (drive.toLocationId== 0)
            {
                Loction toL = new Loction()
                {
                    locationFormat = drive.toLocationFormat,
                    locationLat = drive.toLocationLat,
                    locationLng = drive.toLocationLng
                };
                Loction ToLo = LocationDAL.AddLocation(toL);
                drive.toLocationId = ToLo.locationId;
            }
            Drive d = DriveConverter.convertDtoToDALDrive(drive);
            DriveDTO driveDTO=  DriveConverter.convertToDriveDTO(DAL.DriveDAL.UpdateDrive(d));
            if (driveDTO != null && listWaiting != null)
                foreach (var p in listWaiting)
                    EmailManagementBLL.SendEmailAboutUpdateDrive(UserBLL.GetUserById(p.userCustomerCode).userMail, drive.driverName + " " + "עדכן/ה פרטי נסיעה", p, drive);

            //return DriveConverter.convertToDriveDTOList(DriveDAL.GetDrivesByUserId(drive.driverCode));
            return driveDTO;

        }

    }
}
