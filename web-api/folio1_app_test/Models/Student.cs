using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace folio1_app_test.Models
{
    public class Student
    {
        public int id { get; set; }        
        public string fname { get; set; }
        public string lname { get; set; }
        public int age { get; set; }
        public double gpa { get; set; }
        public int folioClassId { get; set; }
    }
}
