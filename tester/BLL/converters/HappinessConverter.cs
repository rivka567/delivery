using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;

namespace BLL.converters
{
  public class HappinessConverter
  {
        public static HappinessDTO ConvertToHappinessDTO(Happiness h)
        {
            HappinessDTO happinessDTO = new HappinessDTO()
            {
                id = h.id,
                deliveryId = h.deliveryId,
                customerName = h.customerName,
                date=h.date,
                happinessLevel = h.happinessLevel,
                describeHappiness = h.describeHappiness
            };
            return happinessDTO;
        }

        public static List<HappinessDTO> ConvertToHappinessDTOList(List<Happiness> happinesses)
        {
            List<HappinessDTO> listHappiness = new List<HappinessDTO>();
            happinesses.ForEach(h => listHappiness.Add(ConvertToHappinessDTO(h)));
            return listHappiness;
        }


  }

}

