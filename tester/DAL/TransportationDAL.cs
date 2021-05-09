using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
   public class TransportationDAL
    {
        public static Transportation GetTransportationById(int id)
        {
            try {
            using (DBDeliveries2Entities db = new DBDeliveries2Entities())
            {
                return db.Transportations.FirstOrDefault(t=>t.transportationId== id);
            }
            }
            catch(Exception e)
            {
                return null;
            }
        }
    }
}
