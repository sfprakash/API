using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementAPI.Data
{
    [Table("userDetails", Schema = "public")]
    public class UserDetails
    {
        [Key]
        public int UserID { get; set; }
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public required string Gender { get; set; }
        public required string Department { get; set; }
        public required string MobileNumber { get; set; }
        public required string MailID { get; set; }
        public int WalletBalance { get; set; }
    }
}