using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
   public class EmailManagementBLL
    {
        public static string SendCodeByEmail(string mail)
        {
            return EmailManagementDAL.SendCodeByEmail(mail);
        }

        public static string SendEmailToMatchPackages(List<PackageDTO> matchPackages,DriveDTO drive)
        {
            foreach (var p in matchPackages)
            {
                SendPackageToMatchCustomer(UserBLL.GetUserById(p.userCustomerCode).userMail, "נמצאה נסיעה מתאימה לחבילה שלך", drive, p);
            }
            return "sucsses";
        }

        public static string SendPackageToMatchCustomer(string contactAddress, string subject, DriveDTO body, PackageDTO package)
        {
            string mailBody = File.ReadAllText("C: \\Users\\dvora bloch\\Desktop\\new tester\\tester\\WebAPI\\HtmlPages\\MatchDrive.html");
            string str = mailBody;
            str = str.Replace("$customerName", package.customerName);
            str = str.Replace("$packageId", package.packageCode.ToString());
            str = str.Replace("$driveId", body.driveCode.ToString());
            str = str.Replace("$fromlocation", body.fromLocationFormat);
            str = str.Replace("$tolocation", body.toLocationFormat);
            str = str.Replace("$date", body.travelDate.ToString());
            str = str.Replace("$time", body.drivingTime.ToString());
            str = str.Replace("$trans", body.transportationType);
            str = str.Replace("$price", body.price.ToString());
            //str = str.Replace("$describe", body.describeDrive);

            return EmailManagementDAL.SendEmail(contactAddress, subject, str);
        }


        public static string SendEmailToMatchDrivers(List<DriveDTO> matchDrives,PackageDTO package)
        {
            foreach(var d in matchDrives)
            {
                SendPackageToMatchDriver(UserBLL.GetUserById(d.driverCode).userMail, "נמצאה חבילה מתאימה לנסיעה שלך", package, d);
            }
            return "sucsses";
        }

        //שולח פרי חבילה ללקוח שנרשם לקבלת התראה זו והנסיעה שלו מתאימה
        public static string SendPackageToMatchDriver(string contactAddress, string subject, PackageDTO body, DriveDTO drive)
        {
            string mailBody = File.ReadAllText("C: \\Users\\dvora bloch\\Desktop\\new tester\\tester\\WebAPI\\HtmlPages\\MatchPackage.html");
            string str = mailBody;
            str = str.Replace("$driverName", drive.driverName);
            str = str.Replace("$driveId", drive.driveCode.ToString());
            str = str.Replace("$packageId", body.packageCode.ToString());
            str = str.Replace("$fromlocation", body.fromLocationFormat);
            str = str.Replace("$tolocation", body.toLocationFormat);
            str = str.Replace("$fromDate", body.fromDate.ToString());
            str = str.Replace("$fromTime", body.fromTime.ToString());
            str = str.Replace("$toDate", body.toDate.ToString());
            str = str.Replace("$toTime", body.toTime.ToString());
            str = str.Replace("$type", body.packageType);
            str = str.Replace("$size", body.packageSize);
            str = str.Replace("$describe", body.describePackage);
            str = str.Replace("$url", "http://localhost:4200/show-message-p" + "/"+body.packageCode+"/"+drive.driveCode);

            return EmailManagementDAL.SendEmail(contactAddress, subject, str);
        }

        public static string SendPackageByEmail(string contactAddress, string subject,PackageDTO body,DriveDTO drive)
        {
            string mailBody = File.ReadAllText("C: \\Users\\dvora bloch\\Desktop\\new tester\\tester\\WebAPI\\HtmlPages\\myPackage.html");
            string str = mailBody;
            str = str.Replace("$deliveryName", drive.driverName);
            str = str.Replace("$customerName", body.customerName);
            str = str.Replace("$driveId", drive.driveCode.ToString());
            str = str.Replace("$packageId", body.packageCode.ToString());
            str = str.Replace("$fromlocation", body.fromLocationFormat);
            str = str.Replace("$tolocation", body.toLocationFormat);
            str = str.Replace("$fromDate", body.fromDate.ToString());
            str = str.Replace("$fromTime", body.fromTime.ToString());
            str = str.Replace("$toDate", body.toDate.ToString());
            str = str.Replace("$toTime", body.toTime.ToString());
            str = str.Replace("$type", body.packageType);
            str = str.Replace("$size", body.packageSize);
            str = str.Replace("$describe", body.describePackage);
            return EmailManagementDAL.SendEmail(contactAddress, subject, str);
        }


        public static string SendDriveByEmail(string contactAddress, string subject, PackageDTO package, DriveDTO body)
        {
            string mailBody = File.ReadAllText("C: \\Users\\dvora bloch\\Desktop\\new tester\\tester\\WebAPI\\HtmlPages\\MyDrive.html");
            string str = mailBody;

            str = str.Replace("$customerName", package.customerName);
            str = str.Replace("$deliveryName", body.driverName);
            str = str.Replace("$packageId", package.packageCode.ToString());
            str = str.Replace("$driveId", body.driveCode.ToString());
            str = str.Replace("$fromlocation", body.fromLocationFormat);
            str = str.Replace("$tolocation", body.toLocationFormat);
            str = str.Replace("$date", body.travelDate.ToString());
            str = str.Replace("$time", body.drivingTime.ToString());
            str = str.Replace("$trans", body.transportationType);
            str = str.Replace("$price", body.price.ToString());
            str = str.Replace("$describe", body.describeDrive);
            return EmailManagementDAL.SendEmail(contactAddress, subject, str);
        }

        public static string SendEmailTAboutDeleteDrive(string contactAddress, string subject, PackageDTO package, DriveDTO drive,string url)
        {
            string mailBody = File.ReadAllText("C: \\Users\\dvora bloch\\Desktop\\new tester\\tester\\WebAPI\\HtmlPages\\DeleteDrive.html");
            string str = mailBody;
            str = str.Replace("$deliveryName", drive.driverName);
            str = str.Replace("$customerName", package.customerName);
            str = str.Replace("$packageId", package.packageCode.ToString());
            str = str.Replace("$driveId", drive.driveCode.ToString());
            str = str.Replace("$fromlocation", drive.fromLocationFormat);
            str = str.Replace("$tolocation", drive.toLocationFormat);
            str = str.Replace("$date", drive.travelDate.ToString());
            str = str.Replace("$time", drive.drivingTime.ToString());
            str = str.Replace("$trans", drive.transportationType);
            str = str.Replace("$price", drive.price.ToString());
            str = str.Replace("$describe", drive.describeDrive);
            str = str.Replace("$url",url);

            return EmailManagementDAL.SendEmail(contactAddress, subject, str);

        }

        public static string SendEmailAboutRemoveDrive(string contactAddress, string subject, PackageDTO package, DriveDTO drive)
        {
            string mailBody = File.ReadAllText("C: \\Users\\dvora bloch\\Desktop\\new tester\\tester\\WebAPI\\HtmlPages\\RemoveDrive.html");
            string str = mailBody;
            str = str.Replace("$deliveryName", drive.driverName);
            str = str.Replace("$customerName", package.customerName);
            str = str.Replace("$driveId", drive.driveCode.ToString());
            str = str.Replace("$packageId", package.packageCode.ToString());
            str = str.Replace("$fromlocation", package.fromLocationFormat);
            str = str.Replace("$tolocation", package.toLocationFormat);
            str = str.Replace("$fromDate", package.fromDate.ToString());
            str = str.Replace("$fromTime", package.fromTime.ToString());
            str = str.Replace("$toDate", package.toDate.ToString());
            str = str.Replace("$toTime", package.toTime.ToString());
            str = str.Replace("$type", package.packageType);
            str = str.Replace("$size", package.packageSize);
            str = str.Replace("$describe", package.describePackage);
            return EmailManagementDAL.SendEmail(contactAddress, subject, str);

        }
        public static string SendEmailAboutRemovePackage(string contactAddress, string subject, PackageDTO package, DriveDTO drive)
        {
            string mailBody = File.ReadAllText("C: \\Users\\dvora bloch\\Desktop\\new tester\\tester\\WebAPI\\HtmlPages\\RemovePackage.html");
            string str = mailBody;
            str = str.Replace("$deliveryName", drive.driverName);
            str = str.Replace("$customerName", package.customerName);
            str = str.Replace("$packageId", package.packageCode.ToString());
            str = str.Replace("$driveId", drive.driveCode.ToString());
            str = str.Replace("$fromlocation", drive.fromLocationFormat);
            str = str.Replace("$tolocation", drive.toLocationFormat);
            str = str.Replace("$date", drive.travelDate.ToString());
            str = str.Replace("$time", drive.drivingTime.ToString());
            str = str.Replace("$trans", drive.transportationType);
            str = str.Replace("$price", drive.price.ToString());
            str = str.Replace("$describe", drive.describeDrive);
            return EmailManagementDAL.SendEmail(contactAddress, subject, str);
  
        }

        public static string SendEmailAboutUpdatePackage(string contactAddress,string subject,PackageDTO package,DriveDTO drive)
        {
            string mailBody = File.ReadAllText("C: \\Users\\dvora bloch\\Desktop\\new tester\\tester\\WebAPI\\HtmlPages\\UpdatePackage.html");
            string str = mailBody;
            str = str.Replace("$deliveryName", drive.driverName);
            str = str.Replace("$packageId", package.packageCode.ToString());
            str = str.Replace("$driveId", drive.driveCode.ToString());
            str = str.Replace("$packageId", package.packageCode.ToString());
            str = str.Replace("$fromlocation", package.fromLocationFormat);
            str = str.Replace("$tolocation", package.toLocationFormat);
            str = str.Replace("$fromDate", package.fromDate.ToString());
            str = str.Replace("$fromTime", package.fromTime.ToString());
            str = str.Replace("$toDate", package.toDate.ToString());
            str = str.Replace("$toTime", package.toTime.ToString());
            str = str.Replace("$type", package.packageType);
            str = str.Replace("$size", package.packageSize);
            str = str.Replace("$describe", package.describePackage);
            return EmailManagementDAL.SendEmail(contactAddress, subject, str);

        }

        public static string SendEmailAboutUpdateDrive(string contactAddress, string subject, PackageDTO package, DriveDTO drive)
        {
            string mailBody = File.ReadAllText("C: \\Users\\dvora bloch\\Desktop\\new tester\\tester\\WebAPI\\HtmlPages\\UpdateDrive.html");
            string str = mailBody;

            str = str.Replace("$customerName", package.customerName);
            str = str.Replace("$deliveryName", drive.driverName);
            str = str.Replace("$packageId", package.packageCode.ToString());
            str = str.Replace("$driveId", drive.driveCode.ToString());
            str = str.Replace("$fromlocation", drive.fromLocationFormat);
            str = str.Replace("$tolocation", drive.toLocationFormat);
            str = str.Replace("$date", drive.travelDate.ToString());
            str = str.Replace("$time", drive.drivingTime.ToString());
            str = str.Replace("$trans", drive.transportationType);
            str = str.Replace("$price", drive.price.ToString());
            str = str.Replace("$describe", drive.describeDrive);
            return EmailManagementDAL.SendEmail(contactAddress, subject, str);


        }

        public static string SendEmailAboutConfirmDrive(string contactAddress, string subject, PackageDTO package, DriveDTO drive)
        {
            string mailBody = File.ReadAllText("C: \\Users\\dvora bloch\\Desktop\\new tester\\tester\\WebAPI\\HtmlPages\\ConfirmDrive.html");
            string str = mailBody;
            str = str.Replace("$deliveryName", drive.driverName);
            str = str.Replace("$customerName", package.customerName);
            str = str.Replace("$driveId", drive.driveCode.ToString());
            str = str.Replace("$packageId", package.packageCode.ToString());
            str = str.Replace("$fromlocation", package.fromLocationFormat);
            str = str.Replace("$tolocation", package.toLocationFormat);
            str = str.Replace("$fromDate", package.fromDate.ToString());
            str = str.Replace("$fromTime", package.fromTime.ToString());
            str = str.Replace("$toDate", package.toDate.ToString());
            str = str.Replace("$toTime", package.toTime.ToString());
            str = str.Replace("$type", package.packageType);
            str = str.Replace("$size", package.packageSize);
            str = str.Replace("$describe", package.describePackage);
            return EmailManagementDAL.SendEmail(contactAddress, subject, str);

        }

    }
}
