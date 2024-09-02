// src/api/umsApi.js
import axiosInstance from "./axiosInstance";
import StringUtil from "util/stringUtil"; // Ensure the path is correct and matches the file location

const UMS_URL = {
  LoginUser: "Account/GetByLoginUserEmail?username=",
  UserList: "UMS/UserList",
  CreateNewUser: "UMS/SaveUserData",
  DeleteUser: "https://api.gotsystems.net/api/UMS/DeleteUser?UID=",
  DeleteUser: "https://api.gotsystems.net/api/UMS/DeleteUser?UID=",
  GetGroupAndStoreByTypes: "UMS/GetGroupAndStoreByType",
  EditUser: "https://api.gotsystems.net/api/UMS/GetUserById?UID=",
  UpdateUser: "https://api.gotsystems.net/api/UMS/GetUserById?UID=",
};

export const loginUser = async (obj) => {
  try {
    const response = await axiosInstance.get(UMS_URL.LoginUser + obj.email);

    return response.data;
  } catch (error) {
    console.error("Failed to user login:", error);
    throw error; // Handle or rethrow the error as appropriate
  }
};
export const getUserList = async () => {
  try {
    const response = await axiosInstance.get(UMS_URL.UserList);
    return JSON.parse(StringUtil.decompressString(response.data));
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error; // Handle or rethrow the error as appropriate
  }
};

export const createNewUser = async (obj) => {
  try {
    const response = await axiosInstance.post(UMS_URL.CreateNewUser, obj);
    return JSON.parse(StringUtil.decompressString(response.data));
  } catch (error) {
    console.error("Error adding new user:", error);
    throw error; // Handle or rethrow the error as appropriate
  }
};

export const editUser = async (obj) => {
  try {
    const response = await axiosInstance.get(UMS_URL.EditUser + obj);
    return response.data;
  } catch (error) {
    console.error("Getting user data failed:", error);
    throw error; // Handle or rethrow the error as appropriate
  }
};

export const updateUser = async (obj) => {
  try {
    const response = await axiosInstance.get(UMS_URL.UpdateUser + obj);
    return response.data;
  } catch (error) {
    console.error("Getting user data failed:", error);
    throw error; // Handle or rethrow the error as appropriate
  }
};

export const deleteUser = async (obj) => {
  try {
    const response = await axiosInstance.get(UMS_URL.DeleteUser + obj.row.original.uid);
    console.error("response", response);
    return JSON.parse(StringUtil.decompressString(response.data));
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Handle or rethrow the error as appropriate
  }
};

export const getGroupAndStoreByType = async (obj) => {
  try {
    const response = await axiosInstance.post(UMS_URL.GetGroupAndStoreByTypes, obj);
    return JSON.parse(StringUtil.decompressString(response.data));
  } catch (error) {
    console.error("Error getteing groups and stores:", error);
    throw error; // Handle or rethrow the error as appropriate
  }
};
