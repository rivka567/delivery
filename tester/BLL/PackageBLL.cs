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
    public class PackageBLL
    {
        public static DTO.PackageDTO GetPackageById(int id)
        {
            var p = DAL.PackageDAL.GetPackageById(id);
            return PackageConverter.convertToPackageDTO(p);

        }

        public static List<DTO.PackageDTO> GetAllPackages()
        {
            var p = DAL.PackageDAL.GetAllPackages();
            var cp = PackageConverter.convertToPackageDTOList(p);
            foreach (var item in cp)
            {
                //List<Drive> listDrives = WaitingPackageDAL.GetgDrivesByPackage(item.packageCode);
                item.listWaiting = DriveConverter.convertToDriveDTOList(WaitingMessageDAL.GetgDrivesByPackage(item.packageCode));

            }
            return cp;

        }

        public static List<DTO.PackageDTO> GetPackagesByUserId(string id)
        {
            var p = DAL.PackageDAL.GetPackagesByUserId(id);
            var cp= PackageConverter.convertToPackageDTOList(p);
            foreach (var item in cp)
            {
                //List<Drive> listDrives = WaitingPackageDAL.GetgDrivesByPackage(item.packageCode);
                item.listWaiting = DriveConverter.convertToDriveDTOList(WaitingMessageDAL.GetgDrivesByPackage(item.packageCode));

            }
            return cp;

        }

        public static PackageDTO AddPackage(DTO.PackageDTO package)
        {
            Loction fromL = new Loction()
            {
                locationFormat = package.fromLocationFormat,
                locationLat = package.fromLocationLat,
                locationLng = package.fromLocationLng
            };
            Loction FrLo = LocationDAL.AddLocation(fromL);
            Loction toL = new Loction()
            {
                locationFormat = package.toLocationFormat,
                locationLat = package.toLocationLat,
                locationLng = package.toLocationLng
            };
            Loction ToLo = LocationDAL.AddLocation(toL);

            Package p = PackageConverter.convertDtoToDALPackage(package);
            p.fromLocation = FrLo.locationId;
            p.toLocation = ToLo.locationId;

            var packageDAL= DAL.PackageDAL.AddPackage(p);
            return PackageConverter.convertToPackageDTO(packageDAL);

        }

        public static bool ChangeStatus(int idP, bool status)
        {
            if (PackageDAL.ChangeStatus(idP,status))
                return true;
            return false;
        }

        public static List<DTO.PackageDTO> DeletePackage(int id,List<DriveDTO> listWaiting)
        {
            var p = PackageDAL.GetPackageById(id);
            var packageDTO = PackageConverter.convertToPackageDTO(p);
            if(listWaiting!=null)
            { 
            //מוחק את כל הנסיעות הקשורות לחבילה זו
            WaitingMessageBLL.DeleteWaitingMessageByPackageId(id);
            //מחזיר את רשימת השליחים הקשורים לחבילה זו
            var listUsers= UserBLL.GetUsersByListWaitingOfPackage(listWaiting);
            foreach (var l in listUsers)
            {
              EmailManagementBLL.SendEmailAboutRemoveDrive(l.userMail, packageDTO.customerName + " " + "הסיר/ה את החבילה מהמערכת", packageDTO, listWaiting.FirstOrDefault(d => d.driverCode.Equals(l.userCode)));
            }
            }
            string idUser=PackageDAL.DeletePackage(id);
            if(idUser!=null)
            return GetPackagesByUserId(idUser);
            return null;
        }

        public static DTO.PackageDTO UpdatePackage(DTO.PackageDTO package,List<DriveDTO> listWaiting)
        {
            if (package.fromLocationId == 0)
            {
                Loction fromL = new Loction()
                {
                    locationFormat = package.fromLocationFormat,
                    locationLat = package.fromLocationLat,
                    locationLng = package.fromLocationLng
                };
                Loction FrLo = LocationDAL.AddLocation(fromL);
                package.fromLocationId = FrLo.locationId;
            }
            if (package.toLocationId == 0)
            {
                Loction toL = new Loction()
                {
                    locationFormat = package.toLocationFormat,
                    locationLat = package.toLocationLat,
                    locationLng = package.toLocationLng
                };
                Loction ToLo = LocationDAL.AddLocation(toL);
                package.toLocationId = ToLo.locationId;
            }
            Package p = PackageConverter.convertDtoToDALPackage(package);
            Package newPackage = DAL.PackageDAL.UpdatePackage(p);
            PackageDTO packageDTO = new PackageDTO();
            if (newPackage!=null)
            packageDTO= PackageConverter.convertToPackageDTO(newPackage);
            if (packageDTO != null&&listWaiting!=null)
                foreach (var d in listWaiting)
                    EmailManagementBLL.SendEmailAboutUpdatePackage(UserBLL.GetUserById(d.driverCode).userMail, package.customerName + " " + "עדכן/ה פרטי חבילה", package, d);
            return packageDTO;
        }
    }
}
