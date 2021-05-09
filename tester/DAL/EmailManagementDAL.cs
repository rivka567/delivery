using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Web.Script.Serialization;

namespace DAL
{
    public class EmailManagementDAL
    {
        public static string SendCodeByEmail(string mail)
        {
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    var u = db.Users.FirstOrDefault(u1 => u1.userMail.Equals(mail));
                    if (u != null)
                    { 
                         SendEmail(u.userMail, " הסיסמא שלך לאתר TenDrive  ", u.userCode);
                        return "-הקוד נשלח בהצלחה ל" + u.userMail;
                    }
                    else
                        return "מייל זה לא קיים במערכת";
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
        public static string SendEmail(string contactAddress, string subject, string body)
        {
            var json = new JavaScriptSerializer().Serialize(body);
            string FromMail = "travel2drive@gmail.com";
            string emailTo = contactAddress;
            MailMessage mail = new MailMessage();
            mail.IsBodyHtml = true;
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            mail.From = new MailAddress(FromMail, "ten drive");
            mail.To.Add(emailTo);
            mail.Subject = subject;
            mail.Body = body;
            SmtpServer.Port = 587;
            SmtpServer.UseDefaultCredentials = true;

            //מייל שממנו אני שולחת והסיסמא
            SmtpServer.Credentials = new System.Net.NetworkCredential(FromMail, "t9747204");
            SmtpServer.EnableSsl = true;
            try
            {
                SmtpServer.Send(mail);
                return "has been sent successfully";
            }
            catch (Exception e)
            {

                Console.WriteLine(e.InnerException);
                return e.ToString();
            }

        }


    }
}
