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
<<<<<<< HEAD
            var d = UserDal.GetUserById(id);
=======
            var d = UserDAL.GetUserById(id);
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01
            return UserConverter.convertToUserDTO(d);

        }

        public static List<DTO.UserDTO> GetAllUsers()
        {
<<<<<<< HEAD
            var d = UserDal.GetAllUsers();
=======
            var d = UserDAL.GetAllUsers();
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01
            return UserConverter.convertToUserDTOList(d);

        }

        public static string AddUser(User user)
        { 
<<<<<<< HEAD
            return UserDal.AddUser(user); ;
=======
            return UserDAL.AddUser(user); ;
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01

        }

        public static string SendEmail(string sender,string contactAddress, string subject, string body)
        {
<<<<<<< HEAD
            return UserDal.SendEmail(sender, contactAddress, subject, body);
=======
            return UserDAL.SendEmail(sender, contactAddress, subject, body);
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01
        }

    }
}
