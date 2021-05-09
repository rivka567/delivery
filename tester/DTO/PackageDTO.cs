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
        public int fromLocationId { get; set; }
        public int toLocationId { get; set; }
        public string fromLocationFormat { get; set; }
        public double? fromLocationLat { get; set; }
        public double? fromLocationLng { get; set; }
        public string toLocationFormat { get; set; }
        public double? toLocationLat { get; set; }
        public double? toLocationLng { get; set; }
        public System.DateTime fromDate { get; set; }
        public System.DateTime toDate { get; set; }
        public System.TimeSpan fromTime { get; set; }
        public System.TimeSpan toTime { get; set; }
        public bool status { get; set; }
        public int packageTypeCode { get; set; }
        public string packageType { get; set; }
        public string describePackage { get; set; }
        public int packageSizeCode { get; set; }
        public string packageSize { get; set; }
        public DateTime timeInDate { get; set; }
        public List<DriveDTO> listWaiting { get; set; }
        public string customerName { get; set; }
        public bool message { get; set; }
        public Nullable<double> distance { get; set; }
        public Nullable<int> totalPrice { get; set; }

    }
}
