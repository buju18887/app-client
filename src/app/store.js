import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import recipeReducer from "../features/recipe/recipeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    recipe: recipeReducer,
  },
});

export default store;
