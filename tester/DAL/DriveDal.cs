using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
   public class DriveDAL
   {
        static List<Drive> drives = new List<Drive>();
        static DateTime today = DateTime.Now.Date;

        public static Drive AddDrive(Drive drive)
        {
            try { 
            using (DBDeliveries2Entities db = new DBDeliveries2Entities())
            {

              DateTime d=drive.travelDate.AddDays(1);
                    drive.travelDate = d;
                    db.Drives.Add(drive);
                db.SaveChanges();
                if (GetDriveById(drive.driveCode) != null)
                    return GetDriveById(drive.driveCode);
                return null;
            }
          }
          catch(Exception e)
            {
                return null;
            }


        }

        public static bool ChangeStatus(int id,bool status)
        {
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    db.Drives.FirstOrDefault(d => d.driveCode == id).status = status;
                    db.SaveChanges();
                    return true;
                }                  
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public static string DeleteDrive(int id)
        {
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    string idUser = db.Drives.FirstOrDefault(d =>d.driveCode== id).driverCode;
                    db.Drives.Remove(db.Drives.FirstOrDefault(d=>d.driveCode== id));
                    db.SaveChanges();
                    return idUser;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static Drive GetDriveById(int id)
        {
            try {
            using (DBDeliveries2Entities db = new DBDeliveries2Entities())
            {
                db.Configuration.LazyLoadingEnabled = false;

                return db.Drives.FirstOrDefault(u => u.driveCode.Equals(id));
            }
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public static List<Drive> GetAllDrives()
        {
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    drives = db.Drives.Where(d => d.travelDate >=today&d.status==true).OrderBy(d1 => d1.travelDate).ToList();
                    return drives;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static List<Drive> GetDrivesByUserId(string id)
        {
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    drives = db.Drives.Where(d => d.driverCode.Equals(id)).OrderBy(d1 => d1.travelDate).ToList();
                    return drives;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public static Drive UpdateDrive(Drive d)
        {
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    DateTime d1 = d.travelDate.AddDays(1);
                    d.travelDate = d1;
                    db.Drives.Attach(d);
                    db.Entry(d).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    return GetDriveById(d.driveCode);

                }
            }
            catch (Exception e)
            {
                return null;
            }

        }

        //public static List<Drive> GetDrivesByPackage(int id)
        //{
        //    using (DBDeliveries2Entities db = new DBDeliveries2Entities())
        //    {
        //        var wp = db.WaitingPackages.Where(d => d.packageId == id).ToList();

        //        List<Drive> ld = new List<Drive>();
        //        if(wp!=null)
        //        foreach (var item in wp)
        //        {
        //            ld.Add(db.Drives.FirstOrDefault(d => item.driveId == d.driveCode));
        //        }

        //        return ld;
        //    }
        //}

        //public static List<Drive> GetDrivesByDate(DateTime? fromDate, DateTime? toDate, TimeSpan? time)
        //{
        //    var drives = new List<Drive>();
        //    TimeSpan toT = new TimeSpan();
        //    TimeSpan fromT = new TimeSpan();
        //    if (time.HasValue)
        //    {
        //        TimeSpan timeSpan = time.Value;
        //        toT = timeSpan.Add(new TimeSpan(1, 0, 0));
        //        fromT = timeSpan.Add(new TimeSpan(-1, 0, 0));
        //    }

        //    using (DBDeliveries2Entities db = new DBDeliveries2Entities())
        //    {
        //        if (fromDate != null && toDate != null)
        //        {
        //            if (time != null)
        //                drives = db.Drives.Where(d => d.travelDate >= fromDate && d.travelDate < toDate && (d.drivingTime >= fromT && d.drivingTime <= toT)).OrderBy(d1 => d1.travelDate).ToList();
        //            else
        //                drives = db.Drives.Where(d => d.travelDate >= fromDate && d.travelDate < toDate).OrderBy(d1 => d1.travelDate).ToList();
        //        }
        //        else if (fromDate != null && toDate == null)
        //        {
        //            if (time != null)
        //                drives = db.Drives.Where(d => d.travelDate >= fromDate && (d.drivingTime >= fromT && d.drivingTime <= toT)).OrderBy(d1 => d1.travelDate).ToList();
        //            else
        //                drives = db.Drives.Where(d => d.travelDate >= fromDate).OrderBy(d1 => d1.travelDate).ToList();
        //        }
        //        else
        //        {
        //            if (time != null)
        //                drives = db.Drives.Where(d => d.travelDate >= today && d.travelDate < toDate && (d.drivingTime >= fromT && d.drivingTime <= toT)).OrderBy(d1 => d1.travelDate).ToList();
        //            else
        //                drives = db.Drives.Where(d => d.travelDate >= today && d.travelDate < toDate).OrderBy(d1 => d1.travelDate).ToList();
        //        }
        //        return drives;
        //    }
        //}

    }
}
