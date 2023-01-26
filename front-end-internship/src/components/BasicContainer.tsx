import React from "react";

interface Props {
  children: React.ReactNode
}

const BasicContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="w-3/6 rest:w-[95%] bg-[#F7F7F7] flex  flex-col p-10">{children}</div>
    </div>
  );
};

export default BasicContainer;
