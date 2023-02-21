import { FaMortarPestle } from "react-icons/fa";
import SideNav from "../components/SideNav";
import { reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { getAll } from "../features/recipe/recipeSlice";
import HomePageRecipeItem from "../components/HomePageRecipeItem";

const Dashboard = () => {
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

    dispatch(getAll());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, isError, reset]);

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
              Recipes
            </h2>
            <h3 className="text-2xl font-semibold tracking-wider mt-1">
              Public
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
                <HomePageRecipeItem key={recipe._id} recipe={recipe} />
              ))}
            </>
          ) : (
            <h3 className="text-yellow-500 text-lg">You are offline!</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
