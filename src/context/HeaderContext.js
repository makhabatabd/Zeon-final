import React, { useReducer } from "react";
import axios from "axios";

export const headerContext = React.createContext();

const INIT_STATE = {
  header: [],
};

const API = " http://localhost:8000/header";

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_HEADER":
      return {
        ...state,
        header: action.payload.data,
      };
    default:
      return state;
  }
};

const HeaderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  async function getHeader() {
    let result = await axios(API);
    dispatch({
      type: "GET_HEADER",
      payload: result,
    });
  }
  return (
    <headerContext.Provider
      value={{
        header: state.header,
        getHeader,
      }}
    >
      {children}
    </headerContext.Provider>
  );
};

export default HeaderContextProvider;
