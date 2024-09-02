// src/api/umsApi.js
import axiosInstance from "./axiosInstance";
import StringUtil from "util/stringUtil"; // Ensure the path is correct and matches the file location

const URL = {
  getOrderingReport: "Reports/GetOrderingReportNew",
};

export const getOrderingReport = async (obj) => {
  const params = {
    StartDate: obj.StartDate,
    EndDate: obj.EndDate,
    Operation: obj.Operation,
    PageIndex: obj.PageIndex,
    PageSize: obj.PageSize,
  };
  try {
    //
    const response = await axiosInstance.get(URL.getOrderingReport, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
