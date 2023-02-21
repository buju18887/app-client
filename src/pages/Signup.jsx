import { FaMortarPestle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    age: "",
    country: "",
  });

  const [errors, setErrors] = useState("");

  const { name, email, password, password2, age, country } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/login");
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
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let password2Error = "";
    let ageError = "";
    let countryError = "";

    if (!formData.name) {
      nameError = "This field is required";
    }

    if (!formData.email) {
      emailError = "This field is required";
    }

    if (!formData.password) {
      passwordError = "This field is required";
    }

    if (!formData.password2) {
      password2Error = "This field is required";
    }

    if (!formData.age) {
      ageError = "This field is required";
    }

    if (!formData.country) {
      countryError = "This field is required";
    }

    if (!formData.email.includes("@")) {
      emailError = "Invalid email";
    }

    if (formData.password !== formData.password2) {
      password2Error = "Passwords do not match";
    }

    if (
      nameError ||
      emailError ||
      passwordError ||
      password2Error ||
      ageError ||
      countryError
    ) {
      setErrors({
        nameError,
        emailError,
        passwordError,
        password2Error,
        ageError,
        countryError,
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
    const userData = {
      name,
      email,
      password,
      age,
      country,
    };

    dispatch(register(userData));
  };

  return (
    <>
      <div className="mx-auto max-w-5xl bg-white p-5 rounded-lg shadow-lg shadow-secondary-200 mt-10 flex justify-end gap-x-3 pb-4">
        <div className="mx-auto w-2/3 block">
          <div className="flex justify-center p-10 font-extrabold text-yellow-600 text-2xl">
            <FaMortarPestle /> YUMMY
          </div>
          <div className="block py-4 items-center">
            <h1 className="text-4xl font-bold text-yellow-500">Welcome!</h1>
            <p className="text-yellow-400 font-semibold text-lg">
              Please signup
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                className="input"
                placeholder="Enter full name"
              />
              <p className="danger">{errors.nameError}</p>
            </div>
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
            <div>
              <label htmlFor="password2" className="label">
                Confirm password
              </label>
              <input
                type="password"
                id="password2"
                name="password2"
                value={password2}
                onChange={onChange}
                className="input"
                placeholder="Password"
              />
              <p className="danger">{errors.password2Error}</p>
            </div>
            <div>
              <label htmlFor="age" className="label">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={age}
                onChange={onChange}
                className="input"
                placeholder=""
              />
              <p className="danger">{errors.ageError}</p>
            </div>
            <div>
              <label htmlFor="country" className="label">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={onChange}
                className="input"
                placeholder="Country"
              />
              <p className="danger">{errors.countryError}</p>
            </div>

            <div className="block justify-center">
              <button type="submit" className="button">
                Submit
              </button>
              <p className="text-secondary-200 text-base py-3">
                Already have an account?{" "}
                <a href="/login" className="text-yellow-400 cursor-pointer">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className="object-cover overflow-hidden w-1/2 rounded-xl">
          <img
            src="/rice.jpeg"
            alt="about"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
