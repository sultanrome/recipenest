using Microsoft.AspNetCore.Mvc;
using RecipeNestAPI.Data;
using RecipeNestAPI.Models;
using System.Linq;

namespace RecipeNestAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Chef loginData)
        {
            var chef = _context.Chefs.FirstOrDefault(c =>
                c.Username == loginData.Username &&
                c.Password == loginData.Password);

            if (chef == null)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            return Ok(new
            {
                message = "Login successful",
                chef.FullName,
                chef.Username
            });
        }
    }
}