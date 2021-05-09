using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using System.Data.Entity;
namespace DAL
{
    public class WaitingMessageDAL
    {

        public static bool GetWaitingPackageByDeliveryId(int id)
        {
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    WaitingMessage w = db.WaitingMessages.FirstOrDefault(w1 => w1.driveId ==id);
                    //ז"א הנסיעה לא מקושרת יותר לשום חבילה
                    if (w == null)
                    {
                        return true;
                    }
                    //ז"א עדיין יש חבילות לנסיעה זו
                    return false;

                }

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public static bool AddWaitingMessage(WaitingMessage wp)
        {
            try
            {
                  using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    WaitingMessage w = db.WaitingMessages.FirstOrDefault(w1 => w1.driveId == wp.driveId && w1.packageId == wp.packageId);
                    if(w==null)
                    { 
                    db.WaitingMessages.Add(wp); 
                    db.SaveChanges();
                        return true;
                    }
                    return false;

                }

            }catch(Exception e)
            {
                return false;
            }
          

        }

        public static bool ChangeStatus(int idP, int idD,bool status)
        {
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    db.WaitingMessages.FirstOrDefault(w => w.packageId == idP && w.driveId == idD).status = status;
                    return true;
                }

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public static void DeleteWaitingMessageByPackageId(int id)
        {
            try
            {       
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                   // db.WaitingMessages.Remove(db.WaitingMessages.FirstOrDefault(p=>p.packageId==id));
                    foreach (var p in db.WaitingMessages.ToList())
                    {
                        if (p.packageId == id)
                        {
                            db.WaitingMessages.Remove(p);
                        }
                       
                    }
                    db.SaveChanges();
                }

            }
            catch (Exception e)
            {
             
            }
        }

        public static void DeleteWaitingMessageByDriveId(int id)
        {
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    db.WaitingMessages.Remove(db.WaitingMessages.FirstOrDefault(d => d.driveId == id));
                    foreach (var d in db.WaitingMessages.ToList())
                    {
                        if (d.driveId == id)
                        {
                            db.WaitingMessages.Remove(d);
                        }

                    }
                    db.SaveChanges();
                }

            }
            catch (Exception e)
            {

            }
        }

        public static bool DeleteWaitingMessage(int idP,int idD)
        {
            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    var wd = db.WaitingMessages.FirstOrDefault(w => w.packageId == idP && w.driveId == idD);
                    if(wd!=null)
                    { 
                    db.WaitingMessages.Remove(wd);
                        db.SaveChanges();
                        return true;
                    }
                    return false;
                }
              
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public static List<Package> GetgPackagesByDrive(int id)
        {
             DateTime today = DateTime.Now.Date;

            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    db.Configuration.LazyLoadingEnabled = false;

                    var l = db.WaitingMessages.Where(w1 => w1.driveId == id).ToList();
                    if (l == null)
                        return null;
                    List<Package> lp = new List<Package>();

                    for (int i = 0; i < l.Count(); i++)
                    {
                        var a = l[i].packageId;
                        lp.Add(db.Packages.FirstOrDefault(p => p.packageCode ==a&&p.toDate>=today));
                    }
                  
                    return lp;

                }

            }
            catch (Exception e)
            {
                return null;
            }

        

        }
        public static List<Drive> GetgDrivesByPackage(int id)
        {
            DateTime today = DateTime.Now.Date;

            try
            {
                using (DBDeliveries2Entities db = new DBDeliveries2Entities())
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    var l = db.WaitingMessages.Where(w1 => w1.packageId == id).ToList();

                    if (l == null)
                        return null;
                    List<Drive> ld = new List<Drive>();
                    for (int i = 0; i < l.Count(); i++)
                    {
                        var a = l[i].driveId;
                        ld.Add(db.Drives.FirstOrDefault(d=>d.driveCode==a&&d.travelDate>=today));
                    }
                    return ld;
                }

            }
            catch (Exception e)
            {
                return null;
            }


        }



    }

}