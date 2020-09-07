using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}
