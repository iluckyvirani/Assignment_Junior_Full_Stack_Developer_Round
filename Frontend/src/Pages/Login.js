/** @format */

import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createApi } from "../Repository/Repository";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [inputpass, setInputpass] = useState(false);
  const [loading, setLoading] = useState(false);

  const payload = {
    username,
    password,
  };

  const saveToken = (token) => {
    localStorage.setItem("token", token);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const additionalFunctions = [
      (res) => saveToken(res.token),
      () => navigate("/dashboard"),
    ];
    createApi({
      url: "api/user/login",
      setLoading,
      payload,
      successMsg: "Login successful!",
      additionalFunctions,
    });
  };

  return (
    <>
      <section className="LoginSection">
        <form onSubmit={submitHandler}>
          <h2>Book Store Panel</h2>
          <div className="input_container">
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="username"
              required
            />
            <FaUserAlt className="text-xl " />
          </div>
          <div className="input_container">
            <input
              type={inputpass ? "text" : "password"}
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => {
                setInputpass(!inputpass);
              }}
              className="text-xl cursor-pointer hover:scale-90 "
            >
              {inputpass ? <VscEyeClosed /> : <VscEye />}
            </span>
          </div>

          <button type="submit" className="EcommerceAdminLogin">
            {loading ? <ClipLoader color="#fff" /> : "Log In"}
          </button>
          <button
            type="button"
            className="EcommerceVendorLogin"
            onClick={() => navigate("/")}
          >
            Register
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
