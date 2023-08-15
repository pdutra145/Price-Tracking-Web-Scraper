import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchProduct from "../components/Search";
import { LoadingContext } from "../context/Loading";
import { CircularProgress, Grid, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLoaderData, useNavigate } from "react-router-dom";

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
    headerName: "Product",
    headerClassName: "bg-gray-600 text-white",
    flex: 5,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "price_value",
    headerName: `Price`,
    headerClassName: "bg-gray-600 text-white",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "search_text",
    headerName: "Search Text",
    headerClassName: "bg-gray-600 text-white",
    flex: 2.5,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "url",
    headerName: "URL",
    headerClassName: "bg-gray-600 text-white",
    flex: 3,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "source",
    headerName: "Origin",
    headerClassName: "bg-gray-600 text-white",
    flex: 3,
    sortable: false,
    headerAlign: "center",
  },
];

export const loader = async () => {
  try {
    console.log(`Sending request to ${process.env.REACT_APP_PRODUCTS_URL}`);
    const response = await fetch(process.env.REACT_APP_PRODUCTS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.status === 404) {
      console.log(`Error in fetching products ${response.statusText}`);
      return;
    }

    console.log(`Response Message: ${data.message}`);

    return data.results;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const Dashboard = () => {
  // const { products, setProducts } = useProducts();
  const { loading, setLoading } = useContext(LoadingContext);
  const data = useLoaderData();
  const navigate = useNavigate();

  console.log(data);

  // useEffect(() => {
  //   setProducts(data);
  // });

  const handleRowClick = (params) => {
    navigate(`/products/${params.id}`);
  };

  return (
    <Navbar header="Dashboard" id={"navbar"}>
      {loading && <CircularProgress />}
      <Grid
        container
        item
        xs={12}
        justifyContent={"center"}
        marginTop={5}
        id="search-bar"
      >
        <SearchProduct title="Search Product" selectLabel="Provider" />
      </Grid>
      <Grid item xs={8} id="products" textAlign={"center"}>
        <Typography
          variant="h6"
          component={"h2"}
          fontWeight={"bold"}
          textAlign={"start"}
          marginTop={5}
          // padding={5}
        >
          Searched Products
        </Typography>
        <Box marginY={5}>
          {!loading ? (
            <DataGrid
              columns={cols}
              rows={data}
              onRowClick={handleRowClick}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          ) : (
            "No Product Results"
          )}
        </Box>
      </Grid>
    </Navbar>
  );
};

export default Dashboard;
