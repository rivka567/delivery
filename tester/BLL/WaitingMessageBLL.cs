using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
   public class WaitingMessageBLL
    {
        public static bool AddWaitingMessage(int idP, int idD,int price)
        {
            return DAL.WaitingMessageDAL.AddWaitingMessage(new DAL.WaitingMessage() { packageId = idP, driveId = idD, status = true,totalPrice=price });
        }

        public static void DeleteWaitingMessageByPackageId(int id)
        {
            DAL.WaitingMessageDAL.DeleteWaitingMessageByPackageId(id);
        }

        public static void DeleteWaitingMessageByDriveId(int id)
        {
            DAL.WaitingMessageDAL.DeleteWaitingMessageByDriveId(id);
        }
        //שהלקוח מוחק נסיעה של שליח
        public static string DeleteWaitingMessageFromCustomer(PackageDTO p, DriveDTO d)
        {
           
            if (DAL.WaitingMessageDAL.DeleteWaitingMessage(p.packageCode, d.driveCode))
            {
                //אם הלקוח סגר עם שליח זה את החבילה
                if (p.status == false)
                {
                    PackageBLL.ChangeStatus(p.packageCode, true);
                    EmailManagementBLL.SendEmailAboutRemoveDrive(UserBLL.GetUserById(d.driverCode).userMail, p.customerName + " " + "הסיר/ה נסיעה שלך שאושרה לשליחות", p, d);
                    return "הוסר בהצלחה";
                }

                EmailManagementBLL.SendEmailAboutRemoveDrive(UserBLL.GetUserById(d.driverCode).userMail, p.customerName + " " + "הסיר/ה נסיעה שלך" , p, d);
                return "הוסר בהצלחה";
            }

            return null;
        }
        //ששליח מוחק חבילה של לקוח שלא מעוניין בה
        public static string DeleteWaitingMessageFromDelivery(PackageDTO p, DriveDTO d)
        {

            if (DAL.WaitingMessageDAL.DeleteWaitingMessage(p.packageCode, d.driveCode))
            {
                //אם הלקוח סגר עם שליח זה את החבילה
                if (p.status == false)
                {
                    PackageBLL.ChangeStatus(p.packageCode, true);
                    //בדיקה האם הוא מחק את הלקוח האחרון והחבילה שלו הייתה בסטטוס סגור (ז"א לא להציג ברשימת הנסיעות יותר) אז לשנות לפתוח כדע שתוצג בחזרה
                    //ז"א הנסיעה לא מקושרת יותר לשום חבילה
                    if (DAL.WaitingMessageDAL.GetWaitingPackageByDeliveryId(d.driveCode))
                        DriveBLL.ChangeStatus(d.driveCode, true);
                    EmailManagementBLL.SendEmailAboutRemovePackage(UserBLL.GetUserById(p.userCustomerCode).userMail, d.driverName + " " + "הסיר/ה חבילה שלך שנסגרה איתו", p, d);
                    return "הוסר בהצלחה";
                }
                EmailManagementBLL.SendEmailAboutRemovePackage(UserBLL.GetUserById(p.userCustomerCode).userMail,d.driverName + " " + "הסיר/ה חבילה שלך", p, d);
                return "הוסר בהצלחה";
            }

            return null;
        }

        public static string deleteAllWaitingMessage(PackageDTO p, DriveDTO driveConfirm, List<DriveDTO> listToDelete)
        {
            //משנה סטטוס לכך שהחבילה נסגרה עם שליח
            if (PackageBLL.ChangeStatus(p.packageCode, false) && DAL.WaitingMessageDAL.ChangeStatus(p.packageCode, driveConfirm.driveCode, false))
            {
                foreach (var d in listToDelete)
                {
                    if (DAL.WaitingMessageDAL.DeleteWaitingMessage(p.packageCode, d.driveCode) == false)
                        return null;
                    EmailManagementBLL.SendEmailAboutRemoveDrive(UserBLL.GetUserById(d.driverCode).userMail, p.customerName + " " + "הסיר/ה נסיעה שלך" , p, d);
                   
                }
            }
            return "sucsess";

        }
    }
}
