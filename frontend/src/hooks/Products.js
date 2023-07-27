import axios from "axios";
import { useState, useContext } from "react";
import { LoadingContext } from "../context/Loading";

export default function useProducts() {
  const prodsURL = `http://localhost:8393/products/results`;
  const [products, setProducts] = useState([]);
  const { setLoading } = useContext(LoadingContext);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await axios.get(prodsURL, { withCredentials: true });

      console.log(res.status);

      if (res.status === 404) {
        console.log(`Error in fetching products ${res.statusText}`);
      }

      setProducts(res.data.results);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
    setLoading(false);
  }
  return { fetchProducts, products };
}
