import React, { useState } from "react";
import Hero from "../components/Hero";
import Header from "../components/Header";
import PropertyForm from "../components/PropertyForm";
import Discover from "../components/Discover";
import Footer from "../components/Footer";

const HomePage = () => {
  const [properties, setProperties] = useState([]); // 👈 actual data from backend

  return (
    <div>
      <div className="hero max-h-[960px] h-screen ">
        <Header />
        {/* Hero fetches from backend and updates parent */}
        <Hero setProperties={setProperties} />
      </div>

      {/* PropertyForm now receives properties */}
      <PropertyForm properties={properties} />

      <Discover />
      <Footer />
    </div>
  );
};

export default HomePage;
