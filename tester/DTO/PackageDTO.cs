using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
   public class PackageDTO
    {
        public int packageCode { get; set; }
        public string userCustomerCode { get; set; }
        public string userDeliveryCode { get; set; }
        public string fromLocation { get; set; }
        public string toLocation { get; set; }
        public System.DateTime travelDate { get; set; }
        public System.TimeSpan drivingTime { get; set; }
        public string redinessForChanges { get; set; }
        public bool confirmationDelivery { get; set; }
        public Nullable<System.TimeSpan> watingTimeForConfirmation { get; set; }
        public int happinesslevel { get; set; }
        public string describeHappiness { get; set; }
        public int packageType { get; set; }
        public string describePackage { get; set; }
        public int packageSize { get; set; }
    }
}
