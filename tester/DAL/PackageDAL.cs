using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace DAL
{
    public class PackageDAL
    {
         DateTime today = DateTime.Now.Date;

        public static Package AddPackage(Package package)
        {
            try {
            using (DBDeliveries2Entities db = new DBDeliveries2Entities())
            {
                DateTime d=package.fromDate.AddDays(1);
                    package.fromDate = d;
                  d= package.toDate.AddDays(1);
                    package.toDate = d;
                    db.Packages.Add(package);
                db.SaveChanges();
                if (GetPackageById(package.packageCode)!=null)
                    return GetPackageById(package.packageCode);
                    return null;
            }
            }
            catch (Exception e)
            {
                return null;
            }

        }

        public static bool ChangeStatus(int idP,bool status)
        {
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    var p = db.Packages.FirstOrDefault(p1 => p1.packageCode == idP).status = status;
                    db.SaveChanges();
                  var p2=GetPackageById(idP);
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public static string DeletePackage(int id)
        {
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    string idUser = db.Packages.FirstOrDefault(p => p.packageCode == id).userCustomerCode;
                    db.Packages.Remove(db.Packages.FirstOrDefault(p => p.packageCode == id));
                    db.SaveChanges();
                    return idUser;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public static Package GetPackageById(int id)
        {
            try {
            using (DBDeliveries2Entities db = new DBDeliveries2Entities())
            {
                db.Configuration.LazyLoadingEnabled = false;

                return db.Packages.FirstOrDefault(p => p.packageCode.Equals(id));
            }
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public static List<Package> GetPackagesByUserId(string id)
        {
            DateTime today = DateTime.Now.Date;

            try
            { 
            using (DBDeliveries2Entities db = new DBDeliveries2Entities())
            {
                db.Configuration.LazyLoadingEnabled = false;
               // return db.Packages.Where(p => p.userCustomerCode.Equals(id)&&p.travelDate>=today).OrderBy(p1=>p1.travelDate).ToList();
                    return db.Packages.Where(p => p.userCustomerCode.Equals(id)).ToList();
                }
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public static List<Package> GetAllPackages()
        {
            DateTime today = DateTime.Now.Date;

            try
            { 
            using (DBDeliveries2Entities db = new DBDeliveries2Entities())
            {
                db.Configuration.LazyLoadingEnabled = false;
               // var q = db.Packages.Where(p=>p.travelDate>=today&&p.status==true).OrderBy(p1=>p1.travelDate).ToList();
                var q = db.Packages.Where(p =>p.toDate>=today&&  p.status == true).OrderBy(p1=>p1.fromDate).ToList();
                    return q;
            }
            }
            catch (Exception e)
            { return null;
            }
        }


     public static Package  UpdatePackage(Package p)
        {
            try {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                   DateTime d= p.fromDate.AddDays(1);
                    p.fromDate = d;
                   d= p.toDate.AddDays(1);
                    p.toDate = d;
                    db.Packages.Attach(p);
                    db.Entry(p).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                   return GetPackageById(p.packageCode);
                  
                }
            }
            catch(Exception e)
            {
                return null;
            }

        }
        //public static List<Package> GetPackagesByDrive(int id)
        //{
        //    try
        //    {
        //        using (DBDeliveries2Entities db = new DBDeliveries2Entities())
        //    {
        //        var wp = db.WaitingPackages.Where(d => d.driveId == id).ToList();

        //        List<Package> ld = new List<Package>();
        //        if (wp != null)
        //            foreach (var item in wp)
        //            {
        //                ld.Add(db.Packages.FirstOrDefault(d => item.packageId == d.packageCode));
        //            }

        //        return ld;

        //    }         
        //    }
        //    catch(Exception e)
        //    {
        //        return null;
        //    }
        //}

    }
}
