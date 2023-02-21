import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/auth/authSlice";
import {
  FaInstagram,
  FaMortarPestle,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  });

  return (
    <>
      <div className=" h-full">
        <div className="w-1/2 absolute left-0 p-4">
          <div className="flex text-yellow-600 text-xl mt-5 pl-4 font-extrabold">
            <FaMortarPestle />
            YUMMY
          </div>
          <div className="mt-32">
            <h1 className="text-teal-700 text-4xl font-extrabold animate-bounce an">
              Find Your Next Favorite Meal: Yummy Recipes!
            </h1>
            <p className="text-teal-600 py-10 pl-0 pr-20 font-medium text-xl">
              Discover handcrafted recipes for every taste, from classic to
              contemporary. Join our foodie haven for a delightful meal-making
              experience.Let's create memorable meals together in the kitchen.
            </p>
            <div className="flex justify-start gap-x-5">
              <a href="/signup" className="btn">
                SIGNUP
              </a>
              <a href="/login" className="btn">
                LOGIN
              </a>
            </div>
            <div className="flex justify-start mt-10 ml-1 gap-x-8">
              <div className="card">
                <img
                  src="/idk.jpeg"
                  alt="idk"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="card">
                <img
                  src="/fries.jpeg"
                  alt="idk"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" absolute w-1/2 right-0">
          <img src="/homepageimg.png" alt="" />
          <div className="absolute top-0 right-0 text-secondary-100 flex justify-end text-2xl mt-5 mr-5 p-4 gap-x-5">
            <FaTwitter />
            <FaYoutube />
            <FaInstagram />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
