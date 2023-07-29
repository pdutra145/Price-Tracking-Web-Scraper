import React, { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import SearchProduct from "../components/Search";
import useProducts from "../hooks/Products";
import { LoadingContext } from "../context/Loading";
import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const searchOptions = ["Amazon"];

const cols = [
  { field: "ID", headerName: "ID" },
  { field: "name", headerName: "Product Name", width: 70 },
  { field: "price", headerName: "Price (US$)", width: 140 },
  { field: "search_text", headerName: "Search Text", width: 140 },
];

const Dashboard = () => {
  const { products, fetchProducts } = useProducts();
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    fetchProducts();
    console.log(products);
  }, []);

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
      <section id="products" className="my-10 text-center">
        {products.length > 0 ? (
          <DataGrid
            columns={cols}
            rows={products}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        ) : (
          "Nenhum Produto Encontrado"
        )}
      </section>
    </Navbar>
  );
};

export default Dashboard;
