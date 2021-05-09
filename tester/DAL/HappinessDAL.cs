using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
  public class HappinessDAL
    {

        public static bool AddHappiness(Happiness h)
        {
            try
            {
            using(DBDeliveries2Entities db=new DBDeliveries2Entities())
            {
                    db.Happinesses.Add(h);
                    db.SaveChanges();
                    return true;
            }
            }
            catch(Exception e)
            {
                return false;
            }
        }

        public static List<Happiness> GetHappinessByDeliveryId(string id)
        {
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    return db.Happinesses.Where(h => h.deliveryId.Equals(id)).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
     
        }

        public static List<Happiness> GetAllHappiness()
        {
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    return db.Happinesses.ToList();
                }
            }
            catch(Exception e)
            {
                return null;
            }
        }
    }
}
