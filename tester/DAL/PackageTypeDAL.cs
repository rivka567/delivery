using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
   public class PackageTypeDAL
    {
        public static PackageType GetPackageTypeById(int id)
        {
            try {
            using (DBDeliveries2Entities db = new DBDeliveries2Entities())
            {
                return db.PackageTypes.FirstOrDefault(p=>p.packageTypeCode==id);
            }
            }
            catch(Exception e)
            {
                return null;
            }
        }
    }
}
