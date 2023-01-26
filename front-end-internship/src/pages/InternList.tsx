import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BasicContainer from "../components/BasicContainer";
import SignleIntern from "../components/SignleIntern";
import { Intern } from "../types/Intern";

export const InternList: React.FC = () => {
  const [interns, setInterns] = useState<Intern[]>([]);

  useEffect(() => {
    const fetchInterns = async () => {
      const response = await fetch("http://localhost:3001/interns");
      const interns: Intern[] = await response.json();
      setInterns(interns);
    };
    fetchInterns();
  }, []);

  return (
    <BasicContainer>
      <div className="absolute top-[2%] left-[2%]">
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
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold">Interns</h2>
        <NavLink
          to={`/addIntern`}
          className="bg-black py-2 px-8 text-white capitalize"
        >
          add Intern
        </NavLink>
      </div>
      <div className="pt-8">
        {interns.map((intern) => (
          <SignleIntern
            key={intern.id}
            id={intern.id}
            name={intern.name}
            email={intern.email}
          />
        ))}
      </div>
    </BasicContainer>
  );
};
