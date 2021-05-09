using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class SendMessageBLL
    {
        public static string SendMessageFromCustomerToDelivery(PackageDTO p,DriveDTO waitingD,string body)
        {
            var u = UserBLL.GetUserById(waitingD.driverCode);
            return EmailManagementDAL.SendEmail(u.userMail,"הודעה מ"+p.customerName+" על נסיעה "+waitingD.driveCode, body);
        }

        public static string SendMessageFromDeliveryToCustomer(PackageDTO waitingP, DriveDTO d, string body)
        {
            var u = UserBLL.GetUserById(waitingP.userCustomerCode);
            return EmailManagementDAL.SendEmail(u.userMail, "הודעה מ" + d.driverName + " על חבילה " + waitingP.packageCode, body);
        }
    }
}
