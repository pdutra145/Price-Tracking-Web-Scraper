import { useState, useEffect } from "react";

export default function useProducts() {
  const prodsURL = "http://localhost:8393/products/results";
  const productOptions = {
    providers: ["Amazon BR", "Mercado Libre", "Amazon US"],
  };
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    try {
      console.log(`Sending request to ${prodsURL}`);
      const response = await fetch("http://localhost:8393/products/results", {
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

      setProducts(data.results.length > 0 ? data.results : []);
      return data.results;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, productOptions };
}
