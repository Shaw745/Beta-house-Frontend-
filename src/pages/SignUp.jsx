import React, { useState } from "react";
import AuthWrapper from "../components/layout/AuthWrapper";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { twMerge } from "tailwind-merge";
import axiosInstance from "../api/Axios";
// ✅ Validation Schema
const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "Min 2 chars"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Min 2 chars"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string().required("Password is required").min(6, "Min 6 chars"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  terms: Yup.bool().oneOf([true], "You must accept the terms & conditions"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  // ✅ Register Handler
  const handleRegister = async (data) => {
    try {


      const res = await axiosInstance.post("/auth/register", data);

      if (res.status === 201) {
        alert("Registration successful! Please log in.");
        localStorage.setItem("registeredEmail", data.email); // Store email for login
        navigate("/login"); // ✅ Redirect to login page
      }
    } catch (error) {
      console.error("Register error:", error);
      setErrorMessage(error.response?.data?.message || "Registration failed");
    } 
  };

  return (
    <AuthWrapper>
      <div className="max-w-[500px] w-full">
        <h1 className="text-[#181A20] font-semibold text-[22px] md:text-[28px] mb-3 leading-snug">
          Join our community of home seekers and explore the possibilities that
          await.
        </h1>
        <p className="text-[#181A20D1] text-[16px] mb-5">
          Let’s get started by filling out the information below
        </p>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          {/* First & Last Name */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="fname" className="alroe">
                First Name
              </label>
              <input
                type="text"
                id="fname"
                {...register("firstName")}
                placeholder="Enter Name"
                className={twMerge(
                  "w-full px-3 py-3 border-2 rounded-md outline-none",
                  errors.firstName && "border-red-400"
                )}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="lname" className="alroe">
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                {...register("lastName")}
                placeholder="Enter Name"
                className={twMerge(
                  "w-full px-3 py-3 border-2 rounded-md outline-none",
                  errors.lastName && "border-red-400"
                )}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="alroe">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter your Email"
              className={twMerge(
                "w-full px-3 py-3 border-2 rounded-md outline-none",
                errors.email && "border-red-400"
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="alroe">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter your password"
              className={twMerge(
                "w-full px-3 py-3 border-2 rounded-md outline-none",
                errors.password && "border-red-400"
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="cpassword" className="alroe">
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              {...register("confirmPassword")}
              placeholder="Confirm your password"
              className={twMerge(
                "w-full px-3 py-3 border-2 rounded-md outline-none",
                errors.confirmPassword && "border-red-400"
              )}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              {...register("terms")}
              className={`w-5 h-5 accent-[#3D9970] ${
                errors.terms ? "ring-2 ring-red-200" : ""
              }`}
            />
            <label htmlFor="terms" className="text-[#181A20D1] text-[15px]">
              I agree to{" "}
              <span className="text-[#3D9970]">Terms of Service</span> and
              <span className="text-[#3D9970]"> Privacy Policies</span>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms.message}</p>
          )}

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#3D9970] w-full h-[56px] rounded-xl text-white font-medium text-lg hover:bg-[#31845e] transition"
          >
            Sign up
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 w-full my-4">
            <span className="flex-1 h-px bg-gray-300"></span>
            <p className="text-gray-600 text-sm font-medium">or</p>
            <span className="flex-1 h-px bg-gray-300"></span>
          </div>

          {/* Google */}
          <a
            href="https://accounts.google.com/signin"
            target="_blank"
            rel="noopener noreferrer"
            className="border-[1px] flex items-center gap-2 mb-4 justify-center border-[#000000] w-full h-[64px] rounded-[15px] font-[400] text-[22px] text-[#292929]"
          >
            <FcGoogle className="text-2xl" /> Continue with Google
          </a>

          {/* Footer */}
          <div className="text-center text-[15px]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#3D9970] font-medium">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
