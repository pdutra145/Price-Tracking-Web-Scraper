import React from "react";
import Navbar from "../components/Navbar";
import SearchProduct from "../components/Search";

const Dashboard = () => {
  return (
    <Navbar header="Dashboard">
      <div className="mx-36">
        <SearchProduct
          title="Search a Product"
          selectLabel="Provider"
          options={["Amazon"]}
        />
      </div>
    </Navbar>
  );
};

export default Dashboard;
