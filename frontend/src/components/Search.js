import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchProduct(props) {
  return (
    <>
      <label
        htmlFor="product"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.title}
      </label>
      <form className="grid grid-cols-12 gap-5 mt-2 rounded-md shadow-sm">
        {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div> */}
        <input
          type="text"
          name="product"
          id="product"
          className="col-span-10 rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Type a Product"
        />
        <div className="flex items-center">
          <label htmlFor="provider" className="sr-only">
            {props.selectLabel}
          </label>
          <select
            id="provider"
            name="provider"
            className="rounded-md border-0 bg-transparent py-2  text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            {props.options.map((option, idx) => (
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
