import React from "react";
import Navbar from "../components/Navbar";
import SearchProduct from "../components/Search";

const searchOptions = ["Amazon"];

const Dashboard = () => {
  return (
    <Navbar header="Dashboard">
      <section id="search-bar" className="mx-36">
        <SearchProduct
          title="Search a Product"
          selectLabel="Provider"
          options={searchOptions}
        />
      </section>
      <section></section>
    </Navbar>
  );
};

export default Dashboard;
