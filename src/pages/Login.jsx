import { useEffect, useState } from "react";
import { FaMortarPestle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error("Incorrect email or password");
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!formData.email) {
      emailError = "This field is required";
    }

    if (!formData.password) {
      passwordError = "This field is required";
    }

    if (emailError || passwordError) {
      setErrors({ emailError, passwordError });
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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <>
      <div className="mx-auto max-w-4xl bg-white p-5 rounded-lg shadow-lg shadow-secondary-200 mt-10 flex justify-end gap-x-3">
        <div className="mx-auto w-2/3 block">
          <div className="flex justify-center p-10 font-extrabold text-yellow-600 text-2xl">
            <FaMortarPestle /> YUMMY
          </div>
          <div className="block py-4 items-center">
            <h1 className="text-4xl font-bold text-yellow-500">
              Welcome back!
            </h1>
            <p className="text-yellow-400 font-semibold text-lg">
              Please login
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                className="input"
                placeholder="you@email.com"
              />
              <p className="danger">{errors.emailError}</p>
            </div>
            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                className="input"
                placeholder="Password"
              />
              <p className="danger">{errors.passwordError}</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="example3"
                className="h-4 w-4 rounded border-gray-300 text-primary-600 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
              />
              <label
                htmlFor="example3"
                className="text-sm font-medium text-gray-700"
              >
                Remember me
              </label>
            </div>
            <div className="block justify-center">
              <button type="submit" className="button">
                Submit
              </button>
              <p className="text-secondary-200 text-base py-3">
                Don't have an account?{" "}
                <a href="/signup" className="text-yellow-400 cursor-pointer">
                  Signup
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className="object-cover overflow-hidden w-1/2 h-3/4 rounded-xl">
          <img src="/dish1.jpeg" alt="about" className="h-full w-full" />
        </div>
      </div>
    </>
  );
};

export default Login;
