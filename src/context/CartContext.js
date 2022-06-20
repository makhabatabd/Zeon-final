// import React, { useReducer } from "react";
// import {
//   calcTotalPrice,
//   calcSubPrice,
//   calcDiscount,
//   totalCount,
//   calcDisc,
// } from "../components/helpers/calcPrice";

// export const cartContext = React.createContext();

// const INIT_STATE = {
//   cart: {},
//   cartLength: 0,
// };

// const reducer = (state = INIT_STATE, action) => {
//   switch (action.type) {
//     case "GET_CART":
//       return {
//         ...state,
//         cart: action.payload,
//         cartLength: action.payload.products.length,
//       };
//     default:
//       return state;
//   }
// };

// const CartContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, INIT_STATE);
//   function getCart() {
//     let cart = JSON.parse(localStorage.getItem("cart"));
//     if (!cart) {
//       cart = {
//         products: [],
//         totalPrice: 0,
//         cartDiscount: 0,
//         totalCount: 0,
//       };
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }
//     cart.totalPrice = calcTotalPrice(cart.products);
//     cart.cartDiscount = calcDiscount(cart.products);
//     dispatch({
//       type: "GET_CART",
//       payload: cart,
//     });
//   }
//   function addProductToCart(product) {
//     let cart = JSON.parse(localStorage.getItem("cart"));
//     if (!cart) {
//       cart = {
//         products: [],
//         totalPrice: 0,
//         cartDiscount: 0,
//       };
//     }
//     let newProduct = {
//       item: product,
//       subPrice: product.price,
//       discount: Math.ceil(
//         product.price -
//           (product.price - (product.price * product.discount) / 100)
//       ),
//       count: 1,
//     };
//     let isProductInCart = cart.products.some(
//       (item) => item.item.color == product.color && item.item.id == product.id
//     );
//     if (isProductInCart) {
//       cart.products = cart.products.filter(
//         (item) => item.item.color != product.color && item.item.id != product.id
//       );
//     } else {
//       cart.products.push(newProduct);
//     }
//     cart.totalPrice = calcTotalPrice(cart.products);
//     cart.cartDiscount = calcDiscount(cart.products);
//     cart.totalCount = totalCount(cart.products);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     getCart();
//   }

//   function checkItemInCart(id, color) {
//     let cart = JSON.parse(localStorage.getItem("cart"));
//     if (!cart) {
//       cart = {
//         products: [],
//         totalPrice: 0,
//         cartDiscount: 0,
//       };
//     }
//     let isProductInCart = cart.products.some(
//       (item) => item.item.id == id && item.item.color == color
//     );
//     return isProductInCart;
//   }

//   const isProdInCart = (id) => {
//     let cart = JSON.parse(localStorage.getItem("cart"));
//     if (!cart) {
//       cart = {
//         products: [],
//         totalPrice: 0,
//         cartDiscount: 0,
//       };
//     }

//     let array = [];
//     let exist = cart.products.map((obj) => {
//       return obj.item.id === id && array.push(obj);
//     });
//     return array;
//   };

//   function deleteFromCart(id, color) {
//     let cart = JSON.parse(localStorage.getItem("cart"));
//     if (!cart) {
//       cart = {
//         products: [],
//         totalPrice: 0,
//         cartDiscount: 0,
//       };
//     }
//     const index = cart.products.findIndex(
//       (item) => item.item.id === id && item.item.color === color
//     );
//     cart.products.splice(index, 1);

//     cart.totalCount = totalCount(cart.products);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     getCart();
//   }

//   function changeProductCount(count, color, id) {
//     if (count <= 0) {
//       count = 1;
//     }
//     let cart = JSON.parse(localStorage.getItem("cart"));
//     cart.products = cart.products.map((item) => {
//       if (item.item.color === color && item.item.id === id) {
//         item.count = count;
//         item.discount = calcDisc(item);
//         item.subPrice = calcSubPrice(item);
//       }
//       return item;
//     });
//     cart.totalPrice = calcTotalPrice(cart.products);
//     cart.cartDiscount = calcDiscount(cart.products);
//     cart.totalCount = totalCount(cart.products);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     getCart();
//   }

//   function deleteAll() {
//     localStorage.removeItem("cart");
//   }

//   return (
//     <cartContext.Provider
//       value={{
//         cartLength: state.cartLength,
//         cart: state.cart,
//         getCart,
//         addProductToCart,
//         checkItemInCart,
//         deleteFromCart,
//         changeProductCount,
//         deleteAll,
//         isProdInCart,
//       }}
//     >
//       {children}
//     </cartContext.Provider>
//   );
// };
// export default CartContextProvider;

import React, { useContext, useReducer } from "react";
import { summerContext } from "./SummerCollection";
import { authContext } from "./authContext";
export const cartContext = React.createContext();

const CartContextProvider = ({ children }) => {
  const { users, getUser } = useContext(summerContext);
  const { currentUser } = useContext(authContext);

  const isProdInCart = (id, color) => {
    let exist = users?.carts?.some((obj) => {
      return obj.id === id && obj.color === color;
    });
    return exist;
  };

  const isProd = (id) => {
    let array = [];
    let exist = users?.carts?.map((obj) => {
      return obj.id === id && array.push(obj);
    });
    return array;
  };

  return (
    <cartContext.Provider
      value={{
        isProdInCart,
        isProd,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
export default CartContextProvider;
