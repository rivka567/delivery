using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
  public  class LocationDAL
    {
        public static Loction AddLocation(Loction l)
        {
            try
            {
            using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    Loction lo = db.Loctions.FirstOrDefault(u => u.locationLat == l.locationLat && u.locationLng == l.locationLng && u.locationFormat == l.locationFormat);
                    if (lo == null)
                    {
                        db.Loctions.Add(l);
                        db.SaveChanges();


                    lo = db.Loctions.FirstOrDefault(u => u.locationLat==l.locationLat && u.locationLng==l.locationLng && u.locationFormat==l.locationFormat);
                    }
                    return lo;
                }
            }
            catch(Exception e)

            {
                return null;
            }
           

        }
        public static Loction GetLocationById(int id)
        {
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    return db.Loctions.FirstOrDefault(l => l.locationId.Equals(id));
                }
            }catch(Exception e)
            {
                return null;
            }
           
        }

    }
}
