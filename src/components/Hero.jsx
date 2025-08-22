import React, { useState } from "react";
import axiosInstance from "../api/Axios";


const Hero = ({ setProperties }) => {
  const [bedrooms, setBedrooms] = useState(0);
  const [location, setLocation] = useState("");

  const increment = () => setBedrooms(bedrooms + 1);
  const decrement = () => {
    if (bedrooms > 0) setBedrooms(bedrooms - 1);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      // ✅ call backend through axios instance
      const response = await axiosInstance.get("/properties", {
        params: {
          location,
          beds: bedrooms,
        },
      });

      if (setProperties && response.data.success) {
        setProperties(response.data.data);
      } else {
        console.warn("No properties found or backend error.");
      }
    } catch (error) {
      console.error("Error fetching properties:", error.message);
    }
  };

  return (
    <div className="layout px-4">
      {/* Heading */}
      <div className="text-center text-white mt-[60px] lg:mt-[120px] lg:mb-[50px]">
        <h1 className="font-bold text-[32px] sm:text-[48px] lg:text-[68px] leading-tight">
          Browse Our Properties
        </h1>
        <p className="text-[16px] sm:text-[20px] lg:text-[26px] max-w-[784px] mx-auto mt-3">
          Find your perfect home among our curated properties. Start browsing
          now!
        </p>
      </div>

      {/* Search form */}
      <div className="bg-[#FFFFFF33] lg:h-[135px] px-5">
        <form
          onSubmit={handleSearch}
          className="flex flex-col lg:flex-row items-stretch lg:h-[85px] max-w-[1240px] mx-auto w-full bg-white rounded-[10px] mt-8 lg:mt-16 text-black overflow-hidden shadow-md"
        >
          {/* LOCATION */}
          <div className="flex-1 min-w-[250px] border-b lg:border-b-0 lg:border-r border-gray-300 p-3">
            <label
              htmlFor="location"
              className="font-semibold block mb-2 text-center text-sm sm:text-base"
            >
              LOCATION
            </label>
            <input
              type="text"
              id="location"
              placeholder="eg. Gbagada"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full outline-none placeholder:text-[#787878] text-center text-sm sm:text-base"
            />
          </div>

          {/* PROPERTY TYPE */}
          <div className="flex-1 min-w-[250px] border-b lg:border-b-0 lg:border-r border-gray-300 p-3">
            <label
              htmlFor="ptype"
              className="font-semibold block mb-2 text-center text-sm sm:text-base"
            >
              PROPERTY TYPE
            </label>
            <input
              type="text"
              id="ptype"
              placeholder="eg. Duplex, Bedroom Flat"
              className="w-full outline-none placeholder:text-[#787878] text-center text-sm sm:text-base"
            />
          </div>

          {/* BEDROOM */}
          <div className="flex-1 min-w-[200px] border-b lg:border-b-0 border-gray-300 p-3">
            <label
              htmlFor="bedroom"
              className="font-semibold block mb-2 text-center text-sm sm:text-base"
            >
              BEDROOM
            </label>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={decrement}
                className="w-8 h-8 flex items-center justify-center border rounded-full"
              >
                -
              </button>
              <span className="text-[15px] font-medium">{bedrooms}</span>
              <button
                type="button"
                onClick={increment}
                className="w-8 h-8 flex items-center justify-center border rounded-full"
              >
                +
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full lg:w-[250px] bg-[#3D9970] hover:bg-[#2e7b5d] text-white font-semibold px-4 py-4 lg:py-0 text-[16px] sm:text-[18px] transition"
          >
            Find Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;