import React from "react";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaShareAlt,
  FaHeart,
} from "react-icons/fa";
import arrow from "../assets/arrow.png";
import connect from "../assets/connect.png";
import video from "../assets/video.png";
import image from "../assets/image.png";

const PropertyList = ({ properties }) => {
  return (
    <div className=" layout flex flex-wrap gap-6 justify-center">
      {properties.map((property) => (
        <div
          key={property.id}
          className="rounded-2xl shadow-md overflow-hidden bg-white w-full sm:w-[48%] lg:w-[32%]"
        >
          <div className="relative h-56 w-full">
            <img
              src={property.image}
              alt={property.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute top-3 left-3 flex md:gap-52 gap-2 ">
              {property.tags?.map((tag, i) => (
                <span
                  key={i}
                  className={`px-2 py-1 w-[96.49481201171875px] h-[36.1855583190918px] text-center rounded-[2.89px] ${
                    tag === "Featured"
                      ? "bg-[#3D9970] text-white"
                      : "bg-[#D3D3D3B2] text-white"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div> 


            <div className="absolute bottom-3 right-3 flex gap-2">
              <button className="p-2 bg-opacity-70 text-white rounded hover:bg-opacity-90">
                <img src={connect} alt="string" />
              </button>
              <button className="p-2 bg-opacity-70 text-white rounded hover:bg-opacity-90">
                <img src={video} alt="video" />
              </button>
              <button className="p-2 bg-opacity-70 text-white rounded hover:bg-opacity-90">
                <img src={image} alt="image" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-lg">{property.title}</h3>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FaMapMarkerAlt className="text-red-500" />
              {property.location}
            </p>

            <div className="flex gap-6 text-gray-600 text-sm mt-2">
              <span className="flex items-center gap-1">
                <FaBed /> {property.bedrooms} Bedrooms
              </span>
              <span className="flex items-center gap-1">
                <FaBath /> {property.bathrooms} Bathrooms
              </span>
            </div>

            <div className="flex justify-between items-center border-t pt-3 mt-3 border-gray-300">
              <p className="text-blue-600 font-bold">{property.price}</p>
              <div className="flex gap-3">
                <button>
                  <img src={arrow} alt="arrow" className="w-6 h-6" />
                </button>
                <button className="text-gray-400 hover:text-blue-600">
                  <FaShareAlt />
                </button>
                <button className="text-gray-400 hover:text-red-500">
                  <FaHeart />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
