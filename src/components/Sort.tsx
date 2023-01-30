import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../redux/fiter/slice';
import { FilterSortItem, SortPropertyEnum } from '../redux/fiter/types';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type ClickType = MouseEvent & {
  path: Node[];
};

type SortPopupProps = {
  value: FilterSortItem;
};

export const typeOfSorting: SortItem[] = [
  { name: 'популярности', sortProperty: SortPropertyEnum.RATING },
  { name: 'цене', sortProperty: SortPropertyEnum.PRICE },
  { name: 'алфавиту', sortProperty: SortPropertyEnum.TITLE },
];

const svg = (
  <svg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
      fill='#2C2C2C'
    ></path>
  </svg>
);

const Sort = React.memo(({ value }: SortPopupProps) => {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const selectActiveType = (type: SortItem) => {
    dispatch(setSort(type));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as ClickType;
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        {svg}
        <b>Сортировка по:</b>
        <span
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          {value.name}
        </span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {typeOfSorting.map((type, i) => (
              <li key={i} onClick={() => selectActiveType(type)} className={value.sortProperty === type.sortProperty ? 'active' : ''}>
                {type.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
