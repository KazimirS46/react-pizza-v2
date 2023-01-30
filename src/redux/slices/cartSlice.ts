import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

export type SliceCartItem = {
  productId: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface ICartSliceState {
  totalPrice: number;
  items: SliceCartItem[];
}

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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (productId: number) => (state: RootState) => state.cart.items.find((obj) => obj.productId === productId);

export const { addItem, removeItem, minusItem, clearItems } = cratSlice.actions;

export default cratSlice.reducer;
