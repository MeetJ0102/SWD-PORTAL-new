import React, { useState, useEffect } from "react";
import ThemeToggler from "./ThemeToggler";
import { Input } from "./ui/input";
import Image from "next/image";
import { Search } from "lucide-react";
const Navbar = ({ setActive, search, setSearch, token }) => {
  const [userData, setUserData] = useState({ name: "", post: "", image: "" });
  useEffect(() => {
    if (token) {
      setUserData({
        name: token.name,
        post: token.post,
        image: token.name + ".jpg",
      });
    }
  }, [token]);

  function handleSearch(e) {
    setActive("View");
    setSearch(e.target.value);
  }

  return (
    <div className="flex md:flex-row items-center gap-6 font-sans">
      <div className="relative flex flex-1 sm:hidden items-center ">
        <Input
          id="Search"
          className="rounded-3xl text-base font-semibold px-4 flex-1 max-w-full pr-12 "
          type="text"
          name="regNumber"
          placeholder="Reg. Number"
          value={search}
          onChange={(e) => handleSearch(e)}
        />
        <Search size={25} className="absolute right-4 text-muted-foreground" />
      </div>
      <div className="relative hidden sm:flex flex-1 items-center ">
        <Input
          id="Search"
          className="rounded-3xl text-base font-semibold px-4 flex-1 max-w-full pr-12 "
          type="text"
          name="regNumber"
          placeholder="Search by Registration Number"
          value={search}
          onChange={(e) => handleSearch(e)}
        />
        <Search size={25} className="absolute right-4 text-muted-foreground" />
      </div>
      <div className="hidden items-center gap-2 md:justify-end md:flex">
        {userData.image ? (
          <div className="flex items-center mr-2">
            <Image
              loading="lazy"
              width={50}
              height={50}
              alt="User Image"
              src={`/${userData.name}.jpg`}
              className="rounded-full border-primary border-4"
            />
            <div className="flex flex-col ml-2 items-center">
              <div className="font-medium text-base ">{userData.name}</div>
              <div className="font-normal text-sm">{userData.post}</div>
            </div>
          </div>
        ) : null}
      </div>
      <ThemeToggler className="ml-2" />
    </div>
  );
};

export default Navbar;
