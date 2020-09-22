using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
   public class DriveDal
    {
        public static string AddDrive(Drive drive)
        {
            using (DBDeliveriesEntities db = new DBDeliveriesEntities())
            {
                db.Drives.Add(drive);
                db.SaveChanges();
                if (GetDriveById(drive.driveCode.ToString()) != null)
                    return "add drive";
                return "not added drive";
            }

        }
        public static Drive GetDriveById(string id)
        {
            using (DBDeliveriesEntities db = new DBDeliveriesEntities())
            {
                return db.Drives.FirstOrDefault(u => u.driveCode.Equals(id));
            }
        }

        public static List<Drive> GetAllDrives()
        {
            using (DBDeliveriesEntities db = new DBDeliveriesEntities())
            {
                var q = db.Drives.ToList();
                return q;
            }
        }
    }
}
