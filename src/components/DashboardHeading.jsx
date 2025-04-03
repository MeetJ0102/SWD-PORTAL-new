"use client";
import { format } from "date-fns";
import React, { useEffect, useReducer, useState } from "react";
import CountUp from "react-countup/build";

const Card = ({ name, data }) => {
  return (
    <div className="flex flex-col p-4 md:p-4 lg:p-6 items-center bg-primary rounded-[50px] w-full">
      <link
        href="https://fonts.googleapis.com/css2?family=Train+One&display=swap"
        rel="stylesheet"
      />
      <div className="mt-4 text-xl md:text-2xl lg:text-3xl  text-zinc-300 train-one-regular">
        <CountUp end={data} delay={0.5} duration={1} />
      </div>
      <div className="mt-6 md:mt-5 w-full text-center py-4 text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl bg-zinc-300 rounded-[40px] text-slate-700 break-normal">
        {name}
      </div>
    </div>
  );
};

const formatUserName = (userName) => {
  const trimmedName = userName.trim(); // Trim the userName
  const firstWord = trimmedName.split(" ")[0]; // Get the first word
  const formattedName =
    firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase(); // Capitalize the first letter and lowercase the rest
  return formattedName;
};
const DashboardHeading = ({ userName }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [task, updateTask] = useReducer(
    (prev, next) => ({
      ...prev,
      ...next,
    }),
    {
      totalComplaints: "",
      PendingComplaints: "",
      ResolvedComplaints: "",
    }
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch(`${process.env.SERVER_APP_URL}/faculty/complaints`)
      .then((response) => response.json())
      .then((data) => {
        let pendingCount = 0;
        let resolvedCount = 0;
        data.complaints.forEach((complaint) => {
          if (complaint.status === "Pending") {
            pendingCount++;
          } else if (complaint.status === "Resolved") {
            resolvedCount++;
          }
        });
        updateTask({
          totalComplaints: data.complaints.length,
          PendingComplaints: pendingCount,
          ResolvedComplaints: resolvedCount,
        });
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-2 md:gap-3 lg:gap-6">
      <div className="relative flex ">
        {/* Image */}
        <div className="absolute w-1/3 inset-y-0 right-0  z-10  mr-auto   max-xl:hidden">
          <img
            loading="lazy"
            src="/new_img.png"
            // width={1440}
            // height={50}
            className="h-full w-full object-cover  "
            alt="College Student"
          />
        </div>
        {/* Box 9mt-20 for size0 */}
        <div className="w-full pr-14 pl-12 mt-0 max-xl:mt-0 rounded-3xl shadow-2xl max-md:px-5 bg-primary z-0">
          <div className="flex py-6 justify-between max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch md:mt-3 text-white dark:text-zinc-300 text-opacity-80 max-md:max-w-full">
              <h2 className="text-xs max-w-full sm:text-xs md:text-sm  ">
                {format(currentTime, "PPP p")}
              </h2>
              <h1 className="mt-3 mr-auto italic text-lg sm:text-xl md:text-2xl font-thin font-[Poppins] max-w-full">
                Welcome back,{" "}
                {userName ? (
                  <a className="not-italic font-thin">
                    {formatUserName(userName)}
                  </a>
                ) : null}
              </h1>
              <h3 className="max-w-full text-sm sm:text-base md:text-base  ">
                Always stay informed with the latest updates on your portal!
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col sm:flex-row gap-2 md:gap-5 lg:gap-8 justify-between">
        <Card name={"Total Complaint"} data={`${task.totalComplaints}`} />
        <Card name={"Pending Complaint"} data={`${task.PendingComplaints}`} />
        <Card name={"Resolved Complaint"} data={`${task.ResolvedComplaints}`} />
      </div>
    </div>
  );
};

export default DashboardHeading;
