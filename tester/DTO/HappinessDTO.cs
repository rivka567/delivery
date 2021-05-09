using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class HappinessDTO
    {
        public int id { get; set; }
        public string deliveryId { get; set; }
        public string customerName { get; set; }
        public DateTime date { get; set; }
        public int happinessLevel { get; set; }
        public string describeHappiness { get; set; }
    }
}
