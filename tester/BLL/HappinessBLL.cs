using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;
using BLL.converters;

namespace BLL
{
    public class HappinessBLL
    {
      public static bool AddHappiness(Happiness happinessBLL)
        {
            return HappinessDAL.AddHappiness(happinessBLL);
        }

        public static List<HappinessDTO> GetAllHappiness()
        {
            var h= HappinessDAL.GetAllHappiness();
            return HappinessConverter.ConvertToHappinessDTOList(h);
        }

        public static List<HappinessDTO> GetHappinessByDeliveryId(string id)
        {
            var h= HappinessDAL.GetHappinessByDeliveryId(id);
            return HappinessConverter.ConvertToHappinessDTOList(h);
        }
    }
}
