import { useEffect, useState } from "react";

function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const apiUrl = "http://localhost:5269/api/Recipe";

  const fetchRecipes = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setRecipes(data);
      setFilteredRecipes(data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load recipes");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    const result = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRecipes(result);
  }, [search, recipes]);

  const clearForm = () => {
    setName("");
    setCategory("");
    setDescription("");
    setEditId(null);
  };

  const addRecipe = async () => {
    if (!name || !category || !description) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          category,
          description,
          chefName: "Chef Sultan"
        })
      });

      if (response.ok) {
        clearForm();
        setMessage("Recipe added successfully");
        fetchRecipes();
      } else {
        setMessage("Failed to add recipe");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setMessage("Recipe deleted successfully");
        fetchRecipes();
      } else {
        setMessage("Failed to delete recipe");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const editRecipe = (recipe) => {
    setEditId(recipe.id);
    setName(recipe.name);
    setCategory(recipe.category);
    setDescription(recipe.description);
    setMessage("Editing recipe");
  };

  const updateRecipe = async () => {
    if (!name || !category || !description) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: editId,
          name,
          category,
          description,
          chefName: "Chef Sultan"
        })
      });

      if (response.ok) {
        clearForm();
        setMessage("Recipe updated successfully");
        fetchRecipes();
      } else {
        setMessage("Failed to update recipe");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  return (
    <div className="container">
      <h1>Chef Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Total Recipes</h3>
          <p>{recipes.length}</p>
        </div>

        <div className="card">
          <h3>Followers</h3>
          <p>245</p>
        </div>

        <div className="card">
          <h3>Rating</h3>
          <p>4.9 ⭐</p>
        </div>
      </div>

      <div className="card" style={{ margin: "30px auto", maxWidth: "450px" }}>
        <input
          type="text"
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {editId === null ? (
          <button className="btn" onClick={addRecipe}>Add Recipe</button>
        ) : (
          <button className="btn" onClick={updateRecipe}>Update Recipe</button>
        )}

        <p>{message}</p>
      </div>

      <div className="card" style={{ margin: "20px auto", maxWidth: "450px" }}>
        <input
          type="text"
          placeholder="Search by recipe or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h2>My Recipes</h2>

      <div className="cards">
        {filteredRecipes.map((recipe) => (
          <div className="card" key={recipe.id}>
            <h3>{recipe.name}</h3>
            <p><strong>Category:</strong> {recipe.category}</p>
            <p><strong>Description:</strong> {recipe.description}</p>
            <p><strong>Chef:</strong> {recipe.chefName}</p>

            <button
              className="btn"
              onClick={() => editRecipe(recipe)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>

            <button
              className="btn"
              onClick={() => deleteRecipe(recipe.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;