using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudReactWebAPiE.Models
{
    public class Response
    {

        public string ResponseCode { get; set; }

        public string ResponseMessage { get; set; }

        public Student student { get; set; }

        public List<Student> lstStudents { get; set; }





    }
}