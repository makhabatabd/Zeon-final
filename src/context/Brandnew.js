import React, { useReducer } from "react";
import axios from "axios";

export const newContext = React.createContext();

const INIT_STATE = {
  newClothes: [],
};

const API = " http://localhost:8000/new";

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        newClothes: action.payload.data,
      };
    default:
      return state;
  }
};

const NewContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  async function getNew() {
    let result = await axios(`${API}${window.location.search}`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: result,
    });
  }
  return (
    <newContext.Provider
      value={{
        newClothes: state.newClothes,
        getNew,
      }}
    >
      {children}
    </newContext.Provider>
  );
};

export default NewContextProvider;
