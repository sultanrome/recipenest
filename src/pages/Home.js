function Home() {
  return (
    <div>

      <div className="hero">
        <h1>Welcome to RecipeNest</h1>

        <p>
          Discover talented chefs, premium recipes and culinary inspiration
          from around the world.
        </p>

        <button className="btn">Explore Chefs</button>
      </div>

      <div className="container">
        <h2>Why Choose RecipeNest?</h2>

        <div className="cards">

          <div className="card">
            <h3>👨‍🍳 Top Chefs</h3>
            <p>
              Connect with skilled chefs and discover their signature dishes.
            </p>
          </div>

          <div className="card">
            <h3>🍽 Premium Recipes</h3>
            <p>
              Browse detailed recipes with ingredients and instructions.
            </p>
          </div>

          <div className="card">
            <h3>📱 Responsive Design</h3>
            <p>
              Works perfectly on mobile, tablet and desktop devices.
            </p>
          </div>

        </div>
      </div>

      <div className="footer">
        <h3>RecipeNest © 2026</h3>
        <p>Connecting Chefs with Food Lovers</p>
      </div>

    </div>
  );
}

export default Home;