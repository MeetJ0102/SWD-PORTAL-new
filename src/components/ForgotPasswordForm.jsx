"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Eye, EyeOff, User } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { useRouter } from "next/navigation";
import { Toast } from "./Toast";
import Link from "next/link";
import Image from "next/image";
import { BallTriangle } from "react-loader-spinner";

const ForgotPasswordForm = () => {
  const [empId, setEmpId] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const[loading,setLoading] = useState(false)
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.SERVER_APP_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ empId }),
        }
      );
      const data = await response.json();
      setEmail(data.email);
      if (!response.ok) {
        throw new Error(`Forgot password failed: ${data.message}`);
      }
      Toast.fire({
        icon: "success",
        title: "Please check your email for OTP.",
      });
      setStep(2);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    } finally{
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.SERVER_APP_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`OTP verification failed: ${data.message}`);
      }
      setStep(3);
      Toast.fire({
        icon: "success",
        title: "OTP verification successful.",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.SERVER_APP_URL}/auth/update-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            empId,
            newPassword,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Update password failed: ${data.message}`);
      } else {
        Toast.fire({
          icon: "success",
          title: "Password updated successfully.",
        });
        router.push("/login");
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  {loading && (
    <div
      className="fixed inset-0 flex justify-center items-center backdrop-filter backdrop-blur-sm z-50"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
    >
      <div className="relative">
        <BallTriangle height={100} width={100} color="#C5D4EA" />
      </div>
    </div>
  )}

  return (
    <div className="flex flex-col h-screen">
      {/* img div */}
      <div className="flex flex-row-reverse justify-between w-full px-3">
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

      <div className="w-full flex justify-center   items-center my-auto">
        <form className="gap-4 flex flex-col min-w-lg items-center justify-center rounded-3xl shadow-2xl px-16 py-20 bg-primary ">
          {step === 1 && (
            <>
              <div className="relative flex items-center rounded-3xl border">
                <Input
                  className="rounded-2xl border font-semibold "
                  type="text"
                  placeholder="Employment Number"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                />
                <User className="absolute right-6 " size={20} />
              </div>
              <Button
                className=" items-center gap-1 shadow w-full hover:scale-105 rounded-3xl bg-white hover:bg-white/90 text-primary "
                onClick={handleForgotPassword}
              >
                Forgot Password
              </Button>
            </>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-8 ">
              <p className="text-white text-left">
                Please enter the OTP sent to your email:
              </p>
              <InputOTP
                className="justify-evenly "
                maxLength={4}
                value={otp}
                onChange={(newOTP) => setOTP(newOTP)} // Update the onChange handler
                render={({ slots }) => (
                  <>
                    <InputOTPGroup className="flex gap-2">
                      {slots.map((slot, index) => (
                        <InputOTPSlot
                          className="bg-background"
                          key={index}
                          {...slot}
                        />
                      ))}
                    </InputOTPGroup>
                  </>
                )}
              />
              <Button
                className="text-primary rounded-3xl hover:scale-105 bg-white hover:bg-white/80"
                onClick={handleVerifyOTP}
              >
                Verify OTP
              </Button>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-8">
              <p className="text-left text-white ">Enter your new password:</p>
              {/* <Input
                className="rounded-2xl border font-semibold"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              /> */}
              <div className="relative flex items-center rounded-2xl border ">
                <Input
                  className="rounded-2xl  text-base font-semibold  "
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
              <Button
                className="text-primary bg-white hover:scale-105 rounded-3xl hover:bg-white/80"
                onClick={handleUpdatePassword}
              >
                Update Password
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
