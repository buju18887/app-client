import {
  FaCookie,
  FaFacebook,
  FaHouseUser,
  FaInstagram,
  FaPlus,
  FaSignOutAlt,
  FaTwitter,
} from "react-icons/fa";
import { logout, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <div className="fixed h-full w-64 bg-white rounded-r-2xl">
        <img
          src="/pfp.png"
          alt="Profile"
          className="mx-auto mt-6"
          width={80}
          height={80}
        />
        <h4 className="font-semibold text-xl text-center my-5">
          {user && user.name}
        </h4>
        <ul>
          <li className="list">
            <a href="/dashboard" className="anchor">
              HOME
              <FaHouseUser />
            </a>
          </li>
          <li className="list">
            <a href="/myrecipes" className="anchor">
              MY RECIPES
              <FaCookie />
            </a>
          </li>
          <li className="list">
            <a href="/createrecipe" className="anchor">
              CREATE
              <FaPlus />
            </a>
          </li>
          <li className="list mt-60 text-red-600">
            <a href="" className="anchor" onClick={onLogout}>
              LOGOUT
              <FaSignOutAlt />
            </a>
          </li>
        </ul>
        <div className="flex justify-evenly mt-20 font-extrabold">
          <a href="">
            <FaFacebook />
          </a>
          <a href="">
            <FaTwitter />
          </a>
          <a href="">
            <FaInstagram />
          </a>
        </div>
      </div>
    </>
  );
};

export default SideNav;
