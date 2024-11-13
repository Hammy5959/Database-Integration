"use client";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

function LoginForm() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await fetch("/api/login", {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      if (result.ok) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error, "error from api route");
    }
  };
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          action=""
          className="h-[400px] w-[350px] bg-fuchsia-50 ml-[475px] mt-[100px] rounded-2xl"
        >
          <div className="text-center  font-sans text-xl ">
            {" "}
            <h1>Log in Page</h1>
          </div>
          <div className="mt-[50px] ml-2">
            <label htmlFor="email" className="">
              Email
              <input
                type="email"
                name="email"
                id="email"
                className="mt-[20px] ml-[22px] w-[300px] p-[9px] rounded-xl"
                onChange={handleChange}
                value={formValues.email}
              />
            </label>
          </div>
          <div className="mt-[30px] ml-2">
            {" "}
            <label htmlFor="password" className="">
              Password
              <input
                type="password"
                name="password"
                id="password"
                className="  w-[300px] p-[9px] rounded-xl ml-[22px] mt-[20px]"
                onChange={handleChange}
                value={formValues.password}
              />
            </label>
          </div>
          <div className="text-cyan-700 ml-[120px] mt-[10px]">
            <Link href={"/signUp"}>Don't have account? Register</Link>
          </div>
          <button
            type="submit"
            className="ml-[140px] bg-black text-white mt-[20px] p-[10px] rounded-2xl"
          >
            Log in
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
