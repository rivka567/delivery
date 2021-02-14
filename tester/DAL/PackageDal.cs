using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class PackageDal
    {

        public static string AddPackage(Package package)
        {
            using (DBDeliveriesEntities db = new DBDeliveriesEntities())
            {
                db.Package.Add(package);
                db.SaveChanges();
                if (GetPackageById(package.packageCode) != null)
                    return "add delivery";
                return "not add";
            }

        }
        public static Package GetPackageById(int id)
        {
            using (DBDeliveriesEntities db = new DBDeliveriesEntities())
            {
                return db.Package.FirstOrDefault(u => u.packageCode.Equals(id));
            }
        }

        public static List<Package> GetAllPackages()
        {
            using (DBDeliveriesEntities db = new DBDeliveriesEntities())
            {
                var q = db.Package.ToList();
                return q;
            }
        }
    }
}
