using Microsoft.EntityFrameworkCore;

namespace ChatAIBackend.Models
{
    public class DB : DbContext
    {
            public DB(DbContextOptions<DB> options) : base(options) { }

            public DbSet<Message> Messages { get; set; }
        }
}
