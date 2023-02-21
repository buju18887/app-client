import { FaClock } from "react-icons/fa";

function HomePageRecipeItem({ recipe }) {
  return (
    <div className="card">
      <a href={`/singlerecipe/${recipe._id}`}>
        <img
          src={recipe.recipe_img}
          className="h-56 object-cover w-full"
          alt={recipe.recipe_name}
        />
      </a>
      <div className="m-2">
        <div>
          <span className="font-bold text-lg">{recipe.recipe_name}</span>
          <span className="block text-gray-500 text-sm">Recipe by user</span>
        </div>
      </div>
      <div className="badge">
        <FaClock /> {recipe.cook_time} MIN
      </div>
    </div>
  );
}

export default HomePageRecipeItem;
