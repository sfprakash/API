using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryStoreApi.Data
{
    [Table("orderDetails", Schema = "public")]
    public class OrderDetails
    {
        [Key]
        public int OrderID { get; set; }
        public int UserID { get; set; }
        public int TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }
        public int[] ItemID { get; set; }
        public int[] ProductID { get; set; }
        public string[] ProductName { get; set; }
        public int[] ItemCount { get; set; }
        public int[] ItemPrice { get; set; }
    }
}