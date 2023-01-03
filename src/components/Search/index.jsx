import styles from './Search.module.scss';

export const Search = ({ value, onChangeValue }) => {
  return <input className={styles.root} placeholder='Поиск пиццы...' value={value} onChange={(evt) => onChangeValue(evt.target.value)} />;
};
