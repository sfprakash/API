using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MetroCardManagement.Data
{
    [Table("userDetails", Schema = "public")]
    public class UserDetails
    {
        [Key]
        public int CardNumber { get; set; }
        public required string UserName { get; set; }
        public required  string PhoneNumber { get; set; }
        public required string Password { get; set; }
        public int Balance { get; set; }
    }
}