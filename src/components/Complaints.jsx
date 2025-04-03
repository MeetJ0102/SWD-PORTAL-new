import React, { useState, useEffect } from "react";
import ComplaintCard from "./ComplaintCard/ComplaintCard";
import HeadingCard from "./HeadingCard";
import Student from "./Student";
import { BallTriangle } from "react-loader-spinner";

const Complaints = ({ search }) => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.SERVER_APP_URL}/faculty/complaints`)
      .then((response) => response.json())
      .then((data) => {
        setComplaints(data.complaints);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        setError("Error fetching complaints:", error);
      });
  }, []);

  if (loading) {
    return (
      <div className="">
        <HeadingCard heading={"View existing complaints"} />
        <div className="flex justify-center items-center p-32">
          <BallTriangle height={100} width={100} color="#C5D4EA" />
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="mb-4">
      <HeadingCard heading={"View existing complaints"} />
      {selectedComplaint ? (
        <Student
          complaint={selectedComplaint}
          onBack={setSelectedComplaint}
        />
      ) : (
        // complaint div
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between">
          {search === ""
            ? complaints
                .slice(0, 9)
                .map((complaint) => (
                  <ComplaintCard
                    key={complaint._id}
                    complaint={complaint}
                    onViewDetails={setSelectedComplaint}
                  />
                ))
            : complaints
                .filter((complaint) =>
                  complaint.registrationNumber.startsWith(
                    search.toUpperCase()
                  )
                )
                .map((complaint) => (
                  <ComplaintCard
                    key={complaint._id}
                    complaint={complaint}
                    onViewDetails={setSelectedComplaint}
                  />
                ))}
        </div>
      )}
    </div>
  </>
  
  );
};

export default Complaints;
