import { SliceCartItem } from '../redux/slices/cartSlice';

export const calcTotalPrice = (items: SliceCartItem[]) => {
  return items.reduce((sum, item) => item.price * item.count + sum, 0);
};
