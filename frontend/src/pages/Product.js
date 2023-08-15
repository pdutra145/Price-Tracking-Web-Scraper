import React, { useMemo } from "react";
import Navbar from "../components/Navbar";
import useProducts from "../hooks/Products";
import { useParams, Link, useLoaderData } from "react-router-dom";
import { Box, Grid, styled } from "@mui/material";
import { ProductPageButton as Button } from "../components/Button";
import { indigo } from "@mui/material/colors";
import DashboardLink from "../components/DashboardLink";
import axios from "axios";

const MainGrid = styled(Grid)({
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
});

const Header = styled("h3")({
  textAlign: "center",
  color: indigo[700],
  fontWeight: "bold",
  fontSize: "1.25rem",
  marginBottom: "5px",
});

const ProductInfo = styled("p")({
  // margin: "1rem 0",
  fontSize: "1rem",
  textAlign: "center",
});

export const loader = async ({ params }) => {
  try {
    const res = await axios.get(
      `http://localhost:8393/products/results/${params.id}`
    );

    console.log(res);

    return res.data.product;
  } catch (error) {
    console.log(error);
  }
};

// export const action = async () => {
//   try {
//     const product = await axios.get(
//       `http://localhost:8393/products/${params.id}`
//     );

//     console.log(product);

//     return product;
//   } catch (error) {
//     console.log(error);
//   }
// };

const ProductPage = () => {
  // const { products } = useProducts();
  // const { id } = useParams();

  // const product = useMemo(
  //   () => products.find((prod) => prod.id === parseInt(id)),
  //   [products, id]
  // );

  const product = useLoaderData();

  console.log(product);

  return (
    <Navbar header="Detalhes do Produto">
      {!product && <h1 className="text-center m-10">Product not found</h1>}
      {product && (
        <Box component={"section"} marginTop={5} id="product-details">
          <DashboardLink />
          <MainGrid container spacing={6}>
            <Grid item sm={12} lg={6} id="img-div" my={5}>
              {" "}
              <img
                src={product.img}
                alt={product.name}
                className="rounded-md border-2"
              />
            </Grid>
            <Grid
              container
              spacing={6}
              lg={6}
              alignItems={"center"}
              justifyContent={"center"}
              id="product-div"
              textAlign={"center"}
            >
              <Grid item lg={12}>
                <Header>Product:</Header>
                <ProductInfo>{product.name}</ProductInfo>
              </Grid>
              <Grid item lg={12}>
                <Header>Price:</Header>
                <ProductInfo>{product.price_value}</ProductInfo>
              </Grid>
              <Grid item lg={12}>
                <Header>Search Date:</Header>
                <ProductInfo>
                  {new Date(product.created_at).toLocaleDateString()}
                </ProductInfo>
              </Grid>
            </Grid>

            <Grid item lg={12} id="url-div">
              <Button>
                <a
                  href={product.source + product.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  See Product
                </a>
              </Button>
            </Grid>
          </MainGrid>
        </Box>
      )}
    </Navbar>
  );
};

export default ProductPage;
