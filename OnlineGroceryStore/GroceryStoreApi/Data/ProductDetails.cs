using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryStoreApi.Data
{
    [Table("productDetails", Schema = "public")]
    public class ProductDetails
    {
        [Key]
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public int ProductQuantity { get; set; }
        public int UnitPrice { get; set; }
        public DateTime PurchaseDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string[] ProductImage { get; set; }
    }
}