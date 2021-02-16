using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DriveDTO
    { 

        public int driveCode { get; set; }
        public string driverCode { get; set; }
        public string customerCode { get; set; }
        public System.TimeSpan drivingTime { get; set; }
        public System.DateTime travelDate { get; set; }
        //public int fromLocation { get; set; }
        //public int toLocation { get; set; }
        public string fromLocationFormat { get; set; }
        public double? fromLocationLat { get; set; }
        public double? fromLocationLng { get; set; }
        public string toLocationFormat { get; set; }
        public double? toLocationLat { get; set; }
        public double? toLocationLng { get; set; }
        public int packageSizeCode { get; set; }
        public Nullable<System.TimeSpan> howLongBeforeReminder { get; set; }
        public string transportation { get; set; }
        public string describeDrive { get; set; }
        public bool confirmationCustomer { get; set; }
    }
}
