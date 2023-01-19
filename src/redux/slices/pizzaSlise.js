import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { category, order, search, sortType, currentPage } = params;
  const { data } = await axios.get(`https://63aaeaf2fdc006ba604fd8b5.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`);
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'succes';
    },
    [fetchPizzas.rejected]: (state) => {
      console.log('Ошибка');
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
