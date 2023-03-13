import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { submitAPI } from "src/api/service";
import Cookies from 'universal-cookie';
import FormData from 'form-data';


export interface Item {
  id: string | number;
  price: number;
  quantity?: number;
  [key: string]: any;
}
interface CartProviderState {
  addItemToCart: any;
  removeItemFromCart: any;
  items: Array<Item>
  total: number;
  isEmpty: boolean;
  handleReload: any;
  isReload: boolean;
  numberOfItems: number;
  charges: any;
  getItemFromCart: any;
  checkOutCart: any
}
export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined
);

cartContext.displayName = "CartContext";

export const useCart = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};



export const CartProvider: React.FC = (props) => {

  const cookies = new Cookies();
  const userId = cookies.get('userId')
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [isEmpty, setIsEmpty] = useState(true);
  const [isReload, setIsReload] = useState(true);
  const [numberOfItems, setNumberOfItems] = useState(0)
  const [counter, setCounter] = useState(0)
  const [charges, setCharges] = useState({
    shipping: 0,
    tax: 0
  })
  const router = useRouter();

  const handleReload = (value: boolean) => {
    setIsReload(value);
  }

  const addItemToCart = async (productId: number, quantity: number) => {
    if (cookies.get('userId') !== undefined && cookies.get('userId') !== null && cookies.get('userId') !== "") {
      let data = new FormData();
      data.append('user_id', userId);
      data.append('product_id', productId);
      data.append('qty', quantity);

      const isProductAdded: any = await submitAPI(data, "POST", "cart/add", { 'Content-Type': 'multipart/form-data' });
      if (isProductAdded.success) {
        setIsReload(!isReload);
        getItemFromCart()
        setCounter(oldCount => oldCount + 1)
        return ({ success: true, msg: "Item added into bag", data: [], error: "" })
      } else {
        return ({ success: false, msg: isProductAdded.message, data: [], error: "" })
      }
    } else {
      const oldItems: any = JSON.parse(localStorage.getItem('itemsArray')) || [];
      oldItems.push({ productId, quantity })
      localStorage.setItem('itemsArray', JSON.stringify(oldItems));
      localStorage.setItem('oldPath', window.location.pathname);
      return ({ success: false, msg: "Please logIn to add item in bag", data: [], error: "" })
    }
  }

  const removeItemFromCart = async (productId: number, quantity: number) => {
    if (cookies.get('userId')) {
      let data = new FormData();
      data.append('product_id', productId);
      data.append('user_id', userId);
      data.append('qty', quantity);
      const isProductAdded: any = await submitAPI(data, "POST", "cart/quantity", { 'Content-Type': 'multipart/form-data' });
      if (isProductAdded.success) {
        getItemFromCart()
        setIsReload(!isReload);
        setCounter(oldCount => oldCount + 1)
        return ({ success: true, msg: "Item added into bag", data: [], error: "" })
      } else {
        return ({ success: false, msg: isProductAdded.message, data: [], error: "" })
      }
    } else {

      return ({ success: false, msg: "Please logIn to add item in bag", data: [], error: "" })
    }
  }

  const checkOutCart = async (data: any, Authorization: any) => {
    const isCheckedOut = await submitAPI(data, "POST", "order/placed", { Authorization, 'Content-Type': 'multipart/form-data' });
    getItemFromCart();
    setIsReload(!isReload);
    setCounter(0)
    return isCheckedOut;
  }

  const getItemFromCart = useCallback(async () => {
    if (cookies.get('userId')) {
      let data = new FormData();
      console.log("userId", userId)
      data.append('user_id', userId);
      const isProductAdded: any = await submitAPI(data, "POST", "cart/list", { 'Content-Type': 'multipart/form-data' });
      console.log("isProductAdded", isProductAdded)
      if (isProductAdded.success && "cart" in isProductAdded.data) {
        const itemsArr: any = [];
        setTotal(isProductAdded.data.sub_total);
        setCharges({
          shipping: isProductAdded.data.shipping_rate,
          tax: isProductAdded.data.tax
        })
        isProductAdded.data.cart.length ? setIsEmpty(false) : setIsEmpty(true);
        isProductAdded.data.cart.length && isProductAdded.data.cart.map((item: any) => {
          let obj = {
            image: item.image_small,
            id: item.product_id,
            slug: item.product_slug,
            name: item.product_name,
            attributes: item?.product_attributes ? item.product_attributes : "",
            price: item.base_price,
            itemTotal: item.total_price,
            quantity: item.qty
          }
          itemsArr.push(obj)
        })
        setItems(itemsArr);
        setNumberOfItems(itemsArr.length)
        return ({ success: true, msg: "Got Data", data: itemsArr, total: isProductAdded.data.sub_total, error: "" })
      } else {
        setItems([]);
        setCharges({
          shipping: 0,
          tax: 0
        })
        setTotal(0)
        setNumberOfItems(0)
        return ({ success: false, msg: "Data not found", data: [], total: 0, error: "" })
      }
    } else {
      console.log("cant find the user")
    }
  }, [addItemToCart, removeItemFromCart, isReload]);

  useEffect(() => {
    let isAPISubscribed = true;

    if (isAPISubscribed) {
      getItemFromCart()
    }
    return () => {
      isAPISubscribed = false
    }
  }, [cookies.get('userId')]);

  const value = {
    items,
    total,
    isReload,
    isEmpty,
    addItemToCart,
    removeItemFromCart,
    handleReload,
    numberOfItems,
    charges,
    getItemFromCart,
    checkOutCart,
  }
  return <cartContext.Provider value={value} {...props} />;
};
