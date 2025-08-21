import React, { useState } from "react";
import Hero from "../components/Hero";
import Header from "../components/Header";
import PropertyForm from "../components/PropertyForm";
import Discover from "../components/Discover";
import Footer from "../components/Footer";

const HomePage = () => {
  const [filters, setFilters] = useState(null); // search filters

  return (
    <div>
      <div className="hero max-h-[960px] h-screen ">
        <Header />
        {/* Hero passes filters to parent */}
        <Hero setFilters={setFilters} />
      </div>

      {/* PropertyForm fetches properties based on filters */}
      <PropertyForm filters={filters} />

      <Discover />
      <Footer />
    </div>
  );
};

export default HomePage;
