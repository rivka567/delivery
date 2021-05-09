using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace DAL
{
    public class UserDAL
    {
      

        public static User AddUser(User user)
        {
            try { 

            using (DBDeliveries2Entities db = new DBDeliveries2Entities())
            {
                var u = db.Users.FirstOrDefault(u1 => u1.userMail.Equals(user.userMail));
                    if (u != null)
                        return null;
                    if (db.Users.FirstOrDefault(u1 => u1.userCode.Equals(user.userCode)) != null)
                        return null;
               
                db.Users.Add(user);
                db.SaveChanges();
                if(GetUserById(user.userCode) !=null)
                return GetUserById(user.userCode);
                    return null;
            }
            }
            catch(Exception e)
            {
                return null;
            }

        }

        public static User UpdateUser(User user)
        {
            try {
            using (DBDeliveries2Entities db = new DBDeliveries2Entities())
            {
                db.Users.Attach(user);
                db.Entry(user).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                User u = GetUserById(user.userCode);
                return u;

            }
            }
            catch(Exception e)
            {
                return null;
            }

        }
        public static User GetUserById(string id)
        {
            try { 
            using (DBDeliveries2Entities db = new DBDeliveries2Entities())
            {
                var u= db.Users.FirstOrDefault(u1 => u1.userCode.Equals(id));
                    if (u != null)
                        return u;
                    else
                        return null;
                       
            }
            }
            catch(Exception e)
            {
                return null;
            }
        }
       
        public static List<User> GetUsersByListWaiting(List<string> listUsers)
        {
            List<User> newList = new List<User>();
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    foreach (var u in listUsers)
                    {
                        newList.Add(db.Users.FirstOrDefault(u1 => u1.userCode.Equals(u)));
                    }
                }
                return newList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static List<User> GetAllUsers()
        {
            try { 
            using (DBDeliveries2Entities db = new DBDeliveries2Entities())
            {
                var q = db.Users.ToList();
                return q;
            }
            }
            catch(Exception e)
            {
                return null;
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
        }



    }

