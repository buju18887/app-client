import SideNav from "../components/SideNav";
import { reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { FaMortarPestle } from "react-icons/fa";
import { getOne } from "../features/recipe/recipeSlice";
import SingleRecipeItem from "../components/SingleRecipeItem";
import Spinner from "../components/Spinner";

const SingleRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, message } = useSelector((state) => state.auth);
  const { recipe, isLoading } = useSelector((state) => state.recipe);
  const { id } = useParams();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getOne(id));
    console.log(id);

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, navigate, user, id]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="text-gray-600 relative flex">
      <SideNav />
      <div className="w-full ml-64 pl-8">
        <div className="flex justify-end p-10 font-extrabold text-yellow-600 text-2xl">
          <FaMortarPestle /> YUMMY
        </div>
        {recipe ? (
          <SingleRecipeItem key={id} recipe={recipe} />
        ) : (
          <h3 className="text-yellow-500 text-lg">Recipe not available</h3>
        )}
      </div>
    </div>
  );
};

export default SingleRecipe;
