import React, { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import SearchProduct from "../components/Search";
import useProducts from "../hooks/Products";
import { LoadingContext } from "../context/Loading";
import { CircularProgress } from "@mui/material";

const searchOptions = ["Amazon"];

const Dashboard = () => {
  const { products, fetchProducts } = useProducts();
  const { loading } = useContext(LoadingContext);

  useEffect(() => {
    fetchProducts();
  }, [products, fetchProducts]);

  return (
    <Navbar header="Dashboard">
      {loading && <CircularProgress />}
      <section id="search-bar" className="mx-36">
        <SearchProduct
          title="Search a Product"
          selectLabel="Provider"
          options={searchOptions}
        />
      </section>
      <section id="products">
        <ul>{products && products.map((prod) => prod.title)}</ul>
      </section>
    </Navbar>
  );
};

export default Dashboard;
