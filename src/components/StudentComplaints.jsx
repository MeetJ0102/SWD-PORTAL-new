import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DownloadIcon } from "lucide-react";
import { Button } from "./ui/button";
import { utils, writeFile } from "xlsx";
import { Toast } from "./Toast";
import { BallTriangle } from "react-loader-spinner";

export function StudentComplaints({
  complaints,
  currentPage,
  perPage,
  totalComplaints,
  onPageChange,
}) {
  const [loading, setLoading] = useState(false);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentComplaints = complaints.slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalComplaints / perPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleDownloadExcel = () => {
    setLoading(true);
    try {
      if (complaints.length === 0) {
        throw new Error("No complaints available to download.");
      }
      Toast.fire({
        icon: "info",
        title: "Downloading Complaints",
        text: "Your file is being downloaded...",
      });

      const data = [
        [
          "Sr No.",
          "Date",
          "Complaint Status",
          "Registration No.",
          "Student Name",
          "Gender",
          "MobileNo",
          "Email",
          "Complaint Title",
          "Description",
          "Remarks",
          "ID Card Status",
          "Registered By",
          "Last Modify By",
        ],

        ...complaints.map((complaint, index) => [
          index + 1,
          complaint.dateTime.slice(0, 10),
          complaint.status,
          complaint.registrationNumber,
          complaint.studentName,
          complaint.gender,
          complaint.studentMobileNo,
          complaint.email,
          complaint.title,
          complaint.description,
          complaint.remark,
          complaint.idCardStatus,
          complaint.facultyName,
          complaint.modifiedBy[complaint.modifiedBy.length - 1],
        ]),
      ];

      const ws = utils.aoa_to_sheet(data);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Complaints");
      setTimeout(() => {
        writeFile(wb, "complaints.xlsx");
        Toast.fire({
          icon: "success",
          title: "File Downloaded",
          text: "File has been downloaded successfully.",
        });
        setLoading(false);
      }, 5000);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  if (loading) {
    return (
      <div className="">
        <div className="flex justify-center items-center p-32">
          <BallTriangle height={100} width={100} color="#C5D4EA" />
        </div>
      </div>
    );
  }

  return (
    // <div className="flex flex-col">
    //   <Accordion
    //     type="single"
    //     collapsible
    //     className="w-full rounded-2xl flex flex-col gap-y-3"
    //   >
    //     {currentComplaints.map((complaint, index) => (
    //       <AccordionItem
    //         className="rounded-2xl bg-accent"
    //         key={index}
    //         value={`item-${index}`}
    //       >
    //         <AccordionTrigger className="flex gap-2 py-4 pl-8  font-semibold h-fit justify-between items-center">
    //           <div
    //             className={`relative rounded-full h-6 w-6 ${
    //               complaint.status === "Resolved"
    //                 ? "bg-green-400"
    //                 : "bg-orange-400"
    //             }`}
    //           ></div>
    //           <div className="w-4/5 ml-4 max-h-12  text-ellipsis break-words overflow-y-auto ">
    //             {complaint.title}
    //           </div>
    //           <div className="w-1/5 flex flex-col text-gray-500 ">
    //             <div>Student ID:</div>
    //             <div>{complaint.registrationNumber}</div>
    //           </div>
    //         </AccordionTrigger>

    //         <AccordionContent className="px-8 dark:text-white/70">
    //           <div className="mb-4 max-h-60 break-words overflow-y-auto">
    //             {complaint.description}
    //           </div>
    //           <div className="flex justify-between ">
    //             <div>Date: {complaint.dateTime.slice(0, 10)}</div>
    //             <div className="italic">
    //               Registered By: {complaint.facultyName}
    //             </div>
    //           </div>
    //         </AccordionContent>
    //       </AccordionItem>
    //     ))}
    //   </Accordion>
    //   {complaints.length > 0 && (
    //     <div className="flex mt-4 justify-between items-center align-bottom ">
    //       <div className="">
    //         <Button onClick={handleDownloadExcel}>
    //           <DownloadIcon className="" size={20} />
    //         </Button>
    //       </div>
    //       <div>
    //         <button
    //           onClick={handlePrevPage}
    //           disabled={currentPage === 1}
    //           className="w-24 mx-2 p-2 rounded-lg bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
    //         >
    //           Previous
    //         </button>
    //         <span className="mx-2">
    //           {currentPage} / {totalPages}
    //         </span>
    //         <button
    //           onClick={handleNextPage}
    //           disabled={currentPage === totalPages}
    //           className="w-24 mx-2 px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
    //         >
    //           Next
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="flex flex-col justify-self-end h-full">
      <Accordion
        type="single"
        collapsible
        className="w-full h-full rounded-2xl flex flex-col gap-y-3"
      >
        {currentComplaints.map((complaint, index) => (
          <AccordionItem
            className="rounded-2xl bg-accent"
            key={index}
            value={`item-${index}`}
          >
            <AccordionTrigger className="flex gap-2 py-4 px-4 sm:pl-8 font-semibold h-fit justify-between items-center">
              <div
                className={`relative rounded-full h-4 w-4 ${
                  complaint.status === "Resolved"
                    ? "bg-green-400"
                    : "bg-orange-400"
                }`}
              ></div>
              <div className="w-3/5 ml-4 max-h-12 text-ellipsis break-words overflow-y-auto text-sm no-scrollbar ">
                {complaint.title}
              </div>
              <div className="w-1/5 flex flex-col text-gray-500 text-xs ">
                <div>Student ID:</div>
                <div>{complaint.registrationNumber}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 sm:px-8 dark:text-white/70">
              <div className="mb-4 max-h-60 break-words overflow-y-auto text-base no-scrollbar ">
                {complaint.description}
              </div>
              <div className="flex justify-between text-sm ">
                <div>Date: {complaint.dateTime.slice(0, 10)}</div>
                <div className="italic">
                  {" "}
                  Registered By: {complaint.facultyName}{" "}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {complaints.length > 0 && (
        <div className="flex mt-4 flex-col-reverse gap-4 sm:flex-row justify-between items-center align-bottom ">
          <div className="flex items-center">
            <Button onClick={handleDownloadExcel}>
              <DownloadIcon className="" size={20} />
            </Button>
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className=" "
            >
              Previous
            </Button>
            <span className="mx-2">
              {" "}
              {currentPage} / {totalPages}{" "}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className=""
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
