import SideNav from "../components/SideNav";
import { FaMortarPestle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { reset } from "../features/auth/authSlice";
import { createRecipe } from "../features/recipe/recipeSlice";
import Spinner from "../components/Spinner";

const CreateRecipe = () => {
  const [formData, setFormData] = useState({
    recipe_img: "",
    recipe_name: "",
    description: "",
    prep_time: "",
    cook_time: "",
    servings: "",
    instructions: "",
    ingredients: "",
    tools: "",
  });

  const [errors, setErrors] = useState("");

  const {
    recipe_img,
    recipe_name,
    description,
    prep_time,
    cook_time,
    servings,
    instructions,
    ingredients,
    tools,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { recipe, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.recipe
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    if (isSuccess) {
      toast.success("Recipe created");
    }

    dispatch(reset());
  }, [user, recipe, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    let imageError = "";
    let nameError = "";
    let descriptionError = "";
    let prepError = "";
    let cookError = "";
    let serveError = "";
    let instructionError = "";
    let ingredientError = "";
    let toolsError = "";

    if (!formData.recipe_img) {
      imageError = "This feild is required";
    }

    if (!formData.recipe_name) {
      nameError = "This feild is required";
    }

    if (!formData.description) {
      descriptionError = "This feild is required";
    }

    if (!formData.prep_time) {
      prepError = "This feild is required";
    }

    if (!formData.cook_time) {
      cookError = "This feild is required";
    }

    if (!formData.servings) {
      serveError = "This feild is required";
    }

    if (!formData.instructions) {
      instructionError = "This feild is required";
    }

    if (!formData.ingredients) {
      ingredientError = "This feild is required";
    }

    if (!formData.tools) {
      toolsError = "This feild is required";
    }

    if (
      imageError ||
      nameError ||
      descriptionError ||
      prepError ||
      cookError ||
      serveError ||
      instructionError ||
      ingredientError ||
      toolsError
    ) {
      setErrors({
        imageError,
        nameError,
        descriptionError,
        prepError,
        cookError,
        serveError,
        instructionError,
        ingredientError,
        toolsError,
      });
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      console.log(errors);
    }

    const recipeData = {
      recipe_img,
      recipe_name,
      description,
      prep_time,
      cook_time,
      servings,
      instructions,
      ingredients,
      tools,
    };

    dispatch(createRecipe(recipeData));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        resolve(e.target.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      fileReader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const base64 = await convertToBase64(file);
    setFormData({ ...formData, recipe_img: base64 });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="relative block text-gray-600">
      <SideNav />
      <div className="flex justify-end p-10 font-extrabold text-yellow-600 text-2xl">
        <FaMortarPestle /> YUMMY
      </div>
      <div className="ml-64 p-10">
        <h2 className="text-gray-700 text-6xl font-bold leading-none tracking-wider">
          Create your recipe
        </h2>
      </div>
      <form onSubmit={onSubmit}>
        <div className="ml-64 p-10 flex gap-x-5 w-2/3">
          <div className="w-30">
            <label htmlFor="recipe_img" className="label">
              Upload recipe image
            </label>
            <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-4 border-yellow-300 p-6 transition-all hover:border-yellow-600">
              <div className="space-y-1 text-center">
                <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </div>
                <div className="text-gray-600">
                  <a
                    href="#"
                    className="font-medium text-primary-500 hover:text-primary-700"
                  >
                    Click to upload
                  </a>{" "}
                  or drag and drop
                </div>
                <p className="text-sm text-gray-500">
                  SVG, PNG, JPG, JPEG or GIF (max. 1mb)
                </p>
              </div>
              <input
                id="recipe_img"
                type="file"
                className="sr-only"
                name="recipe_img"
                value=""
                accept=".jpeg, .jpg , .png, .svg"
                onChange={handleFileChange}
              />
            </label>
            <p className="danger">{errors.imageError}</p>
          </div>
          <div>
            <label htmlFor="recipe_name" className="label">
              Recipe name
            </label>
            <input
              type="text"
              className="input"
              id="recipe_name"
              name="recipe_name"
              value={recipe_name}
              onChange={onChange}
            />
            <p className="danger">{errors.nameError}</p>
          </div>
        </div>
        <div className="ml-64 p-10 flex gap-x-5 w-1/2 pt-0">
          <div className="w-full">
            <label htmlFor="description" className="label">
              Description
            </label>
            <textarea
              className="textarea"
              rows="5"
              cols="40"
              placeholder="Enter a description..."
              id="description"
              name="description"
              value={description}
              onChange={onChange}
            ></textarea>
            <p className="danger">{errors.descriptionError}</p>
          </div>
        </div>
        <div className="ml-64 p-10 flex gap-x-5 w-1/2 pt-0">
          <div>
            <label htmlFor="prep_time" className="label">
              Prep time(MIN)
            </label>
            <input
              type="number"
              className="input"
              id="prep_time"
              name="prep_time"
              value={prep_time}
              onChange={onChange}
            />
            <p className="danger">{errors.prepError}</p>
          </div>
          <div>
            <label htmlFor="cook_time" className="label">
              Cook time(MIN)
            </label>
            <input
              type="number"
              className="input"
              id="cook_time"
              name="cook_time"
              value={cook_time}
              onChange={onChange}
            />
            <p className="danger">{errors.cookError}</p>
          </div>
          <div>
            <label htmlFor="servings" className="label">
              Serving(PEOPLE)
            </label>
            <input
              type="number"
              className="input"
              id="servings"
              name="servings"
              value={servings}
              onChange={onChange}
            />
            <p className="danger">{errors.serveError}</p>
          </div>
        </div>
        <div className="ml-64 p-10 block w-1/2 pt-0">
          <div className="mb-5">
            <label htmlFor="instructions" className="label">
              Instructions
            </label>
            <textarea
              cols="50"
              rows="7"
              className="textarea"
              id="instructions"
              name="instructions"
              value={instructions}
              placeholder="Enter instructions......."
              onChange={onChange}
            ></textarea>
            <p className="danger">{errors.instructionError}</p>
          </div>
          <div className="mb-5">
            <label htmlFor="ingredients" className="label">
              Ingredients
            </label>
            <textarea
              cols="50"
              rows="7"
              className="textarea"
              id="ingredients"
              name="ingredients"
              value={ingredients}
              placeholder="Enter ingredients....."
              onChange={onChange}
            ></textarea>
            <p className="danger">{errors.ingredientError}</p>
          </div>
          <div className="mb-5">
            <label htmlFor="tools" className="label">
              Tools
            </label>
            <textarea
              cols="50"
              rows="7"
              className="textarea"
              id="tools"
              name="tools"
              value={tools}
              placeholder="Enter recipe tools...."
              onChange={onChange}
            ></textarea>
            <p className="danger">{errors.toolsError}</p>
          </div>
          <div>
            <button type="submit" className="button">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
