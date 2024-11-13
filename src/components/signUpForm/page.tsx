"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
function SimpleForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await fetch("/api/signUp", {
        method: "POST",
        body: JSON.stringify(formData),
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.ok) {
        const response = await data.json();
        toast.success(response.message);
        router.replace("/");
      } else {
        const response = await data.json();
        toast.error(response.message);
      }
    } catch (error) {
      console.log("error fetching Data", error);
    }
  };
  return (
    <>
      <div className="">
        {" "}
        <form
          action=""
          onSubmit={handleSubmit}
          className="h-[400px] w-[350px] bg-fuchsia-50 ml-[475px] mt-[100px] rounded-2xl"
        >
          <div className="font-sans text-center font-">
            {" "}
            <h1>
              Form With Api's <br /> And Store Data in Database
            </h1>
          </div>

          <div className="">
            {" "}
            <label htmlFor="email" className="mt-[30px] ml-[10px] absolute">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="mt-16 ml-[30px] w-[300px] p-[9px] rounded-xl"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="">
            {" "}
            <label htmlFor="password" className="mt-[30px] ml-[10px] absolute">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              name="password"
              placeholder="Password"
              className="mt-16  w-[300px] p-[9px] rounded-xl ml-[30px]"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="ml-[120px] bg-black text-white mt-[20px] p-[10px] rounded-2xl"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
export default SimpleForm;
