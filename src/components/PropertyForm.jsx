import React, { useState } from "react";
import allProperties from "../Data/properties";
import PropertyList from "./PropertyList";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

const PropertyForm = () => { 
  const [filters, setFilters] = useState({ location: "", bedrooms: "" });
  const [showFilter, setShowFilter] = useState(false);

  const { location, bedrooms } = filters;

  const filtered = allProperties.filter((prop) => {
    return (
      (!location ||
        prop.location.toLowerCase().includes(location.toLowerCase())) &&
      (!bedrooms || prop.bedrooms >= Number(bedrooms))
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const firstPageCount = 9;
  const itemsPerPage = 6;

  let startIndex, endIndex;
  if (currentPage === 1) {
    startIndex = 0;
    endIndex = firstPageCount;
  } else {
    startIndex = firstPageCount + (currentPage - 2) * itemsPerPage;
    endIndex = startIndex + itemsPerPage;
  }

  const currentProperties = filtered.slice(startIndex, endIndex);

  const totalPages =
    filtered.length <= firstPageCount
      ? 1
      : 1 + Math.ceil((filtered.length - firstPageCount) / itemsPerPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); 
  };

  return (
    <div className="layout max-w-[1240px] mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-6 text-gray-700 gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <button
            className="flex items-center border px-3 py-2 rounded-md text-sm"
            onClick={() => setShowFilter(!showFilter)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-1" /> More Filter
          </button>
          <p className="text-sm">
            Showing {startIndex + 1} – {Math.min(endIndex, filtered.length)} of{" "}
            {filtered.length} results
          </p>
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          <span className="text-sm">Sort by:</span>
          <select className="border rounded-md px-3 py-2 text-sm hover:border-green-600 transition">
            <option>Default</option>
            <option>Price (Low → High)</option>
            <option>Price (High → Low)</option>
          </select>
        </div>
      </div>

      {showFilter && (
        <div className="border rounded-md p-4 mb-6 bg-gray-50 shadow-sm flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={filters.location}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded-md w-full sm:w-1/2"
          />

          <input
            type="number"
            name="bedrooms"
            placeholder="Min bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded-md w-full sm:w-1/2"
          />
        </div>
      )}

      <PropertyList properties={currentProperties} />

      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="p-2 rounded disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-[#3D9970] text-white" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="p-2 rounded disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PropertyForm;
