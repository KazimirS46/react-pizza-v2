import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { ICartSliceState, SliceCartItem } from './types';

const { items, totalPrice } = getCartFromLS();

const initialState: ICartSliceState = {
  totalPrice,
  items,
};

const cratSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<SliceCartItem>) {
      const findItem = state.items.find((obj) => obj.productId === action.payload.productId);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.productId === action.payload);

      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.productId !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cratSlice.actions;

export default cratSlice.reducer;
