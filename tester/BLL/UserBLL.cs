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
            var d = UserDAL.GetUserById(id);
            return UserConverter.convertToUserDTO(d);

        }

        public static List<DTO.UserDTO> GetAllUsers()
        {
            var d = UserDAL.GetAllUsers();
            return UserConverter.convertToUserDTOList(d);

        }

        public static string AddUser(User user)
        { 
            return UserDAL.AddUser(user); ;

        }

        public static string SendEmail(string sender,string contactAddress, string subject, string body)
        {
            return UserDAL.SendEmail(sender, contactAddress, subject, body);
        }

    }
}
