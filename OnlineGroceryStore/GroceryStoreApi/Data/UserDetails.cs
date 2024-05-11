using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryStoreApi.Data
{
    [Table("userDetails", Schema = "public")]
    public class UserDetails
    {
        [Key]
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string UserEmail { get; set; }
        public string UserPhone { get; set; }
        public string[] UserImage { get; set; }
        public int Balance { get; set; }
    }
}