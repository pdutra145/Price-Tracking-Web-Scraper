import React, { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import SearchProduct from "../components/Search";
import useProducts from "../hooks/Products";
import { LoadingContext } from "../context/Loading";
import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const searchOptions = ["Amazon"];

const cols = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "bg-gray-600 text-white",
    flex: 0.5,
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "Product Name",
    headerClassName: "bg-gray-600 text-white",
    flex: 3,
    headerAlign: "center",
  },
  {
    field: "price",
    headerName: "Price (US$)",
    headerClassName: "bg-gray-600 text-white",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "search_text",
    headerName: "Search Text",
    headerClassName: "bg-gray-600 text-white",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "url",
    headerName: "URL",
    headerClassName: "bg-gray-600 text-white",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "source",
    headerName: "Source",
    headerClassName: "bg-gray-600 text-white",
    flex: 1,
    headerAlign: "center",
  },
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
        <h1 className="text-start p-5 font-bold">All Products</h1>
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
          />
        ) : (
          "Nenhum Produto Encontrado"
        )}
      </section>
    </Navbar>
  );
};

export default Dashboard;
