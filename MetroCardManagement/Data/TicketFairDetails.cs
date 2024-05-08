using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MetroCardManagement.Data
{
    [Table("ticketFairDetails", Schema = "public")]
    public class TicketFairDetails
    {
        [Key]
        public int TicketID { get; set; }
        public required string FromLocation { get; set; }
        public required string ToLocation { get; set; }
        public double TicketPrice { get; set; }
    }
}