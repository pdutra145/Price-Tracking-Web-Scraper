import { useReducer } from "react";

const settingsReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case "set_currency":
      return { ...state, currency: action.payload };
    case "set_provider":
      console.log("in set_provider", action.payload);
      return { ...state, provider: action.payload };
    case "set_url":
      return { ...state, url: action.payload };
    default:
      return state;
  }
};

export default function useSettings() {
  const options = {
    providers: ["Amazon BR", "Mercado Libre", "Amazon US"],
    currencies: ["R$", "US$", "EUR"],
  };
  const [settings, dispatch] = useReducer(settingsReducer, {
    provider: "Amazon US",
    url: "amazon.ca",
    currency: "US$",
  });

  return { settings, dispatch, options };
}
