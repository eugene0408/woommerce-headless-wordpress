import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../services/productsApi";

export const fetchProductsTrunk = createAsyncThunk(
  "products/fetch",
  async () => {
    return await fetchProducts(100);
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsTrunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsTrunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductsTrunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
