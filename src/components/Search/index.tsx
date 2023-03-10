/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import debounce from 'lodash.debounce';
import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './Search.module.scss';

import { setSearchValue } from '../../redux/fiter/slice';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const searchField = useRef<HTMLInputElement>(null);

  const clearSearchField = () => {
    dispatch(setSearchValue(''));
    setValue('');
    searchField.current?.focus();
  };

  const updateSearchInput = useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 250),
    []
  );

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchInput(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg className={styles.searchIcon} id='Glyph' version='1.1' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z'
          id='XMLID_223_'
        />
      </svg>
      <input ref={searchField} className={styles.input} placeholder='Поиск пиццы...' value={value} onChange={onChangeSearchInput} />
      {value && (
        <svg className={styles.closeIcon} onClick={clearSearchField} height='14px' version='1.1' viewBox='0 0 14 14' width='14px' xmlns='http://www.w3.org/2000/svg'>
          <g fill='none' id='Page-1' stroke='none'>
            <g fill='#000000' id='Core' transform='translate(-341.000000, -89.000000)'>
              <g id='close' transform='translate(341.000000, 89.000000)'>
                <path d='M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z' id='Shape' />
              </g>
            </g>
          </g>
        </svg>
      )}
    </div>
  );
};

export default Search;
