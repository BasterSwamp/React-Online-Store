import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productsData } from "../../utils/data.js";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const res = productsData.flat();

      return res;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    filtered: [],
    related: [],
    isLoading: false,
  },
  reducers: {
    filterByPrice: (state, { payload }) => {
      const list = state.list.filter(({ price }) => price < payload);
      state.filtered = shuffle(list);
    },
    getRelatedProducts: (state, { payload }) => {
      const list = state.list.filter(({ category: { id } }) => id === payload);
      state.related = shuffle(list);
    },
    filterProducts: (state, { payload }) => {
      const keyword = payload.toLowerCase();
      state.filtered = state.list.filter(({ title }) =>
        title.toLowerCase().includes(keyword)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.filtered = payload;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
      console.log("Error reject");
    });
  },
});

export const { filterProducts, filterByPrice, getRelatedProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
