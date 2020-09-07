using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.converters
{
    class UserConverter
    {
        public static DTO.UserDTO convertToUserDTO(DAL.User user)
        {
            if (user == null)
                return null;
            DTO.UserDTO newuser = new DTO.UserDTO()
            {
                userCode = user.userCode,
                userName = user.userName,
                userPhone = user.userPhone,
                userMail=user.userMail
            };
            return newuser;
        }
        public static List<DTO.UserDTO> convertToUserDTOList(List<DAL.User> users)
        {
            List<DTO.UserDTO> listuser = new List<DTO.UserDTO>();
            users.ForEach(lp => listuser.Add(convertToUserDTO(lp)));
            return listuser;
        }
    }
}
