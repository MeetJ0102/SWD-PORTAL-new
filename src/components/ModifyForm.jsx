import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Calendar,
  Hash,
  MailIcon,
  MessageSquare,
  MessageSquareMore,
  MoveLeft,
  Smartphone,
  User,
} from "lucide-react";
import { Toast } from "./Toast";
import { BallTriangle } from "react-loader-spinner";

const ModifyForm = ({ selectedComplaint, onBack }) => {
  const token = localStorage.getItem("complaintToken");
  const decodedToken = jwt.decode(token);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    registrationNumber: selectedComplaint.registrationNumber,
    studentName: selectedComplaint.studentName,
    gender: selectedComplaint.gender,
    email: selectedComplaint.email,
    studentMobileNo: selectedComplaint.studentMobileNo,
    title: selectedComplaint.title,
    description: selectedComplaint.description,
    facultyName: selectedComplaint.facultyName,
    dateTime: selectedComplaint.dateTime,
    status: selectedComplaint.status,
    IdCardStatus: selectedComplaint.idCardStatus,
    remark: selectedComplaint.remark,
    modifiedBy: decodedToken.name,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResolve = async () => {
    try {
      const response = await fetch(
        `${process.env.SERVER_APP_URL}/faculty/complaints/${selectedComplaint._id}/resolve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      // alert(data.message);
      Toast.fire({
        icon: "success",
        title: data.message,
      });
    } catch (error) {
      // console.error("Error resolving complaint:", error);
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(
          `${process.env.SERVER_APP_URL}/faculty/modify/${selectedComplaint._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        // alert(data.message);
        Toast.fire({
          icon: "success",
          title: data.message,
        });
      } catch (error) {
        // console.error("Error modifying complaint:", error);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      } finally {
        setLoading(false); // Set loading state to false after the operation is completed
      }
    }, 100);
  };

  return (
    <div className="w-full mb-2">
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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="relative flex items-center ">
            <Input
              value={formData.registrationNumber}
              disabled
              className="rounded-2xl  text-base font-semibold  px-4 "
            />
            <Hash
              className="absolute right-6 text-muted-foreground"
              size={20}
            />
          </div>
          <div className="relative flex items-center gap-4 justify-between">
            <div className="flex w-full relative items-center">
              <Input
                disabled
                value={formData.studentName}
                className="rounded-2xl  text-base font-semibold  px-4 "
              />
              <User
                className="absolute right-6 text-muted-foreground"
                size={20}
              />
            </div>
            <div className=" flex relative items-center">
              <Input
                disabled
                className="rounded-2xl  text-base font-semibold  px-4"
                value={formData.gender}
              />
            </div>
          </div>
          <div className="relative flex items-center ">
            <Input
              disabled
              value={formData.email}
              className=" rounded-2xl  text-base font-semibold  px-4 "
            />
            <MailIcon
              className="absolute right-6 text-muted-foreground"
              size={20}
            />
          </div>
          <div className="relative flex items-center gap-4 justify-between">
            <div className="flex w-full relative items-center">
              <Input
                disabled
                value={formData.studentMobileNo}
                className="rounded-2xl  text-base font-semibold  px-4 "
              />
              <Smartphone
                className="absolute right-6 text-muted-foreground"
                size={20}
              />
            </div>
            <div className=" flex relative items-center">
              <Input
                disabled
                className="rounded-2xl  text-base font-semibold  px-4"
                value={formData.dateTime.substr(0, 10)}
              />
              <Calendar
                className="absolute right-6 text-muted-foreground"
                size={20}
              />
            </div>
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
        <div className="relative flex flex-col lg:flex-row items-center gap-4 justify-between">
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
          <div className=" flex w-full relative items-center">
            {/* <select
              className="appearance-none w-full text-base text-muted-foreground  rounded-2xl flex h-[54px]  bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-input border font-semibold  disabled:opacity-50 py-2 px-8"
              name="IdCardStatus"
              value={formData.IdCardStatus}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Select ID Status
              </option>
              <option value="Taken">
                ID Taken
              </option>
              <option value="Returned Back">ID Returned Back</option>
            </select> */}
            <select
              className="appearance-none w-full text-base text-muted-foreground rounded-2xl flex h-[54px] bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-input border font-semibold disabled:opacity-50 py-2 px-8"
              name="IdCardStatus"
              value={formData.IdCardStatus}
              onChange={handleChange}
            >
              <option value="" disabled={formData.IdCardStatus !== ""}>
                Select ID Status
              </option>
              <option
                value="Taken"
                disabled={formData.IdCardStatus === "Taken"}
              >
                ID Taken
              </option>
              <option
                value="Returned Back"
                disabled={formData.IdCardStatus === "Returned Back"}
              >
                ID Returned Back
              </option>
            </select>
          </div>
        </div>
        <div className="relative flex lg:flex-row flex-col-reverse items-center gap-4 justify-between">
          <div className="flex flex-col-reverse lg:flex-row gap-4 w-full relative items-center lg:justify-between ">
            <Button
              className="p-6 max-lg:w-full  hover:scale-105"
              onClick={() => onBack(null)}
            >
              <MoveLeft className="text-white" size={25} />
            </Button>
            <div className="flex w-full  gap-4">
              <Button
                type="button"
                onClick={handleResolve}
                className="w-full rounded-2xl shadow hover:scale-105 p-6 bg-green-500  hover:bg-green-600 "
              >
                Mark as Resolved
              </Button>
              <Button
                type="submit"
                variant="default"
                className="w-full rounded-2xl shadow hover:scale-105 p-6"
              >
                Save Changes
              </Button>
            </div>
          </div>
          <div className="flex w-full relative items-center ">
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
        </div>
      </form>
    </div>
  );
};

export default ModifyForm;
