"use client";
import React, { useState } from "react";
import "./sidebar.css";
import { IconContext } from "react-icons";
import { MdSpaceDashboard } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { HiPencil, HiUserPlus } from "react-icons/hi2";
import { BiSolidDownload, BiSolidMessageAltDetail } from "react-icons/bi";
import { RiContactsBook2Fill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { BallTriangle } from "react-loader-spinner";

function Sidebar({ active, setActive }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    setLoading(true);
    localStorage.removeItem("complaintToken");
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        title: "You have been logged out!",
        icon: "success",
      });
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="sidebar dark:bg-primary">
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
      <div className="graduation-cap-container">
        <img src="/VITB_seal_white.png" alt="VIT Bhopal" />
        {/* <FaGraduationCap  className='h-[8vw] w-[8vw] text-white' /> */}
      </div>
      <div className="menu" >
        <button
          className={active === "Dashboard" ? "menu-item active" : "menu-item"}
          onClick={() => setActive("Dashboard")}
          style={{ width: "100%"}}
        >
          <IconContext.Provider value={{ size: "24px" }}>
            <MdSpaceDashboard />
          </IconContext.Provider>
          <p className="hidden md:block" style={{ fontSize: "1.08vw", textAlign: "left" }}>Dashboard</p>
        </button>

        <button
          className={
            active === "Create Profile" ? "menu-item active" : "menu-item"
          }
          onClick={() => setActive("Create Profile")}
          style={{ width: "100%"}}
        >
          <IconContext.Provider value={{ size: "24px" }}>
            <HiUserPlus />
          </IconContext.Provider>
          <p className="hidden md:block" style={{ fontSize: "1.08vw", textAlign: "left" }}>
            Create Profile
          </p>
        </button>

        <button
          className={active === "Add" ? "menu-item active" : "menu-item"}
          onClick={() => setActive("Add")}
          style={{ width: "100%"}}
        >
          <IconContext.Provider value={{ size: "24px" }}>
            <MdLibraryBooks />
          </IconContext.Provider>
          <p className="hidden md:block" style={{ fontSize: "1.08vw", textAlign: "left" }}>Add Complaint</p>
        </button>
        <button
          className={active === "Modify" ? "menu-item active" : "menu-item"}
          onClick={() => setActive("Modify")}
          style={{ width: "100%"}}
        >
          <IconContext.Provider value={{ size: "24px" }}>
            <HiPencil />
          </IconContext.Provider>
          <p className="hidden md:block" style={{ fontSize: "1.08vw", textAlign: "left" }}>
            Modify Complaint
          </p>
        </button>

        <button
          className={active === "View" ? "menu-item active" : "menu-item"}
          onClick={() => setActive("View")}
          style={{ width: "100%"}}
        >
          <IconContext.Provider value={{ size: "24px" }}>
            <BiSolidMessageAltDetail />
          </IconContext.Provider>
          <p className="hidden md:block" style={{ fontSize: "1.08vw", textAlign: "left" }}>
            View Complaints
          </p>
        </button>

        <button
          className={active === "Download" ? "menu-item active" : "menu-item"}
          onClick={() => setActive("Download")}
          style={{ width: "100%"}}
        >
          <IconContext.Provider value={{ size: "24px" }}>
            <BiSolidDownload />
          </IconContext.Provider>
          <p className="hidden md:block" style={{ fontSize: "1.08vw", textAlign: "left" }}>Download</p>
        </button>

        <button
          className={active === "Info" ? "menu-item active" : "menu-item"}
          onClick={() => setActive("Info")}
          style={{ width: "100%"}}
        >
          <IconContext.Provider value={{ size: "24px" }}>
            <RiContactsBook2Fill />
          </IconContext.Provider>
          <p className="hidden md:block" style={{ fontSize: "1.08vw", textAlign: "left" }}>User Info</p>
        </button>
      </div>

      <button className="menu-item signout justify-center" onClick={handleSignOut}>
        <IconContext.Provider value={{ size: "22px" }}>
          <FaSignOutAlt />
        </IconContext.Provider>
        <p className="hidden md:block" style={{ fontSize: "1.2vw" }}>Logout</p>
      </button>
    </div>
  );
}

export default Sidebar;
