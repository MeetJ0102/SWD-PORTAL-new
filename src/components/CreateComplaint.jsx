"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  User,
  MailIcon,
  Smartphone,
  Hash,
  MessageSquare,
  CalendarCheckIcon,
  MessageSquareMore,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import HeadingCard from "./HeadingCard";
import { Toast } from "./Toast";
import { BallTriangle } from "react-loader-spinner";

export const DatePicker = ({ onSelect, reset }) => {
  const [date, setDate] = useState();

  const handleDateSelect = (date) => {
    setDate(date);
    onSelect(date);
  };

  React.useEffect(() => {
    if (reset) {
      setDate(undefined);
    }
  }, [reset]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  };

  return (
    <Popover className="">
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="flex justify-start gap-2 h-[54px] w-full rounded-2xl border border-input bg-background px-4 py-2 text-base "
        >
          <CalendarCheckIcon className=" text-muted-foreground" size={20} />
          {date ? (
            <span className="text-primary dark:text-white">
              {formatDate(date)}
            </span>
          ) : (
            <span className="text-muted-foreground">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

const CreateComplaint = ({ userName }) => {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    studentName: "",
    gender: "",
    email: "",
    studentMobileNo: "",
    title: "",
    description: "",
    facultyName: userName,
    dateTime: "",
    remark: "",
    IdCardStatus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "registrationNumber" && value.length === 10) {
      fetchStudentDetails(value);
    }
  };

  const fetchStudentDetails = async (regNo) => {
    try {
      const response = await fetch(
        `${process.env.SERVER_APP_URL}/faculty/student/${regNo}`
      );
      if (response.ok) {
        const studentData = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          studentName: studentData.name,
          email: studentData.email,
          studentMobileNo: studentData.mobileNo,
          gender: studentData.gender,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          studentName: "",
          email: "",
          studentMobileNo: "",
          gender: "",
        }));
      }
    } catch (error) {
      // console.error("Error fetching student details:", error);
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  const handleDateSelect = (date) => {
    const localDate = new Date(date);
    const timezoneOffset = localDate.getTimezoneOffset() * 60 * 1000;
    const utcDate = new Date(localDate.getTime() - timezoneOffset);
    setFormData((prevData) => ({
      ...prevData,
      dateTime: utcDate.toISOString().slice(0, 24),
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isSubmitting || cooldown) {
      return;
    }

    setIsSubmitting(true);

    const isFormComplete = Object.values(formData).every(
      (value) => value !== ""
    );

    if (!isFormComplete) {
      Toast.fire({
        icon: "warning",
        title: "Please fill in all the details before submitting.",
      });
      setIsSubmitting(false);
      setLoading(false); // Set loading to false if the form is not complete
      return;
    }

    try {
      const response = await fetch(
        `${process.env.SERVER_APP_URL}/faculty/complaint/create`,
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
        throw new Error(`Submission failed: ${data.message}`);
      }
      Toast.fire({
        icon: "success",
        title: data.message,
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    } finally {
      setCooldown(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setCooldown(false);
        setLoading(false); // Set loading to false after everything is done
      }, 2000);
    }
  };


  return (
    <div className="w-full mb-2">
      <HeadingCard heading={"Add New Complaints"} />
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4  ">
        <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
          <div className="relative flex items-center ">
            <Input
              type="text"
              name="registrationNumber"
              placeholder="Registration Number"
              value={formData.registrationNumber}
              onChange={handleChange}
              className="rounded-2xl  text-base font-semibold  px-4 "
            />
            <Hash
              className="absolute right-6 text-muted-foreground"
              size={20}
            />
          </div>
          <div className="relative flex items-center gap-4 justify-between ">
            <div className="flex w-full relative items-center">
              <Input
                type="text"
                name="studentName"
                placeholder="Student Name"
                value={formData.studentName}
                onChange={handleChange}
                className="rounded-2xl  text-base font-semibold  px-4 "
              />
              <User
                className="absolute right-2 sm:right-6 text-muted-foreground"
                size={20}
              />
            </div>
            <div className=" flex relative items-center w-full">
              <select
                className="appearance-none w-full text-base text-muted-foreground rounded-2xl flex h-[54px]  bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-input border font-semibold  disabled:opacity-50 py-2 px-4"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select Gender
                </option>
                <option className="" value="Male">
                  Male
                </option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="relative flex items-center ">
            <Input
              type="Email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className=" rounded-2xl  text-base font-semibold  px-4 "
            />
            <MailIcon
              className="absolute right-6 text-muted-foreground"
              size={20}
            />
          </div>
          <div className="relative flex items-center ">
            <Input
              type="tel"
              name="studentMobileNo"
              placeholder="Mobile Number"
              value={formData.studentMobileNo}
              onChange={handleChange}
              className=" rounded-2xl  text-base font-semibold  px-4 "
            />
            <Smartphone
              className="absolute right-6 text-muted-foreground"
              size={20}
            />
          </div>
        </div>
        <div className="relative flex items-center ">
          <Input
            type="text"
            name="title"
            placeholder="Complaint Name"
            value={formData.title}
            onChange={handleChange}
            className=" rounded-2xl  text-base font-semibold  px-4 "
          />
        </div>
        <div className="relative flex items-center">
          <Textarea
            name="description"
            placeholder="Complaint Description"
            value={formData.description}
            onChange={handleChange}
            className=" rounded-2xl  text-base font-semibold  px-4 "
          />
          <MessageSquare
            className="absolute right-6 top-4 text-muted-foreground"
            size={20}
          />
        </div>
        <div className="relative flex items-center gap-4 justify-between">
          <div className="flex w-full relative items-center">
            <Input
              type="text"
              name="remark"
              placeholder="Remarks"
              value={formData.remark}
              onChange={handleChange}
              className="rounded-2xl  text-base font-semibold  px-4 "
            />
            <MessageSquareMore
              className="absolute right-6 text-muted-foreground"
              size={20}
            />
          </div>
          <div className=" flex w-full  relative items-center">
            <select
              className="appearance-none w-full text-base text-muted-foreground  rounded-2xl flex h-[54px]  bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-input border font-semibold  disabled:opacity-50 py-2 px-4"
              name="IdCardStatus"
              value={formData.IdCardStatus}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                ID Status
              </option>
              <option className="" value="Taken">
                ID Taken
              </option>
              <option value="Returned Back">ID Returned Back</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center w-full lg:flex-row">
          <div className="relative w-full items-center   ">
            <DatePicker onSelect={handleDateSelect} />
          </div>
          <div className="relative flex w-full items-center ">
            <Input
              value={formData.facultyName}
              disabled
              className=" rounded-2xl  text-base font-semibold  px-4"
            />
            <User
              className="absolute right-6 text-muted-foreground"
              size={20}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || cooldown}
            className="w-full p-6 bg-primary rounded-3xl shadow hover:scale-105 ease-in font-semibold "
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateComplaint;
