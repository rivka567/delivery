using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
   public  class WaitingMessageDTO
    {
      
        public int id { get; set; }
        public int packageId { get; set; }
        public int driveId { get; set; }
        public bool status { get; set; }
        public Nullable<int> totalPrice { get; set; }
    }
}
