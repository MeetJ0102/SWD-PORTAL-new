import React, { useState, useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";

const Profile = ({ token }) => {
  const [userData, setUserData] = useState({
    name: "",
    post: "",
    empId: "",
    img: "",
  });
  const[loading,setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (token) {
      try {
        setUserData({
          name: token.name,
          post: token.post,
          empId: token.empId,
          img: token.name + ".jpg",
        });
        fetchUsers();
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.SERVER_APP_URL}/auth/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch user list");
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching user list:", error);
    } finally{
      setLoading(false);
    }
  };

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

  return (
    <div className="flex justify-center items-center text-black">
      <div className="bg-accent flex flex-col gap-12 p-4 md:p-12 rounded-3xl max-w-screen-xl w-full">
        <div className=" md:flex md:flex-row gap-4 rounded-3xl w-full items-center">
          {userData.name && (
            <div className="w-24 h-24 md:w-36 md:h-36 border-primary rounded-full border-2 overflow-hidden hidden md:flex">
              <img
                loading="lazy"
                src={`/${userData.img}`}
                alt="Profile Picture"
                className="w-full h-full rounded-full"
              />
            </div>
          )}
          <div className=" bg-white md:flex-1 p-6 md:p-12 rounded-3xl">
            <h2 className="text-xl md:text-2xl font-medium">
              {userData.empId}
            </h2>
            <h1 className="text-2xl md:text-3xl font-black">{userData.name}</h1>
            <h3 className="text-lg md:text-xl font-extralight text-opacity-70">
              {userData.post}
            </h3>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="underline text-lg md:text-xl italic font-thin dark:text-white">
            Other Users on the portal
          </h1>
          {users
            .filter((user) => user.empId !== userData.empId)
            .map((user) => (
              <div
                key={user.empId}
                className="bg-white rounded-3xl p-4 text-base md:text-lg grid grid-cols-1 xl:grid-cols-3"
              >
                <div className="md:col-span-1">{user.name}</div>
                <div className="md:col-span-1">{user.post}</div>
                <div className="md:col-span-1">{user.email}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
