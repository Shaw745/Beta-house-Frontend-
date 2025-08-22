import React, { useState } from "react";
import AuthWrapper from "../components/layout/AuthWrapper";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import axiosInstance from "../api/Axios"; 
import { useAppContext } from "../hooks/useAppContext";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAppContext(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    setIsSubmitting(true);
    try {
      const { data: mydata } = await axiosInstance.post("/auth/login", data);

      login(mydata.token, mydata.user); 
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <AuthWrapper>
      <div className="lg:p-[50px] lg:pl-[80px] md:w-[600px]">
        <h1 className="text-[#181A20] font-[600] text-[20px] md:text-[28px] mb-1">
          Welcome Back to BetaHouse!
        </h1>
        <p className="text-[#181A20D1] text-[16px] font-[400] mb-3">
          Let’s get started by filling out the information below
        </p>

        <form onSubmit={handleSubmit(handleLogin)}>
          {/* Email */}
          <label htmlFor="email" className="alroe">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email"
            className="int  placeholder:text-gray-400"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <label htmlFor="password" className="alroe">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="int  placeholder:text-gray-400"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <div className="flex items-center justify-between font-medium text-[16px] mb-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-[#3D9970] w-[20px] h-[20px]"
              />
              <label
                htmlFor="rememberMe"
                className="text-[#716F6F] text-[16px] font-medium"
              >
                Remember Me
              </label>
            </div>
            <Link className="text-[#EC5E5E]">Forgot Password</Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#3D9970] w-full h-[64px] rounded-[15px] font-[400] text-[22px] text-[#FFFFFF]"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-md text-black"></span>
            ) : (
              "Login"
            )}
          </button>

          <div className="flex items-center justify-center gap-1 w-full my-4">
            <p className="font-[600] text-[#4F4E4E] text-[16px]">or</p>
          </div>

          <a
            href="https://mail.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-[1px] flex items-center gap-2 mb-4 justify-center border-[#000000] w-full h-[64px] rounded-[15px] font-[400] text-[22px] text-[#292929]"
          >
            <FcGoogle className="text-2xl" /> Continue with Google
          </a>

          <div className="flex items-center justify-center gap-2 font-[400] text-[18px]">
            <p>New User?</p>
            <Link to="/signup" className="text-[#3D9970]">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default Login;
