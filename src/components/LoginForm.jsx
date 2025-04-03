"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import { Toast } from "./Toast";
import Image from "next/image";
import { BallTriangle } from "react-loader-spinner";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    empId: "",
    password: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("complaintToken");
    if (token) {
      router.push("/");
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true immediately

    // Delay the execution of the fetch request by at least 0.1 seconds
    setTimeout(async () => {
      try {
        const response = await fetch(
          `${process.env.SERVER_APP_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`Login failed : ${data.message}`);
        }

        localStorage.setItem("complaintToken", data.token);
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        router.push("/");
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      } finally {
        // Ensure that loading state is set to false after at least 0.1 seconds
        setTimeout(() => setLoading(false), 100);
      }
    }, 0); // Wait at least 0.0 seconds before executing the fetch request
  };

  return (
    <div className="flex flex-col h-screen mx-auto">
      {loading && (
        <div className="w-full h-full flex justify-center items-center absolute bg-white z-50">
          <BallTriangle height={100} width={100} color="#C5D4EA" />
        </div>
      )}
      {/* img div */}
      <div className="flex flex-row-reverse gap-4 justify-between w-full px-3">
        <div className="flex items-center  ">
          <Link href="/login">
            <Image
              width={230}
              height={50}
              placeholder="blur"
              blurDataURL="/"
              src="/SW Logo.png"
              alt="Office of Students' Welfare"
              className="cover "
            />
          </Link>
        </div>
        <div className="flex items-center ">
          <Link
            href="https://vitbhopal.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              width={175}
              height={50}
              src="/vitblogo.png"
              alt="VIT Bhopal University"
              className="cover "
            />
          </Link>
        </div>
      </div>
      <div className="h-3 w-full bg-primary"></div>
      <div className="w-full flex justify-center items-center my-auto px-3">
        <form
          onSubmit={handleSubmit}
          className="gap-4 flex flex-col min-w-lg items-center justify-center rounded-3xl shadow-2xl px-16 py-20 bg-primary "
        >
          <User className="text-card mb-0" size={70} />
          <div className="relative flex items-center rounded-3xl border">
            <Input
              className="rounded-2xl border font-semibold "
              type="text"
              name="empId"
              placeholder="Employment Number"
              value={formData.empId}
              onChange={handleChange}
            />
            <User className="absolute right-6 " size={20} />
          </div>
          <div className="relative flex items-center rounded-2xl border ">
            <Input
              className="rounded-2xl  text-base font-semibold  placeholder:text-2xl "
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="**********"
              value={formData.password}
              onChange={handleChange}
            />
            {showPassword ? (
              <Eye
                className="absolute right-6 cursor-pointer"
                size={20}
                onClick={handleTogglePassword}
              />
            ) : (
              <EyeOff
                className="absolute right-6 cursor-pointer"
                size={20}
                onClick={handleTogglePassword}
              />
            )}
          </div>
          <div className="flex w-full justify-between items-center">
            <Button
              type="submit"
              className="flex items-center gap-1 shadow  rounded-3xl hover:scale-105 bg-white hover:bg-white/90 text-primary "
            >
              Login
              <ArrowRightIcon size={25} />
            </Button>

            <Link
              className="text-card hover:animate-pulse"
              href={"/login/forgot-password"}
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
