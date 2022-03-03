import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

// Get user data from localstorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
