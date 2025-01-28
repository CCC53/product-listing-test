import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchProductResponse } from "../types/product";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async() => {
        const res = await axios.get('https://dummyjson.com/c/d1a1-2f51-49ed-a518');
        const { data } = res as FetchProductResponse;
        return data.data;
    }
)