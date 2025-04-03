// "use client";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Sidebar from "./Sidebar/Sidebar";
import DashboardHeading from "./DashboardHeading";
import AddStudent from "./AddStudent";
import Navbar from "./Navbar";
import CreateComplaint from "./CreateComplaint";
import Complaints from "./Complaints";
import Profile from "./Profile";
import DownloadExcel from "./DownloadExcel";
import ModifyComplaint from "./ModifyComplaint";
import { useRouter } from "next/navigation";

function Dashboard() {
  const [token, setToken] = useState("");
  const [decodedToken, setDecodedToken] = useState(null);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("Dashboard");
  const [storedActive, setStoredActive] = useState(null);

  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("complaintToken");
      if (storedToken) {
        setToken(storedToken);
        const decoded = jwt.decode(storedToken);
        setDecodedToken(decoded);

        const initialActive = localStorage.getItem("active");
        setStoredActive(initialActive);

        if (initialActive) {
          setActive(initialActive);
        }
      } else {
        router.push("/login");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("active", active);
    }
  }, [active]);
  
  return (
    // <section className="">
    //   <div className="flex mt-4">
    //     <div className="w-1/5 fixed h-screen shadow-md z-10">
    //       <Sidebar active={active} setActive={setActive} />
    //     </div>
    //     <div className="w-4/5 px-6 gap-4 flex flex-col ml-auto">
    //       <div className="sticky top-0 z-10 bg-transparent dark:bg-secondary rounded-full py-2 px-2 ">
    //         <Navbar
    //           setActive={setActive}
    //           search={search}
    //           setSearch={setSearch}
    //           token={decodedToken}
    //         />
    //       </div>
    //       <div className="z-0">
    //         {active === "Dashboard" ? (
    //           <DashboardHeading userName={decodedToken?.name} />
    //         ) : null}
    //         {active === "Create Profile" ? <AddStudent /> : null}
    //         {active === "Add" ? (
    //           <CreateComplaint userName={decodedToken?.name} />
    //         ) : null}
    //         {active === "Modify" ? <ModifyComplaint /> : null}
    //         {active === "View" ? <Complaints search={search} /> : null}
    //         {active === "Download" ? <DownloadExcel /> : null}
    //         {active === "Info" ? <Profile token={decodedToken} /> : null}
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="flex mt-4 min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5 fixed z-10 ">
        <Sidebar active={active} setActive={setActive} />
      </div>

      {/* Main content */}
      <div className="w-4/5 px-6 gap-4 flex flex-col ml-auto mb-4">
        {/* Navbar */}
        <div className="sticky top-0 z-10 bg-transparent dark:bg-secondary rounded-full py-2 px-2">
          <Navbar setActive={setActive} search={search} setSearch={setSearch} token={decodedToken} />
        </div>

        {/* Content */}
        <section className="z-0  ">
          {active === 'Dashboard' && <DashboardHeading userName={decodedToken?.name} />}
          {active === 'Create Profile' && <AddStudent />}
          {active === 'Add' && <CreateComplaint userName={decodedToken?.name} />}
          {active === 'Modify' && <ModifyComplaint />}
          {active === 'View' && <Complaints search={search} />}
          {active === 'Download' && <DownloadExcel />}
          {active === 'Info' && <Profile token={decodedToken} />}
        </section>
      </div>
    </section>
  );
}

export default Dashboard;
