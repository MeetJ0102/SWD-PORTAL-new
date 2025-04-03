import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  User,
  MailIcon,
  ArrowRightIcon,
  Smartphone,
  Hash,
  ArrowBigDown,
  ArrowDown,
  ArrowDown01,
  ArrowDownCircle,
} from "lucide-react";
import HeadingCard from "./HeadingCard";
import { Toast } from "./Toast";
import { BallTriangle } from "react-loader-spinner";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    regNumber: "",
    name: "",
    email: "",
    mobileNo: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "regNumber" && value.length === 10) {
      try {
        const response = await fetch(
          `${process.env.SERVER_APP_URL}/faculty/student/${value}`
        );
        if (response.ok) {
          const studentData = await response.json();
          setFormData((prevData) => ({
            ...prevData,
            name: studentData.name,
            email: studentData.email,
            mobileNo: studentData.mobileNo,
            gender: studentData.gender,
          }));
          Toast.fire({
            icon: "warning",
            title: "Student exists with this registration number.",
          });
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { regNumber, name, email, mobileNo, gender } = formData;
    setTimeout(async () => {
      try {
        if (
          regNumber.length === 10 &&
          name.trim() !== "" &&
          email.trim() !== "" &&
          mobileNo.length === 10 &&
          gender.trim() !== ""
        ) {
          const response = await fetch(
            `${process.env.SERVER_APP_URL}/faculty/students/add`,
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
            throw new Error(`Adding failed : ${data.message}`);
          } else {
            Toast.fire({
              icon: "success",
              title: "Student added successfully.",
            });
          }
        } else {
          Toast.fire({
            icon: "warning",
            title: "All info required. Reg & mobile # must be 10 digits.",
          });
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      } finally {
        setLoading(false); // Set loading state to false after the operation is completed
      }
    }, 100);
  };

   if (loading) {
    return (
      <div
      className="fixed inset-0 flex justify-center items-center backdrop-filter backdrop-blur-sm z-50"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
    >
      <div className="relative">
        <BallTriangle height={100} width={100} color="#C5D4EA" />
      </div>
    </div>
    );
  }

  
  return (
    <div className="w-full mb-2">
      <HeadingCard heading={"Create New Student Profile"} />
      

      <form
        onSubmit={handleSubmit}
        className="flex flex-col m-auto gap-y-4 max-w-3xl "
      >
        <div className="relative flex flex-col gap-3 sm:flex-row items-center justify-center">
          <div className="w-full sm:w-1/3 h-full py-4 rounded-2xl bg-[#d9d9d9] px-7 text-primary font-semibold text-center">
            Registration Number
          </div>
          <div className="relative flex flex-1 items-center w-full sm:w-2/3">
            <Input
              className="rounded-2xl  text-base font-semibold  px-4"
              type="text"
              name="regNumber"
              placeholder="00XYZ00000"
              value={formData.regNumber}
              onChange={handleChange}
            />
            <Hash className="absolute right-6" size={20} />
          </div>
        </div>
        <div className="relative flex flex-col gap-3 sm:flex-row">
          <div className="w-full sm:w-1/3 h-full py-4 rounded-2xl bg-[#d9d9d9] px-7 text-primary font-semibold text-center">
            Student Name
          </div>
          <div className="relative flex flex-1 items-center w-full sm:w-2/3">
            <Input
              className=" rounded-2xl  text-base font-semibold  px-4"
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            <User className="absolute right-6" size={20} />
          </div>
        </div>

        <div className="relative flex flex-col gap-3 sm:flex-row">
          <div className="w-full sm:w-1/3 h-full py-4 rounded-2xl bg-[#d9d9d9] px-7 text-primary font-semibold text-center">
            Student Email
          </div>
          <div className="relative flex flex-1 items-center w-full sm:w-2/3">
            <Input
              className=" rounded-2xl text-base font-semibold  px-4"
              type="email"
              name="email"
              placeholder="email@organisation"
              value={formData.email}
              onChange={handleChange}
            />
            <MailIcon className="absolute right-6 " size={20} />
          </div>
        </div>
        <div className="relative flex flex-col gap-3 sm:flex-row">
          <div className="w-full sm:w-1/3 h-full py-4 rounded-2xl bg-[#d9d9d9] px-7 text-primary font-semibold text-center">
            Mobile Number
          </div>
          <div className="relative flex flex-1 items-center w-full sm:w-2/3">
            <Input
              className="rounded-2xl text-base font-semibold  px-4"
              type="tel"
              name="mobileNo"
              placeholder="0000000000"
              value={formData.mobileNo}
              onChange={handleChange}
            />
            <Smartphone className="absolute right-6 " size={20} />
          </div>
        </div>
        <div className="relative flex flex-col gap-3 sm:flex-row">
          <div className="w-full sm:w-1/3 h-full py-4 rounded-2xl bg-[#d9d9d9] px-7 text-primary font-semibold text-center">
            Gender
          </div>
          <div className="relative flex flex-1 items-center w-full sm:w-2/3">
            <select
              className="appearance-none w-full text-muted-foreground rounded-2xl bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-input border font-semibold p-4"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="" hidden disabled>
                Male/Female
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="flex w-full justify-center items-center">
          <Button
            type="submit"
            className="w-full sm:w-1/2 py-6 bg-primary rounded-3xl shadow hover:scale-105 ease-in-out font-semibold"
          >
            Submit <ArrowRightIcon size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
