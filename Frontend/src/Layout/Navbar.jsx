/** @format */

import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";


const Navbar = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token");
    navigate('/login')
  };

  return (
    <>
      <div
        className={
          "flex  w-full justify-between  my-1 rounded-sm  p-4 py-3 shadow-md items-center  bg-slate-200 space-x-4"
        }
        style={{ backgroundColor: "rgb(34, 40, 49)" }}
      >
        <IoArrowBackOutline
          onClick={() => navigate(-1)}
          className="text-2xl font-bold text-gray-900 hover:scale-90 cursor-pointer"
          style={{ color: "#fff" }}
        />

        <div className="flex sm:ml-auto justify-end sm:w-full items-center space-x-2  pr-2">
          <div
            className="lg:text-base text-sm text-gray-900  uppercase font-semibold"
            style={{ color: "#fff" }}
          >
            Welcome
          </div>
          <CgProfile
            onClick={() => navigate('/profile')}
            className="text-2xl font-bold text-gray-900 hover:scale-90 cursor-pointer"
            style={{ color: "#fff" }}
          />
          <IoMdLogOut
            onClick={logout}
            className="text-2xl font-bold text-gray-900 hover:scale-90 cursor-pointer"
            style={{ color: "#fff" }}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
