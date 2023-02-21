import axios from "axios";

const API_URL = "https://kind-tuna-tweed-jacket.cyclic.app/api/v1/recipe/";

//create recipe
const createRecipe = async (recipeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, recipeData, config);

  return response.data;
};

//get all recipes in database
const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

//get recipes created by user
const getRecipe = async (UserId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + UserId, config);

  return response.data;
};

//get one recipe
const getOne = async (recipeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    API_URL + "singlerecipe/" + recipeId,
    config
  );

  return response.data;
};

//update recipe
const updateRecipe = async (recipeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + recipeId, config);

  return response.data;
};

//delete recipe
const deleteRecipe = async (recipeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + recipeId, config);

  return response.data;
};

const recipeService = {
  createRecipe,
  getRecipe,
  getOne,
  updateRecipe,
  deleteRecipe,
  getAll,
};

export default recipeService;
