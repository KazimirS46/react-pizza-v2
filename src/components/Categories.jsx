const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export function Categories({ value, onClickCategory }) {
  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, index) => (
          <li key={index} onClick={() => onClickCategory(index)} className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
