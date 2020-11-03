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
        //public int fromLocation { get; set; }
        //public int toLocation { get; set; }
        public string fromLocatioFormat { get; set; }
        public double? fromLocatioLat { get; set; }
        public double? fromLocatioLng { get; set; }
        public string toLocatioFormat { get; set; }
        public double? toLocatioLat { get; set; }
        public double? toLocationLng { get; set; }
        public System.DateTime travelDate { get; set; }
        public System.TimeSpan drivingTime { get; set; }
        public bool confirmationDelivery { get; set; }
        public int happinesslevel { get; set; }
        public string describeHappiness { get; set; }
        public int packageType { get; set; }
        public string describePackage { get; set; }
        public int packageSize { get; set; }

    }
}
