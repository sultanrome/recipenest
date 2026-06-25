using Microsoft.EntityFrameworkCore;
using RecipeNestAPI.Models;

namespace RecipeNestAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Chef> Chefs { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
    }
}