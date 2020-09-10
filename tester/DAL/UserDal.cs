using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class UserDal
    {
        public static string AddUser(User user)
        {
            using (DBDeliveriesEntities db = new DBDeliveriesEntities())
            {
                db.Users.Add(user);
                db.SaveChanges();
                if(GetUserById(user.userCode) !=null)
                return "add delivery";
                return "not add";
            }

        }
        public static User GetUserById(string id)
        {
            using (DBDeliveriesEntities db = new DBDeliveriesEntities())
            {
                return db.Users.FirstOrDefault(u => u.userCode.Equals(id));
            }
        }
       
        public static List<User> GetAllUsers()
        {
            using (DBDeliveriesEntities db = new DBDeliveriesEntities())
            {
                var q = db.Users.ToList();
                return q;
            }
        }
        public static string SendEmail(string sender, string contactAddress, string subject, string body)
        {

            string FromMail =sender;
            string emailTo = contactAddress;
            MailMessage mail = new MailMessage();
            mail.IsBodyHtml = true;
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            mail.From = new MailAddress(FromMail, "מלא מקום");
            mail.To.Add(emailTo);
            mail.Subject = subject;
            mail.Body = body;

            SmtpServer.Port = 25;
            SmtpServer.Credentials = new System.Net.NetworkCredential(contactAddress, "1234stst");
            SmtpServer.EnableSsl = true;
            try
            {
                SmtpServer.Send(mail);
                return "has been sent successfully";
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }



    }
}
