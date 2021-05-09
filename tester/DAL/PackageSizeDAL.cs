using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
  public  class PackageSizeDAL
    {
        public static PackageSize GetPackageSizeById(int id)
        {
            try { 
            using (DBDeliveries2Entities db = new DBDeliveries2Entities())
            {
                return db.PackageSizes.FirstOrDefault(p=>p.packageSizeCode==id);
            }
            }
            catch(Exception e)
            {
                return null;
            }
        }
    }
}
