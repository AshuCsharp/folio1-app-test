using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace folio1_app_test.Models
{
    public class FolioClass
    {
        public int id { get; set; }
        public string cname { get; set; }
        public string location { get; set; }
        public string fname { get; set; }
        public string lname { get; set; }
        public string sal { get; set; }
    }
}
