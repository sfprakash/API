using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GroceryStoreApi.Data;

namespace GroceryStoreApi.Controllers
{
    public class ApplicationDBContext: DbContext, IDisposable
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public DbSet<UserDetails> users {get; set;}
        public DbSet<ProductDetails> products {get; set;}
        public DbSet<OrderDetails> orders {get; set;}
    }
}