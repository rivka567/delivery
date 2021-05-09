using BLL.converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;
using System.Web.Script.Serialization;


namespace BLL
{
    public class UserBLL
    {
        public static DTO.UserDTO GetUserById(string id)
        {
            var d = UserDAL.GetUserById(id);
            return UserConverter.convertToUserDTO(d);

        }

        public static List<DTO.UserDTO> GetAllUsers()
        {
            var d = UserDAL.GetAllUsers();
            return UserConverter.convertToUserDTOList(d);

        }
//מחזיר את רישמת השליחים הקשורים בחבילה מסויימת
        public static List<User> GetUsersByListWaitingOfPackage(List<DriveDTO> listWaiting)
        {
            List<string> listUsers = new List<string>();
            foreach (var d in listWaiting)
                listUsers.Add(d.driverCode);
            return DAL.UserDAL.GetUsersByListWaiting(listUsers);
           
        }

        public static void SendEmailToCustomersInListWaiting(DriveDTO drive,List<PackageDTO> listWaiting,string url)
        {
            List<string> listUsers = new List<string>();
            foreach (var p in listWaiting)
                listUsers.Add(p.userCustomerCode);
            var list = DAL.UserDAL.GetUsersByListWaiting(listUsers);
            foreach (var l in list)
            {
                var package = listWaiting.FirstOrDefault(p => p.userCustomerCode == l.userCode);
                //שולח מייל לחילות ללקוחות שהשליח סגר איתם חבילה
              if (package.status==false)
              EmailManagementBLL.SendEmailTAboutDeleteDrive(l.userMail, "הוסרה נסיעה מהמערכת שנסגרה עם חבילה שלך ",package,drive,url);
              else
               EmailManagementBLL.SendEmailTAboutDeleteDrive(l.userMail, "הוסרה נסיעה מהמערכת ", package, drive,url);
                listWaiting.Remove(listWaiting.FirstOrDefault(p => p.userCustomerCode == l.userCode));
            }
        }

        public static User AddUser(User user)
        { 

            return UserDAL.AddUser(user); ;

        }
 
             public static User UpdateUser(User user)
        {
            return UserDAL.UpdateUser(user); ;

        }
     

    }
}
