"use client";
import React, { useState, useEffect } from "react";
import { StudentComplaints } from "./StudentComplaints";
import { Button } from "./ui/button";
import { BallTriangle } from "react-loader-spinner";
const Student = ({ complaint, onBack }) => {
  const url = process.env.SERVER_APP_URL;
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComplaints, setTotalComplaints] = useState(0);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(`${url}/faculty/complaints/student`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ regNumber: complaint.registrationNumber }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch complaints");
        }

        const data = await response.json();
        setComplaints(data.complaints);
        setTotalComplaints(data.complaints.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, [complaint]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    // <div className="flex flex-col mt-4 gap-4">
    //   <div className="flex justify-between gap-4 items-center">
    //     <div className="grid grid-cols-2 font-semibold ml-8">
    //       <h1>{complaint.registrationNumber}</h1>
    //       <h1>{complaint.studentMobileNo}</h1>
    //       <h1>{complaint.studentName}</h1>
    //       <h1>{complaint.email}</h1>
    //     </div>
    //     <Button className="w-fit mr-8" onClick={() => onBack(null)}>
    //       Back
    //     </Button>
    //   </div>
    //   <div className="pb-5">
    //     <div className="relative flex flex-col">
    //       {loading ? (
    //         <div
    //         className="fixed inset-0 flex justify-center items-center backdrop-filter backdrop-blur-sm z-50"
    //         style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
    //       >
    //         <div className="relative">
    //           <BallTriangle height={100} width={100} color="#C5D4EA" />
    //         </div>
    //       </div>
    //       ) : (
    //         <div className="relative flex flex-col">
    //           <StudentComplaints
    //             complaints={complaints}
    //             currentPage={currentPage}
    //             perPage={3}
    //             totalComplaints={totalComplaints}
    //             onPageChange={onPageChange}
    //           />
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col mt-4 gap-4">
      <div className="flex justify-between gap-4 items-center px-4 sm:px-8">
        <div className="grid grid-cols-2  font-semibold">
          <h1 className="text-sm sm:text-base">
            {complaint.registrationNumber}
          </h1>
          <h1 className="text-sm sm:text-base hidden lg:block">{complaint.studentMobileNo}</h1>
          <h1 className="text-sm sm:text-base">{complaint.studentName}</h1>
          <h1 className="text-sm sm:text-base hidden lg:block">{complaint.email}</h1>
        </div>
        <Button className="w-fit" onClick={() => onBack(null)}>
          Back
        </Button>
      </div>
      <div className="pb-5">
        <div className="relative flex flex-col">
          {loading ? (
            <div
              className="fixed inset-0 flex justify-center items-center backdrop-filter backdrop-blur-sm z-50"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
            >
              <div className="relative">
                <BallTriangle height={100} width={100} color="#C5D4EA" />
              </div>
            </div>
          ) : (
            <div className="relative flex flex-col">
              <StudentComplaints
                complaints={complaints}
                currentPage={currentPage}
                perPage={3}
                totalComplaints={totalComplaints}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Student;
