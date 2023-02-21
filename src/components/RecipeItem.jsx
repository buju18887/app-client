import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, getOne } from "../features/recipe/recipeSlice";
import { FaClock } from "react-icons/fa";

function RecipeItem({ recipe }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onClick = () => {
    dispatch(deleteRecipe(recipe._id));
  };

  return (
    <div className="card">
      <a href={`/singlerecipe/${recipe._id}`}>
        <img
          src={recipe.recipe_img}
          className="h-56 object-cover w-full"
          alt={recipe.recipe_name}
        />
      </a>
      <div className="m-2 flex justify-between">
        <div>
          <span className="font-bold text-lg">{recipe.recipe_name}</span>
          <span className="block text-gray-500 text-sm">
            Recipe by {user.name}
          </span>
        </div>
        <div>
          <button
            className="text-red-700 font-extrabold cursor-pointer"
            onClick={onClick}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="badge">
        <FaClock /> {recipe.cook_time} MIN
      </div>
    </div>
  );
}

export default RecipeItem;
