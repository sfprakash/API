using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MetroCardManagement.Data
{
    [Table("travelDetails", Schema = "public")]
    public class TravelDetails
    {
        [Key]
        public int TravelID { get; set; }
        public int CardNumber { get; set; }
        public required string FromLocation { get; set; }
        public required string ToLocation { get; set; }
        public DateTime Date {get; set;}
        public double TravelCost { get; set; }
    }
}