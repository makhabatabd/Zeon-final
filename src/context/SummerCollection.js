import React, { useContext, useReducer } from "react";
import axios from "axios";
import { authContext } from "./authContext";

export const summerContext = React.createContext();
const INIT_STATE = {
  summer: [],
  summerCount: 0,
  oneSummer: null,
  users: {},
};

let count = 0;
if (window.innerWidth < 321) {
  count = 4;
} else {
  count = 12;
}

const API = " http://localhost:8000/summer";
const API_ORDERS = "http://localhost:8000/order";
const API_USERS = " http://localhost:8000/users";

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        summer: action.payload.data,
        summerCount: Math.ceil(action.payload.headers["x-total-count"] / count),
      };
    case "GET_ONE_PRODUCT":
      return {
        ...state,
        oneSummer: action.payload.data,
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.payload.data[0],
      };
    default:
      return state;
  }
};

const SummerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const { currentUser } = useContext(authContext);

  async function getSummer() {
    let result = await axios(`${API}${window.location.search}`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: result,
    });
  }

  async function getUser() {
    let result = await axios.get(`${API_USERS}?user=${currentUser}`);
    dispatch({
      type: "GET_USERS",
      payload: result,
    });
  }

  async function updateCart(id, carts) {
    await axios.patch(`${API_USERS}/${id}`, { carts: carts });
    getUser();
  }

  async function updateOrder(id, orders) {
    await axios.patch(`${API_USERS}/${id}`, { orders: orders });
    getUser();
  }

  async function getOneProduct(id) {
    let result = await axios(`${API}/${id}`);
    dispatch({
      type: "GET_ONE_PRODUCT",
      payload: result,
    });
  }

  return (
    <summerContext.Provider
      value={{
        summer: state.summer,
        users: state.users,
        summerCount: state.summerCount,
        getSummer,
        getOneProduct,
        updateOrder,
        oneSummer: state.oneSummer,
        updateCart,
        getUser,
      }}
    >
      {children}
    </summerContext.Provider>
  );
};

export default SummerContextProvider;
