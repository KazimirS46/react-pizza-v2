import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Pizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: SearchPizzaParams) => {
  const { category, order, search, sortType, currentPage } = params;
  const { data } = await axios.get(`https://63aaeaf2fdc006ba604fd8b5.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`);

  return data as Pizza[];
});
