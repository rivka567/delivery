using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class UserDAL
    {
        public static string AddUser(User user)
        {
            using (DBDeliveries1Entities db = new DBDeliveries1Entities())
            {
                db.User.Add(user);
                db.SaveChanges();
                if(GetUserById(user.userCode) !=null)
                return "add delivery";
                return "not add";
            }

        }
        public static User GetUserById(string id)
        {
            using (DBDeliveries1Entities db = new DBDeliveries1Entities())
            {
                return db.User.FirstOrDefault(u => u.userCode.Equals(id));
            }
        }
       
        public static List<User> GetAllUsers()
        {
            using (DBDeliveries1Entities db = new DBDeliveries1Entities())
            {
                var q = db.User.ToList();
                return q;
            }
        }
        public static string SendEmail(string sender, string contactAddress, string subject, string body)
        {
<<<<<<< HEAD

            string FromMail =sender;
=======
            string FromMail = "travel4me1234@gmail.com";
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01
            string emailTo = contactAddress;
            MailMessage mail = new MailMessage();
            mail.IsBodyHtml = true;
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
<<<<<<< HEAD
            mail.From = new MailAddress(FromMail, "מלא מקום");
            mail.To.Add(emailTo);
            mail.Subject = subject;
            mail.Body = body;

            SmtpServer.Port = 25;
            SmtpServer.Credentials = new System.Net.NetworkCredential(contactAddress, "1234stst");
=======
            mail.From = new MailAddress(FromMail, "הפרויקט שלנו!!!");
            mail.To.Add(emailTo);
            mail.Subject = subject;
            mail.Body = body;
            SmtpServer.Port = 587;
            //מייל שממנו אני שולחת והסיסמא
            SmtpServer.Credentials = new System.Net.NetworkCredential("travel4me1234@gmail.com", "0548443141");
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01
            SmtpServer.EnableSsl = true;
            try
            {
                SmtpServer.Send(mail);
<<<<<<< HEAD
                return "has been sent successfully";
            }
            catch (Exception e)
            {
                return e.ToString();
            }
=======

                   return "has been sent successfully";
            }
            catch (Exception e)
            {

                Console.WriteLine(e.InnerException);
                return e.ToString();
            }

        }

            //string FromMail = "substitutesproject@gmail.com";
            //string emailTo = contactAddress;
            //MailMessage mail = new MailMessage();
            //mail.IsBodyHtml = true;
            //SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            //mail.From = new MailAddress(FromMail, "מלא מקום");
            //mail.To.Add(emailTo);
            //mail.Subject = subject;
            //mail.Body = body;

            //SmtpServer.Port = 587;
            //SmtpServer.Credentials = new System.Net.NetworkCredential("substitutesproject@gmail.com", "1234stst");
            //SmtpServer.EnableSsl = true;
            //try
            //{
            //    SmtpServer.Send(mail);
            //    return "has been sent successfully";
            //}
            //catch (Exception e)
            //{
            //    return e.ToString();
            //}
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01
        }



    }

