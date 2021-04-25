using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace folio1_app_test.Helpers.DB
{
    public class FolioClassDB
    {
        //[Required]
        public int id { get; set; }

        [Required(ErrorMessage = "Teacher Last Name is required")]
        [StringLength(60, ErrorMessage = "Teacher Name can't be longer than 60 characters")]
        public string lname { get; set; }
      

        [Required(ErrorMessage = "Name is required")]
        [StringLength(60, ErrorMessage = "Name can't be longer than 60 characters")]
        public string cname { get; set; }

        [Required(ErrorMessage = "Location is required")]
        [StringLength(100, ErrorMessage = "Location can't be longer than 100 characters")]
        public string location { get; set; }

        [Required(ErrorMessage = "Teacher Name is required")]
        [StringLength(60, ErrorMessage = "Teacher Name can't be longer than 60 characters")]
        public string fname { get; set; }

        [Required(ErrorMessage = "Teacher Name is required")]
        public string sal { get; set; }
    }
}
