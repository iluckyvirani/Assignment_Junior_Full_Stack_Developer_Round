/** @format */

import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createApi } from "../Repository/Repository";
import { ClipLoader } from "react-spinners";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inputpass, setInputpass] = useState(false);
    const [loading, setLoading] = useState(false);

    const payload = {
        username,
        email,
        password,
    };

    const saveToken = (token) => {
        localStorage.setItem("token", token);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const additionalFunctions = [
            (res) => saveToken(res.accessToken),
            () => navigate("/login"),
        ];
        createApi({
            url: "api/user/register",
            setLoading,
            payload,
            successMsg: "Registration successful! You can now log in to your account.",
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
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@gmail.com"
                            required
                        />
                        <AiOutlineMail className="text-xl " />
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
                        {loading ? <ClipLoader color="#fff" /> : "Register"}
                    </button>
                    <button
                        type="button"
                        className="EcommerceVendorLogin"
                        onClick={() => navigate("/login")}
                    >
                       Log In
                    </button>
                </form>
            </section>
        </>
    );
};

export default Register;
