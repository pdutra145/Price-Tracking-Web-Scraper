import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";
import useProducts from "../hooks/Products";

const AMAZON = "https://amazon.ca";

export default function SearchProduct(props) {
  const [product, setProduct] = useState("");
  const { userInfo } = useContext(AuthContext);
  const { productOptions } = useProducts();

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      const bodyData = JSON.stringify({
        search_text: product,
        url: AMAZON,
        endpoint: "/products/results",
        user_id: userInfo.id || 1,
      });

      const res = await fetch(process.env.REACT_APP_START_SCRAPER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData,
      });

      console.log(res.status);

      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log(`There was an error in starting the scraper ${error}`);
    }
  };

  return (
    <>
      <label
        htmlFor="product"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.title}
      </label>
      <form
        className="grid grid-cols-12 gap-5 mt-2 rounded-md shadow-sm"
        onSubmit={formHandler}
      >
        {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div> */}
        <input
          type="text"
          name="product"
          id="product"
          className="col-span-9 rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Digíte um Produto"
          onChange={(e) => setProduct(e.target.value)}
          value={product}
        />
        <div className="flex items-center col-span-2">
          <label htmlFor="provider" className="sr-only">
            {props.selectLabel}
          </label>
          <select
            id="provider"
            name="provider"
            className="rounded-md border-0 bg-transparent py-2 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            defaultValue={localStorage.getItem("provider")}
          >
            {productOptions.providers.map((option, idx) => (
              <option key={idx}>{option}</option>
            ))}
          </select>
        </div>
        <button className="flex justify-center items-center bg-blue-300 rounded-md">
          <MagnifyingGlassIcon className="h-6" />
        </button>
      </form>
    </>
  );
}
