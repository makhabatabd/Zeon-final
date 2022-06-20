import React, { useReducer } from "react";
import axios from "axios";

const INIT_STATE = {
  data: [],
};

let count = 0;
if (window.innerWidth < 321) {
  count = 4;
} else {
  count = 12;
}

export const allContext = React.createContext();
const API = "http://localhost:8000/";

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

const AllContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function getAllProducts() {
    const summer = `${API}summer`;
    const hits = `${API}hits`;
    const brandNew = `${API}brandnew`;
    const requestOne = await axios.get(summer).then((json) => json.data);
    const requestTwo = await axios.get(hits).then((json) => json.data);
    const requestThree = await axios.get(brandNew).then((json) => json.data);
    let all = await axios.all([requestOne, requestTwo, requestThree]);
    dispatch({
      type: "GET_ALL_PRODUCTS",
      payload: all,
    });
  }

  return (
    <allContext.Provider
      value={{
        getAllProducts,
        data: state.data,
      }}
    >
      {children}
    </allContext.Provider>
  );
};

export default AllContextProvider;
