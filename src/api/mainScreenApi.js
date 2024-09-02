// src/api/umsApi.js
import axiosInstance from "./axiosInstance";

const URL = {
  getOrdersNew: "MainScreen/GetOrdersNew",
  getAssosiatedOrders: "MainScreen/GetAssociatedOrdersNew",
  getRegularOrderDetails: "EditHeader/EditReceiptHeader",
  getCreditOrderDetails: "EditHeader/EditCreditHeader",
  getAllOrderDetails: "EditHeader/GetEditHeaderDetail",
};

export const getOrdersNew = async (obj) => {
  try {
    const response = await axiosInstance.post(URL.getOrdersNew, obj);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAssosiatedOrder = async (obj) => {
  try {
    const queryParams = new URLSearchParams(obj).toString();
    const url = `${URL.getAssosiatedOrders}?${queryParams}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getRegularOrderDetails = async (obj) => {
  debugger;
  try {
    const queryParams = new URLSearchParams(obj).toString();
    const url = `${URL.getRegularOrderDetails}?${queryParams}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getCreditOrderDetails = async (obj) => {
  debugger;
  try {
    const queryParams = new URLSearchParams(obj).toString();
    const url = `${URL.getRegularOrderDetails}?${queryParams}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllOrderDetails = async (obj) => {
 
  try {
    const queryParams = new URLSearchParams(obj).toString();
    const url = `${URL.getAllOrderDetails}?${queryParams}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
