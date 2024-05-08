using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineMedicalStore.Data
{
    [Table("medicineInfo", Schema = "public")]
    public class MedicineInfo
    {
        [Key]
        public int MedicineID { get;  set;}
        public required string MedicineName { get; set; }
        public int MedicineCount { get; set; }
        public int MedicinePrice { get; set; }
        public DateTime MedicineExpiryDate { get; set; }
    }
}