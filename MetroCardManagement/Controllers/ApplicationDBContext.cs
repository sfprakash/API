using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MetroCardManagement.Data;

namespace MetroCardManagement.Controllers
{
    public class ApplicationDBContext: DbContext, IDisposable
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public DbSet<UserDetails> users {get; set;}
        public DbSet<TravelDetails> travels {get; set;}
        public DbSet<TicketFairDetails> tickets {get; set;}

    }
}