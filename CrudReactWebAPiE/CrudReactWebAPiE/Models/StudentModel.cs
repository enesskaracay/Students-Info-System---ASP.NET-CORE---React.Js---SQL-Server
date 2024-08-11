using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudReactWebAPiE.Models
{
    public partial class StudentModel
    {
        public string FullName { get; set; }
        public string SchoolNumber { get; set; }
        public string WhichClass { get; set; }
        public string Gender { get; set; }

        public string Type { get; set; } 
    }
}