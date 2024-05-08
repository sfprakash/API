using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineMedicalStore.Data
{
    [Table("user", Schema = "public")]
    public class User
    {
        [Key]
        public int UserID { get; set;}
        public required string UserEmail { get; set; }
        public required string UserPassword { get; set; }
        public required string UserPhone { get; set; }
        public double WalletBalance { get; set; }

        

    }
}