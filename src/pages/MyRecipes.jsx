import SideNav from "../components/SideNav";
import { FaMortarPestle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { reset } from "../features/auth/authSlice";
import { getRecipe } from "../features/recipe/recipeSlice";
import RecipeItem from "../components/RecipeItem";
import Spinner from "../components/Spinner";

const MyRecipes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, message } = useSelector((state) => state.auth);
  const { recipe, isLoading } = useSelector((state) => state.recipe);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getRecipe(user._id));

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="relative flex text-gray-600">
      <SideNav />
      <div className="w-full ml-64">
        <div className="flex justify-end p-10 font-extrabold text-yellow-600 text-2xl">
          <FaMortarPestle /> YUMMY
        </div>
        <div className="pl-8">
          <header className="mt-4">
            <h2 className="text-gray-700 text-6xl font-bold leading-none tracking-wider">
              My Recipes
            </h2>
            <h3 className="text-2xl font-semibold tracking-wider mt-1">
              Created by you
            </h3>
          </header>

          <div>
            <h4 className="font-bold pb-2 mt-12 border-b border-gray-300 text-yellow-500">
              Latest Recipes
            </h4>
          </div>
        </div>
        <div className="grid px-8 mt-8 lg:grid-cols-3 gap-10">
          {recipe ? (
            <>
              {recipe.map((recipe) => (
                <RecipeItem key={recipe._id} recipe={recipe} />
              ))}
            </>
          ) : (
            <h3 className="text-yellow-500 text-lg">
              You do not have any recipes
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRecipes;
