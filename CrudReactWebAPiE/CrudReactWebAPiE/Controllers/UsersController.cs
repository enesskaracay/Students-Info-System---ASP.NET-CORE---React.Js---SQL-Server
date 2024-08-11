using CrudReactWebAPiE.Models;
using System;
using System.Linq;
using System.Web.Http;

namespace CrudReactWebAPiE.Controllers
{
    public class UsersController : ApiController
    {
        StudenstDbEntities2 db = new StudenstDbEntities2(); 

        [Route("api/Users/Login")]
        [HttpPost]
        public Response Login(UsersModel userModel)
        {
            Response response = new Response();

            try
            {
                Users user = db.Users.FirstOrDefault(u => u.mail == userModel.mail && u.password == userModel.password);

                if (user != null)
                {
                    // Başarılı giriş durumu
                    response.ResponseCode = "200";
                    response.ResponseMessage = "Login successful";
                    user.mail = userModel.mail; 
                    user.password = userModel.password;
                }
                else
                {
                    // Hatalı giriş durumu
                    response.ResponseCode = "401";
                    response.ResponseMessage = "Invalid email or password";
                }
            }
            catch (Exception ex)
            {
                response.ResponseCode = "500";
                response.ResponseMessage = "An error occurred: " + ex.Message;
            }

            return response;
        }
    }
}
