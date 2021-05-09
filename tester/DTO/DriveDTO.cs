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
        public int fromLocationId { get; set; }
        public int toLocationId { get; set; }
        public string fromLocationFormat { get; set; }
        public double? fromLocationLat { get; set; }
        public double? fromLocationLng { get; set; }
        public string toLocationFormat { get; set; }
        public double? toLocationLat { get; set; }
        public double? toLocationLng { get; set; }
        public string describeDrive { get; set; }
        public bool? status { get; set; }
        public int transportation { get; set; }
        public int? price { get; set; }
        public string transportationType { get; set; }
        public DateTime timeInDate { get; set; }
        public List<PackageDTO> listWaiting { get; set; }
        public string driverName { get; set; }
        public bool message { get; set; }
        public Nullable<double> distance { get; set; }
        //  IEnumerator<DriveDTO> GetEnumerator();

    }
}
