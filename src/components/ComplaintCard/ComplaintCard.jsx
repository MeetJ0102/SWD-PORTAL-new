import "./complaintCard.css";
import { Button } from "../ui/button";

const ComplaintCard = ({ complaint, onViewDetails }) => {
  return (
    // <div className="complaintCard bg-accent ">
    //   <div
    //     className={`relative rounded-full h-6 w-6 ${
    //       complaint.status === "Resolved" ? "bg-green-400" : "bg-orange-400"
    //     }`}
    //   ></div>
    //   <p className="regNo">{complaint.registrationNumber}</p>
    //   <div className="flex gap-2">
    //     <p className="name">{complaint.studentName}</p>
    //   </div>
    //   <Button
    //     className="view-btn text-center hover:scale-105"
    //     onClick={() => onViewDetails(complaint)}
    //   >
    //     View
    //   </Button>
    // </div>
    <div className=" bg-accent rounded-3xl flex flex-col gap-2 justify-center items-center p-2 font-semibold">
      <div
        className={`relative rounded-full h-6 w-6 ${
          complaint.status === "Resolved" ? "bg-green-400" : "bg-orange-400"
        }`}
      ></div>
      <h1 className="text-lg text-center">{complaint.registrationNumber}</h1>
        <h2 className="text-base text-center">{complaint.studentName}</h2>
      <Button
        className="text-center hover:scale-105 bg-primary text-white py-2 px-4 rounded-2xl"
        onClick={() => onViewDetails(complaint)}
      >
        View
      </Button>
    </div>
  );
};

export default ComplaintCard;
