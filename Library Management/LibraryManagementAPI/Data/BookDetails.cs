using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementAPI.Data
{
    [Table("bookDetails", Schema = "public")]
    public class BookDetails
    {
        [Key]
        public int BookID { get; set; }
        public required string BookName { get; set; }
        public required string AuthorName { get; set; }
        public int BookCount { get; set; }
    }
}