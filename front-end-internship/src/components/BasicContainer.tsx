import React from "react";

interface Props {
  children: React.ReactNode;
  mainPage: boolean | undefined;
}

const BasicContainer: React.FC<Props> = ({ children, mainPage }) => {
  return (
    <div className={`flex flex-col items-center justify-center w-100% h-screen ${mainPage ? "h-fit mt-36" : null}`}>
      <div
        className={`w-3/6 rest:w-[95%] ${
          mainPage ? "rest:relative rest:top-[25%]" : null
        } bg-[#F7F7F7] flex flex-col p-10`}
      >
        {children}
      </div>
    </div>
  );
};

export default BasicContainer;
