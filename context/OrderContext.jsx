import { createContext, useContext, useEffect, useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import BaseUrl from "../Api/BaseUrl";

// ✅ إنشاء الـ Context
const OrderContext = createContext();

// ✅ مزود الـ Context
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const id = cookie.get("id");
  const token = cookie.get("token");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        console.error("No token found, skipping API call.");
        return;
      }
      try {
        const response = await axios.get(`${BaseUrl}/api/vi/order/userorder`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
      }
    };

    fetchOrders();
  });

  return (
    <OrderContext.Provider value={{ orders }}>
      {children}
    </OrderContext.Provider>
  );
};

// ✅ Hook لاستخدام البيانات بسهولة في المكونات الأخرى
export const useOrders = () => useContext(OrderContext);
