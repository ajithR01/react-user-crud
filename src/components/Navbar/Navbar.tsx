import React from "react";
import DesktopNavbar from "./Desktop/Desktop";
import MobileNavbar from "./Mobile/Mobile";

const Navbar: React.FC<{ search: string; setSearch: (value: string) => void }> = ({ search, setSearch }) => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopNavbar search={search} setSearch={setSearch} />
      </div>
      <div className="block md:hidden">
        <MobileNavbar search={search} setSearch={setSearch} />
      </div>
    </>
  );
};

export default Navbar;
