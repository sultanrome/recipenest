using Microsoft.EntityFrameworkCore;
using RecipeNestAPI.Data;
using RecipeNestAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS (allow React)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

// CORS
app.UseCors("AllowAll");

// IMPORTANT: disable HTTPS redirect for now
// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


// ✅ SEED DEFAULT CHEF USER
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // Make sure DB is created
    db.Database.EnsureCreated();

    // Add default user if none exists
    if (!db.Chefs.Any())
    {
        db.Chefs.Add(new Chef
        {
            Username = "chef",
            Password = "1234",
            FullName = "Chef Sultan"
        });

        db.SaveChanges();
    }
}

app.Run();