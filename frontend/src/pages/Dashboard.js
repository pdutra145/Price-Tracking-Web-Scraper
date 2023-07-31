import React, { useEffect, useContext, useMemo } from "react";
import Navbar from "../components/Navbar";
import SearchProduct from "../components/Search";
import useProducts from "../hooks/Products";
import { LoadingContext } from "../context/Loading";
import { AuthContext } from "../context/Auth";
import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const searchOptions = ["Amazon - BR"];

const Dashboard = () => {
  const { products, fetchProducts } = useProducts();
  const { loading, setLoading } = useContext(LoadingContext);
  const { userInfo } = useContext(AuthContext)
  const navigate = useNavigate()

  console.log(userInfo)

  useEffect(() => {
    fetchProducts()
  }, [])

  const cols = useMemo(() => [
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
      field: "price",
      headerName: `Preço (${userInfo.searchOption.currency})`,
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
  ], [userInfo]);

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
        {products.length > 0 ? (
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
