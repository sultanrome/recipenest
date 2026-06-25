using Microsoft.AspNetCore.Mvc;
using RecipeNestAPI.Data;
using RecipeNestAPI.Models;
using System.Linq;

namespace RecipeNestAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RecipeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetRecipes()
        {
            return Ok(_context.Recipes.ToList());
        }

        [HttpPost]
        public IActionResult AddRecipe([FromBody] Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            _context.SaveChanges();
            return Ok(recipe);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateRecipe(int id, [FromBody] Recipe updatedRecipe)
        {
            var recipe = _context.Recipes.FirstOrDefault(r => r.Id == id);

            if (recipe == null)
                return NotFound();

            recipe.Name = updatedRecipe.Name;
            recipe.Category = updatedRecipe.Category;
            recipe.Description = updatedRecipe.Description;
            recipe.ChefName = updatedRecipe.ChefName;

            _context.SaveChanges();
            return Ok(recipe);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteRecipe(int id)
        {
            var recipe = _context.Recipes.FirstOrDefault(r => r.Id == id);

            if (recipe == null)
                return NotFound();

            _context.Recipes.Remove(recipe);
            _context.SaveChanges();

            return Ok(new { message = "Recipe deleted successfully" });
        }
    }
}