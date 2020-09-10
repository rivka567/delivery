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
        public string userCode { get; set; }
        public System.TimeSpan drivingTime { get; set; }
        public System.DateTime travelDate { get; set; }
        public string fromLocation { get; set; }
        public string toLocation { get; set; }
        public string readinessForChanges { get; set; }
        public int packageSizeCode { get; set; }
        public Nullable<System.TimeSpan> howLongBeforeReminder { get; set; }
        public string transportation { get; set; }
    }
}
