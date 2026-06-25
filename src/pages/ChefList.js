function ChefList() {
  return (
    <div className="container">

      <h1>Our Professional Chefs</h1>

      <div className="cards">

        <div className="card">
          <h3>👨‍🍳 Chef Sultan</h3>
          <p>Expert in grilled dishes, BBQ meals and spicy cuisine.</p>
          <button className="btn">View Profile</button>
        </div>

        <div className="card">
          <h3>🍰 Chef Musa</h3>
          <p>Specialist in desserts, cakes and bakery creations.</p>
          <button className="btn">View Profile</button>
        </div>

        <div className="card">
          <h3>🍛 Chef Abdullah</h3>
          <p>Traditional recipes expert with authentic family meals.</p>
          <button className="btn">View Profile</button>
        </div>

      </div>

    </div>
  );
}

export default ChefList;