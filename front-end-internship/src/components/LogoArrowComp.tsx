import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

const LogoArrowComp = () => {
  return (
    <>
      <div className="absolute top-[15px] left-[15px]">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 5H75V75H5V5ZM0 0V80H80V0H0Z" fill="#222222" />
          <path d="M60 55H41.6667V60H60V55Z" fill="#222222" />
          <path
            d="M25 60V42.5H41.6667V37.5H25V25H41.6667V20H20V60H25Z"
            fill="#222222"
          />
        </svg>
      </div>
      <NavLink to="/" className="font-medium absolute top-4 rest:right-[2%] right-[65%] flex ">
        <ArrowLeft />
        <div className="pl-2">Back to list </div>
      </NavLink>
    </>
  );
};

export default LogoArrowComp;
