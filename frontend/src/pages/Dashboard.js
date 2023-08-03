import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import SearchProduct from "../components/Search";
import useProducts from "../hooks/Products";
import { LoadingContext } from "../context/Loading";
import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const searchOptions = ["Amazon - BR"];

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
    headerName: "Produto",
    headerClassName: "bg-gray-600 text-white",
    flex: 3,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "price_value",
    headerName: `Preço`,
    headerClassName: "bg-gray-600 text-white",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "search_text",
    headerName: "Texto de Pesquisa",
    headerClassName: "bg-gray-600 text-white",
    flex: 1,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "url",
    headerName: "URL",
    headerClassName: "bg-gray-600 text-white",
    flex: 1,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "source",
    headerName: "Origem",
    headerClassName: "bg-gray-600 text-white",
    flex: 1,
    sortable: false,
    headerAlign: "center",
  },
];

const Dashboard = () => {
  const { products } = useProducts();
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate()

  const handleRowClick = (params) => {
    navigate(`/products/${params.id}`)
  }


  return (
    <Navbar header="Dashboard">
      {loading && <CircularProgress />}
      <section id="search-bar" className="mx-36">
        <SearchProduct
          title="Pesquisar Produto"
          selectLabel="Provider"
          options={searchOptions}
        />
      </section>
      <section id="products" className="my-10 text-center">
        <h1 className="text-start p-5 font-bold">Produtos Pesquisados</h1>
        {products.length > 0 && !loading ? (
          <DataGrid
            columns={cols}
            rows={products}
            onRowClick={handleRowClick}
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
