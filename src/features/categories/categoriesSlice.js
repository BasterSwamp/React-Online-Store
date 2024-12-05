import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productsData } from "../../utils/data.js";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const categories = productsData.flatMap((products) =>
        products.map((product) => product.category)
      );

      const uniqueCategories = Array.from(
        new Map(categories.map((cat) => [cat.id, cat])).values()
      );

      return uniqueCategories;
    } catch (err) {
      console.error("Error fetching categories:", err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.list = payload.filter((category) =>
        /\.(jpeg|jpg|png)$/i.test(category.image)
      );
      state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
      console.log("Error reject");
    });
  },
});

export default categoriesSlice.reducer;
