using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
   public class DriveDAL
    {
        public static string AddDrive(Drive drive)
        {
            using (DBDeliveries1Entities db = new DBDeliveries1Entities())
            {
                db.Drives.Add(drive);
                db.SaveChanges();
                if (GetDriveById(drive.driveCode) != null)
                    return "add drive";
                return "not added drive";
            }

        }
 

        public static Drive GetDriveById(int id)
        {
            using (DBDeliveries1Entities db = new DBDeliveries1Entities())
            {
                return db.Drives.FirstOrDefault(u => u.driveCode.Equals(id));
            }
        }

        public static List<Drive> GetAllDrives()
        {
            using (DBDeliveries1Entities db = new DBDeliveries1Entities())
            {
                var q = db.Drives.ToList();
                return q;
            }
        }

        public static List<Drive> GetSpesificDrives(DateTime date, TimeSpan time)
        {
            using (DBDeliveries1Entities db = new DBDeliveries1Entities())
            {
                var q = db.Drives.Where(d => d.travelDate >= date).ToList();
                return q;
            }
        }

    }
}
