import React, { useReducer } from "react";
import axios from "axios";

export const collectionContext = React.createContext();
const INIT_STATE = {
  collection: [],
  collectionCount: 0,
};

const API = " http://localhost:8000/main-collection";

let count = 0;
if (window.innerWidth < 321) {
  count = 4;
} else {
  count = 8;
}
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        collection: action.payload.data,
        collectionCount: Math.ceil(
          action.payload.headers["x-total-count"] / count
        ),
      };
    default:
      return state;
  }
};

const CollectionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  async function getCollection() {
    let result = await axios(`${API}${window.location.search}`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: result,
    });
  }
  return (
    <collectionContext.Provider
      value={{
        collection: state.collection,
        collectionCount: state.collectionCount,
        getCollection,
      }}
    >
      {children}
    </collectionContext.Provider>
  );
};

export default CollectionContextProvider;
