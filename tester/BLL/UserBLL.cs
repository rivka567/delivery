using BLL.converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public class UserBLL
    {
        public static DTO.UserDTO GetUserById(string id)
        {
            var d = DAL.UserDal.GetUserById(id);
            return UserConverter.convertToUserDTO(d);

        }

        public static List<DTO.UserDTO> GetAllUsers()
        {
            var d = DAL.UserDal.GetAllUsers();
            return UserConverter.convertToUserDTOList(d);

        }

        public static string AddUser(User user)
        { 
            return DAL.UserDal.AddUser(user); ;

        }

    }
}
