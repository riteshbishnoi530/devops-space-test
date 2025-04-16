import React from "react";
import Guides from "./Guids";
import Items from "./Items";

const Hero = ({ heroContent }: any) => {
  return (
    <div className="flex items-center justify-center pt-10">
      <div className="w-full max-w-[1240px] mx-auto flex justify-center items-center flex-col">
        <div className="flex px-4 max-sm:flex-col sm:justify-between max-sm:gap-4 w-full">
          <h1 className="text-[32px] max-md:text-2xl font-semibold leading-[100%]">
            My DevOps Spaces
          </h1>
          <button className="py-3.5 px-4 button-bg text-white  rounded-xs cursor-pointer">
            Create a DevOps Space (1 left)
          </button>
        </div>
        <div className="pt-11 flex max-lg:flex-col justify-between items-start w-full">
          <Guides />
          <Items contentData={heroContent} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
