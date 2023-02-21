import { FaClock, FaUser } from "react-icons/fa";

const SingleRecipeItem = ({ recipe }) => {
  return (
    <div>
      <div className="">
        <h2 className="text-gray-700 text-5xl font-bold leading-none tracking-wider">
          {recipe.recipe_name}
        </h2>
      </div>
      <div className="flex mt-10 gap-x-8">
        <div className="card w-1/3 h-full">
          <img
            src={recipe.recipe_img}
            alt=""
            className="h-80 object-cover w-full"
          />
        </div>
        <div className="w-1/2">
          <h1 className="font-bold text-2xl text-gray-700">Description</h1>
          <p className="text-lg">{recipe.description}</p>
          <div className="flex justify-between pt-6">
            <div>
              <FaClock />
              <h3 className="font-bold text-gray-700">Prep time</h3>
              <p>{recipe.prep_time} min.</p>
            </div>
            <div>
              <FaClock />
              <h3 className="font-bold text-gray-700">Cook time</h3>
              <p>{recipe.cook_time} min.</p>
            </div>
            <div>
              <FaUser />
              <h3 className="font-bold text-gray-700">Serving</h3>
              <p>{recipe.servings} people</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 mt-8">
        <h1 className="font-bold text-2xl text-gray-700">Instructions</h1>
        <div className="text-lg">{recipe.instructions}</div>
      </div>
      <div className="w-1/2 mt-8">
        <h1 className="font-bold text-2xl text-gray-700">Ingredients</h1>
        <div className="text-lg">{recipe.ingredients}</div>
      </div>
      <div className="w-1/2 mt-8 pb-6">
        <h1 className="font-bold text-2xl text-gray-700">Tools</h1>
        <div className="text-lg">{recipe.tools}</div>
      </div>
    </div>
  );
};

export default SingleRecipeItem;
