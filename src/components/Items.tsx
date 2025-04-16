"use client";
import { TABLE_HEADER_LIST } from "@/utils/helper";
import {
  DeleteIcon,
  DownArrow,
  BottomArrow,
  TopArrow
} from "@/utils/icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Items = ({ contentData = [] }: any) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();

  useEffect(() => {
    setData(contentData);
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearch(searchParam);
    }
  }, [contentData || searchParams]);

  const filteredData = data.filter(
    (obj: any) =>
      obj.name?.toLowerCase().includes(search.toLowerCase()) ||
      obj.country?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculation
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (index: number) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleSearchChange = (e: any) => {
    const value = e.target.value;
    setSearch(value);

    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full">
    <div className="border border-[#F1F1F1] bg-white shadow-[0px_16px_53.7px_0px_#4F02FE14] rounded-md pt-2.5 w-full max-w-[969px] max-xl:mx-auto">
      <div>
        <div className="flex justify-between items-center w-full px-[15px] pb-4 max-md:flex-col-reverse max-md:gap-5">
          <div className="flex items-center gap-2.5">
            <p className="text-sm font-medium leading-[100%] text-primary-black">Show</p>
            <div className="flex items-center bg-[#A40A86] cursor-pointer min-w-[59px] justify-center gap-1 rounded-md">
              <select
                onChange={handleItemsPerPageChange}
                value={itemsPerPage}
                className="appearance-none bg-[#A40A86] py-1 px-2 outline-none text-white rounded-sm cursor-pointer"
              >
                <option value="10">10</option>
                <option value="5">5</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>
              <div className="-ml-2">
                <DownArrow />
              </div>
            </div>
            <p className="text-sm font-medium leading-[100%] text-primary-black">Enter per page</p>
          </div>
          <input
            onChange={handleSearchChange}
            type="text"
            placeholder="Find"
            className="w-full max-w-[320px] outline-none py-3 px-4 placeholder:text-primary-black placeholder:text-sm placeholder:font-medium placeholder:leading-[100%] leading-[100%] text-sm font-medium text-primary-black border-[0.8px] border-[#00000033] rounded-full"
          />
        </div>

        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#3F02CB] flex">
                {TABLE_HEADER_LIST.map((obj, i) => (
                  <th
                    key={i}
                    className={`px-[15px] flex items-center justify-between border-r border-[#FFFFFF33] py-2.5 ${i === 0
                      ? "min-w-[90px]"
                      : i === 1
                        ? "min-w-[235px]"
                        : i === 2
                          ? "min-w-[200px]"
                          : i === 3
                            ? "min-w-[175px]"
                            : "min-w-[260px] border-r-0"
                      }`}
                  >
                    <p className="text-sm font-medium text-white leading-[100%]">
                      {obj}
                    </p>
                    <div className="flex flex-col items-center gap-[3px]">
                      <TopArrow />
                      <BottomArrow />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <table>
                    <tbody>
                      {currentItems.map((obj: any, i: number) => (
                        <tr key={i} className="hover:bg-[#FBECF8] duration-300 ease-linear">
                          <td className="pl-[15px] py-[11.5px] min-w-[90px]">
                            <p className="text-xs text-primary-black font-medium leading-[100%]">
                              {obj.alpha_two_code}
                            </p>
                          </td>
                          <td className="pl-[15px] py-[11.5px] min-w-[235px]">
                            <Link
                              href={obj.web_pages}
                              className="text-xs text-primary-black font-medium leading-[100%]"
                            >
                              {obj.web_pages}
                            </Link>
                          </td>
                          <td className="pl-[15px] py-[11.5px] min-w-[200px]">
                            <Link
                              href={obj.domains}
                              className="text-xs text-primary-black font-medium leading-[100%]"
                            >
                              {obj.domains}
                            </Link>
                          </td>
                          <td className="pl-[15px] py-[11.5px] min-w-[175px]">
                            <p className="text-xs text-primary-black font-medium leading-[100%]">
                              {obj.country}
                            </p>
                          </td>
                          <td className="px-[15px] py-[11.5px] min-w-[267px] flex items-center justify-between">
                            <p className="text-xs text-primary-black font-medium leading-[100%]">
                              {obj.name}
                            </p>
                            <button onClick={() => handleDelete(i)} className="cursor-pointer">
                              <DeleteIcon />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="flex justify-end pt-[33px] pb-[62px] max-md:pb-11 max-md:pt-5 pr-5 items-center gap-4 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-[13px] font-semibold text-black bg-white rounded-lg py-2 px-1 cursor-pointer disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-2 py-1 text-sm size-8 rounded-md ${currentPage === index + 1
              ? "bg-[#4F02FE] text-white"
              : "bg-white"
              }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-[13px] font-semibold text-black bg-white rounded-lg py-2 px-1 cursor-pointer disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Items;
