using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class PackageDAL
    {

        public static string AddPackage(Package package)
        {
            using (DBDeliveries1Entities db = new DBDeliveries1Entities())
            {
                db.Packages.Add(package);
                db.SaveChanges();
                if (GetPackageById(package.packageCode) != null)
                    return "add delivery";
                return "not add";
            }

        }
        public static Package GetPackageById(int id)
        {
            using (DBDeliveries1Entities db = new DBDeliveries1Entities())
            {
                return db.Packages.FirstOrDefault(u => u.packageCode.Equals(id));
            }
        }

        public static List<Package> GetAllPackages()
        {
            using (DBDeliveries1Entities db = new DBDeliveries1Entities())
            {
                var q = db.Packages.ToList();
                return q;
            }
        }
    }
}
