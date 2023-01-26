import React from "react";
import { NavLink } from "react-router-dom";
import { Edit3 } from "lucide-react";

interface InternProps {
  id: number;
  name: string;
  email: string;
}

const SignleIntern: React.FC<InternProps> = ({
  id,
  name,
  email,
}: InternProps) => {
  return (
    <div
      key={id}
      className={`${
        id % 2 ? "bg-[#EDEDED]" : "bg-[#F2F2F2]"
      } p-4 flex justify-between rest:flex-col rest:items-center`}
    >
      <div className="flex rest:flex-col">
        <p className="font-medium rest:text-center">{name}</p>
        <p className="pl-4 text-opacity-80">({email})</p>
      </div>{" "}
      <NavLink to={`/interns/${id}`} className="font-medium flex">
        <Edit3 />
        <p className="pl-2">Edit</p>
      </NavLink>
    </div>
  );
};

export default SignleIntern;
